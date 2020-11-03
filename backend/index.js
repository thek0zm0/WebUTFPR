// Importing
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import User from './models/userModels.js'
import upload from 'express-fileupload'
import publicaModels from './models/publicaModels.js'

// App config
const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cookieParser())
app.use(Cors(
    { 
        origin: true, 
        credentials: true 
    }
))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    limit: '200mb',
    parameterLimit: 100000,
    extended: true 
}));

// app.use(bodyParser.urlencoded());

// BD Config
const connection_url = "mongodb+srv://JoJo555:jojo555@main.1mqom.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect( connection_url, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.once("open", () => {
    console.log("DB Connected")
    const productCollection = db.collection("products")
    const changeStream = productCollection.watch()
    changeStream.on("change", (change) => {
        console.log(change)
    })
})


app.use(upload())

app.get('/', (req,res) => 
{
    res.sendFile(__dirname + '/')
})

app.get('/post', (req,res) => {
    publicaModels.find({ name: req.query.name  }, function(err, data) {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/post', (req,res) => 
{
    if(req.files)
    {
        console.log(req.files)
        const { text, author, name } = req.body
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+filename, function (err)
        {
            if(err)
            {
                res.send(err)
            }
            else
            {
                new publicaModels({
                    name: name,
                    text: text,
                    arquivo: './uploads/' + filename,
                    author: author
                }).save()
                res.send("File upado")
            }
        })
    }
})

app.get("/logout/", (req, res) => {
    res.clearCookie('email')
    res.clearCookie('password')
    res.clearCookie('admin')
    console.log("Logged out");
    res.status(200).send("Logout")
})

app.post("/register", async (req,res) => 
{
try 
{
    let {email, password, admin} = req.body;

    console.log(req.body)

    // validação 

    if(!email || !password)
    {
        return res.status(404).json({msg: 'Campos incompletos'});
    }
    if(password.length < 3)
    {
        return res.status(400).json({msg: 'Senha precisa ter no mínimo 3 dígitos'});
    }

    const existingUserEmail = await User.findOne({email: email})
    if(existingUserEmail)
    {
        return res.status(400).json({msg: 'Email já utilizado'});   
    }

    const newUser = new User({
        email,
        password,
        admin
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
}
catch (err)
{
    res.status(500).json({error: err.message});
}
})

app.get("/login", async(req,res) => {
    try
    {
        const email = req.query.email;
        const password = req.query.password;

        // validação
        if (!email || !password)
        {
            return res.status(400).json({ msg: "Campos incompletos"});
        }

        const user = await User.findOne({email: email});
        if(!user)
        {
            return res.status(400).json({ msg: "Nenhuma conta com este Login está cadastrada"});
        }

        res.cookie("email", email)
        res.cookie("password", password)
        if(user.admin)
        {
            res.cookie("admin", "admin")
        }
        else
        {
            res.clearCookie('admin')
        }

        res.json({ 
            user: 
            {
                id: user._id,
                email: user.email,
                admin: user.admin
            }
        })
    }
    catch (err)
    {
        res.status(500).json({error: err.message});
    }
})

app.get("/currentuser/", (req,res) => {
    if(req.cookies && req.cookies.email) {
    const email = decodeURI(req.cookies.email);
    const password = decodeURI(req.cookies.password);
        User.findOne({ email: email, password: password }, function(err,data) {
            if(err) {
                res.status(500).send(err)
            }
            else {
                res.status(200).send(data)
            }
        })
    }
    else {
        res.status(200).send("No user")
        return
    }
})

app.delete("/delete", async (req, res) => 
{
    
})

app.listen(PORT, () => console.log(`The server start on ${PORT}`));
