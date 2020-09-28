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
        loggedIn: false
    }

    constructor() {
        super()

        this.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.setLoggedin = this.setLoggedin.bind(this)

        this.state.loggedIn = (localStorage.getItem('onLogin') === 'true')
        if(this.state.loggedIn){
            this.state.username = localStorage.getItem('myUsername')
            this.state.token = localStorage.getItem("token")
        }
    }

    onLogin = () => {
        Axios.post("https://reqres.in/api/login", { email: this.state.username, password: this.state.password }).then(
            resp => {
                localStorage.setItem('onLogin', true)
                localStorage.setItem('token', resp.token)
                this.setLoggedin(true)
                this.setState({ token: resp.data.token })
                console.log('Logged in');
            }
        ).catch(
            error => {
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
                        <h3>E-mail: </h3>
                        <input type="text" onChange={e => this.onChangeUsername(e) }></input>
                        <h3>Password: </h3>
                        <input type="password" onChange={e => this.onChangePassword(e)}></input>
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
    