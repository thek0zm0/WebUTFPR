import React from 'react'
import './Cadastro.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import If from './Components/If'
import CadastroSuccess from "./CadastroResponse"

export default class Cadastro extends React.Component {

    state = {
        email: "",
        password: "",
        admin: false,
        errorEmail: "",
        errorPassword: "",
        cadStep: 0
    }

    onChangeemail (event) {
        this.setState({ email: event.target.value })
    }

    onChangePassword (event) {
        this.setState({ password: event.target.value })
    }

    onChangeAdmin (event) {
        this.setState({ admin: event.target.checked })
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



    onCreateAccount = () => {
        if(!this.onValidation()) return

        Axios.post("https://utfpr-web.herokuapp.com/register", { email: this.state.email, password: this.state.password, admin: this.state.admin }).then(
            resp => {
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
                    <CadastroSuccess log="Erro: 400"></CadastroSuccess>
                </If>
                <If condition={ this.state.cadStep === 0 }>
                    <div>
                        <h3>E-mail: </h3>
                        <input type="text" onChange={e => this.onChangeemail(e) }  value={ this.state.email }></input>
                        <h4>{ this.state.errorEmail}</h4>
                        <h3>Password: </h3>
                        <input type="password" onChange={e => this.onChangePassword(e)} value={ this.state.password }></input>

                        <h3>Admin: </h3>
                        <input type="checkbox" value={this.state.admin} onChange={e => this.onChangeAdmin(e)}>
                        </input>

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