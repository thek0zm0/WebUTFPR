import React from 'react'
import './Idioma.css'

export default props => (
    <div className="idioma">
        <a className="link" href={ props.link } title={ props.title }>
            <h2>{ props.lingua }</h2>
            <p className="artigos">{ props.qtd_articulos }</p>
        </a>
    </div>
)