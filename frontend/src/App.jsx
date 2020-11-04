import React, {Component} from 'react'
import './app.css'
import API from './Api'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Central from './Components/Central'
import Bottom from './Components/Bottom'
import Top from './Components/Top'
import Posts from './Components/Posts'

const URL="https://utfpr-web.herokuapp.com/"

export default class App extends Component {

    state = {
        email: "",
        password: "",
        admin: false,
        loggedIn: false,
        failLogin: false,
        errorEmail: "",
        errorPassword: "",
        textToSend: "",
        postName: ""
    }

    constructor() {
        super()
        this.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
        this.onChangeemail = this.onChangeemail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.setLoggedin = this.setLoggedin.bind(this)
        this.onValidation = this.onValidation.bind(this)
        this.onChangeTextToSend = this.onChangeTextToSend.bind(this)
        this.onChangePostName = this.onChangePostName.bind(this)

        Axios.get(URL + "currentuser", {
            withCredentials: true, 
            credentials: 'include'
        }).then(
            resp => {
                console.log(resp.data);
                if(resp.data==="No user")
                {
                    this.setState({ loggedIn: false})
                    return 
                }
                this.setState({ loggedIn: true, email: resp.data.email, admin: resp.data.admin})
                console.log(resp.data);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    onValidation = () => {
        let retorno = true
        if(this.state.email.length <= 3 || !this.state.email.includes('@')) {
            this.setState({ errorEmail: "e-mail inválido" })
            retorno = false
        }
        else {
            let left_text = this.state.email.substring(0, this.state.email.indexOf('@'))
            let right_text = this.state.email.substring(this.state.email.indexOf('@') + 1,  this.state.email.length)
            if(left_text.length === 0 || right_text.length === 0) {
                this.setState({ errorEmail: "e-mail inválido" })
                retorno = false;
            }
            else {
                this.setState({ errorEmail: "" })
            }
        }
        if(this.state.password.length <= 3) {
            this.setState({ errorPassword: "deve conter mais que 4 caracteres" })
            retorno = false
        }
        else {
            this.setState({ errorPassword: "" })
        }

        return retorno
    }

    onLogin = () => {
        if(!this.onValidation()) return

        Axios.get(URL + "login/?email=" + this.state.email + "&password=" + this.state.password, {
            withCredentials: true, 
            credentials: 'include'
        }).then(
            resp => {
                this.setLoggedin(true)
                this.setState({ email: resp.data.user.email, failLogin: false, admin: resp.data.user.admin })
                console.log(resp.data.user);
            }
        ).catch(
            error => {
                this.setState({ failLogin: true})
                console.log(error);
            }
        )
    }

    onLogout = () => {
        Axios.get(URL + "logout", {
            withCredentials: true, 
            credentials: 'include'
        }).then(response => {
              this.setLoggedin(false)
              this.setState({admin: false})
        })
    }

    onChangeemail (event) {
        this.setState({ email: event.target.value })
    }

    onChangePassword (event) {
        this.setState({ password: event.target.value })
    }

    setLoggedin = (value) => {
        this.setState({loggedIn: value })
    }

    onChangeTextToSend (event) {
        this.setState({ textToSend: event.target.value })
    }

    onChangePostName (event) {
        this.setState({ postName: event.target.value })
    }

    render() {
        return(
            <div>
                <header>
                <div className="header">
                    <h2>Using Jikan API</h2>
                    {
                        this.state.admin && 
                        <div>
                        <h3>Upload File:</h3>
                        <form method="POST" action={URL + "post"} encType="multipart/form-data">
                            <input type="file" name="file"></input>
                            <label>Name: </label>
                            <input type="text" name="name" value={this.state.postName} onChange={e => this.onChangePostName(e)}/>
                            <label>Text: </label>
                            <input type="text" name="text" value={this.state.textToSend} onChange={e => this.onChangeTextToSend(e)}/>
                            <label>Author: </label>
                            <input type="text" name="author" value={this.state.email} onChange={e => this.onChangeemail(e)}></input>
                            <input type="submit" value="enviar"></input>
                        </form>
                    </div>
                    }
                    <div className={this.state.loggedIn ? 'loggedin' : 'loggedin-off'}>
                        <h3>Logged as {this.state.email }</h3>
                        <h3>Token {this.state.token }</h3>
                        <button onClick={() => this.onLogout() } >Logout</button>
                    </div>
                    <div className={this.state.loggedIn ? 'login-off' : 'login'}>
                        <h3>E-mail: <span className="senha-email-invalido">{this.state.errorEmail}</span></h3>
                        <input type="text" onChange={e => this.onChangeemail(e) }></input>
                            <h3>Password: <span className="senha-email-invalido">{this.state.errorPassword}</span></h3>
                        <input type="password" onChange={e => this.onChangePassword(e)}></input>
                        <div className="senha-email-invalido">
                            <h4>{ this.state.failLogin ? "Senha ou e-mail inválido" : "" }</h4>
                        </div>
                        <div className="login-submit">
                            <input type="submit" value="Login" 
                                onClick={() => this.onLogin() }>
                            </input>
                            <button>
                                <Link to="/cadastro">Sign up</Link>
                            </button>
                        </div>
                    </div>
                </div>
                </header>
                {
                    this.state.loggedIn &&
                    <Posts></Posts> 
                }
                <Top/>
                <Central/>
                <Bottom/>

                <API ref="child" email={this.state.email} password={this.state.password} setLoggedin={this.setLoggedin} loggedIn={this.state.loggedIn}></API>
            </div>
        );
    }
}
    
