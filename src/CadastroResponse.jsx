import React from 'react'
import { Link } from 'react-router-dom'

export default class CadastroResponse extends React.Component {

    render() {
        return(
            <div> 
                <h3>Cadastrado com Sucesso</h3>
                <button>
                    <Link to="/">Back to Site</Link>
                </button>
            </div>
        )
    }
}