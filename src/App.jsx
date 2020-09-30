import React, {Component} from 'react'
import './app.css'
import API from './Api'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Central from './Components/Central'
import Bottom from './Components/Bottom'
import Top from './Components/Top'

export default class App extends Component {

    localUsername = localStorage.getItem('myUsername') || ""
    localPassword = localStorage.getItem('myPassword') || ""
    localToken = localStorage.getItem('token') || ""
    localId = localStorage.getItem('id') || ""

    state = {
        username: "",
        password: "",
        token: "",
        loggedIn: false,
        failLogin: false,
        errorEmail: "",
        errorPassword: ""
    }

    constructor() {
        super()

        this.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.setLoggedin = this.setLoggedin.bind(this)
        this.onValidation = this.onValidation.bind(this)

        this.state.loggedIn = (localStorage.getItem('onLogin') === 'true')
        if(this.state.loggedIn){
            this.state.username = localStorage.getItem('myUsername')
            this.state.token = localStorage.getItem("token")
        }
    }

    onValidation = () => {
        let retorno = true
        if(this.state.username.length <= 3 || !this.state.username.includes('@')) {
            this.setState({ errorEmail: "e-mail inválido" })
            retorno = false
        }
        else {
            let left_text = this.state.username.substring(0, this.state.username.indexOf('@'))
            let right_text = this.state.username.substring(this.state.username.indexOf('@') + 1,  this.state.username.length)
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

        Axios.post("https://reqres.in/api/login", { email: this.state.username, password: this.state.password }).then(
            resp => {
                localStorage.setItem('onLogin', true)
                localStorage.setItem('token', resp.data.token)
                this.setLoggedin(true)
                this.setState({ token: resp.data.token, failLogin: false })
                console.log('Logged in');
            }
        ).catch(
            error => {
                this.setState({ failLogin: true})
                console.log(error);
            }
        )
    }

    onLogout = () => {
        localStorage.setItem('onLogin', false)
        this.setLoggedin(false)
    }

    onChangeUsername (event) {
        this.setState({ username: event.target.value })
    }

    onChangePassword (event) {
        this.setState({ password: event.target.value })
    }

    setLoggedin = (value) => {
        this.setState({loggedIn: value})
    }

    render() {
        return(
            <div>
                <header>
                <div className="header">
                    <h2>Using Jikan API</h2>
                    <div className={this.state.loggedIn ? 'loggedin' : 'loggedin-off'}>
                        <h3>Logged as {this.state.username }</h3>
                        <h3>Token {this.state.token }</h3>
                        <button onClick={() => this.onLogout() } >Logout</button>
                    </div>
                    <div className={this.state.loggedIn ? 'login-off' : 'login'}>
                        <h3>E-mail: <span className="senha-email-invalido">{this.state.errorEmail}</span></h3>
                        <input type="text" onChange={e => this.onChangeUsername(e) }></input>
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
                <Top/>
                <Central/>
                <Bottom/>

                <API ref="child" username={this.state.username} password={this.state.password} setLoggedin={this.setLoggedin} loggedIn={this.state.loggedIn}></API>
            </div>
        );
    }
}
    
