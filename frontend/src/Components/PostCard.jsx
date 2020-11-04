import React from 'react'
import './PostCard.css'

export default function (props) {

    const arquivo = props.arquivo

    return (
        <div className="post-card">
            <h3>{props.name}</h3>
            <h3>Texto:</h3>
            <p>{props.text}</p>
            <h3>Arquivo: </h3>
            <p>{arquivo.slice(10)}</p>
        </div>
    )
}