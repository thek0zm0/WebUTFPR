import React from 'react'
import './Cadastro.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import If from './Components/If'
import CadastroSuccess from "./CadastroResponse"

export default class Cadastro extends React.Component {

    state = {
        username: "",
        password: "",
        errorEmail: "",
        errorPassword: "",
        cadStep: 0
    }

    onChangeUsername (event) {
        this.setState({ username: event.target.value })
    }

    onChangePassword (event) {
        this.setState({ password: event.target.value })
    }

    onCreateAccount = () => {
        if(this.state.username.length <= 3) {
            this.setState({ errorEmail: "E-mail inválido" })
        }
        if(this.state.password.length <= 3) {
            this.setState({ errorPassword: "Deve conter mais que 3 caracteres" })
        }
        if(this.state.username.length <= 3 || this.state.password.length <= 3) return
        this.setState({ errorEmail: "", errorPassword: "" })

        Axios.post("https://reqres.in/api/register", { email: this.state.username, password: this.state.password }).then(
            resp => {
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('onLogin', true)
                localStorage.setItem('id', resp.data.id)
                localStorage.setItem('myUsername', this.state.username)
                localStorage.setItem('myPassword', this.state.password)
                this.localUsername = this.state.username
                this.localPassword = this.state.password
                this.setState({ cadStep: 1})
            }
        ).catch(
            error => {
                this.setState({ cadStep: 2})
                console.log(error)
            }
        )
    }

    render() {
        return (
            <div className="main_div">
                <If condition={ this.state.cadStep === 1 }>
                    <CadastroSuccess log="Cadastro realizado com sucesso!"></CadastroSuccess>
                </If>
                <If condition={ this.state.cadStep === 2 }>
                    <CadastroSuccess log="Erro no cadastro!"></CadastroSuccess>
                </If>
                <If condition={ this.state.cadStep === 0 }>
                    <div>
                        <h3>E-mail: </h3>
                        <input type="text" onChange={e => this.onChangeUsername(e) }  value={ this.state.username }></input>
                        <h4>{ this.state.errorEmail}</h4>
                        <h3>Password: </h3>
                        <input type="password" onChange={e => this.onChangePassword(e)} value={ this.state.password }></input>
                        <h4>{ this.state.errorPassword}</h4>
                        <div className="cadastrar-submit">
                            <input type="submit" value="Cadastrar" 
                                onClick={() => this.onCreateAccount() }></input>
                            <button>
                                <Link to="/">Back to Site</Link>
                            </button>
                        </div>
                    </div>
                </If>
            </div>
        )
    }
}