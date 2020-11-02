// Importing
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

// App config
const app = express()

// Middleware
app.use(cookieParser())
app.use(Cors(
    { 
        origin: true, 
        credentials: true 
    }
))
app.use(bodyParser.json({
    limit: '200mb'
}))

app.use(bodyParser.urlencoded({
    limit: '200mb',
    parameterLimit: 100000,
    extended: true 
}));

// BD Config
const connection_url = "mongodb+srv://femow:femow@cluster0.jmilj.mongodb.net/Cluster0?retryWrites=true&w=majority"
mongoose.connect(connection_url, {
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