import React from 'react'
import { Link } from 'react-router-dom'

export default class CadastroResponse extends React.Component {

    render() {
        return(
            <div> 
                <h3>Erro na hora de cadastrar</h3>
                <button>
                    <Link to="/cadastro">Back to Cadastro</Link>
                </button>
            </div>
        )
    }
}