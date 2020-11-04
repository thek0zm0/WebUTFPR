import React from 'react'
import { useState } from 'react'
import Card from './PostCard'
import Axios from 'axios'
import './Posts.css'

export default function (props) {

    const [posts, setPosts] = useState([])
    const [filtro, setFiltro] = useState("")

    const onClick = () => {
        Axios.get("https://utfpr-web.herokuapp.com/post/?name=" + filtro).then(resp => {
            console.log(resp.data);
            setPosts(resp.data)
        })
    }

    return (
        <div>
            <div>
                <h3>Filtro de Nome: </h3>
                <input type="text" value={filtro} onChange={e => setFiltro(e.target.value)}></input>
                <button onClick={e => onClick()}>Buscar</button>
            </div>
            <div className="posts">
                {posts.map(c => <Card name={c.name} text={c.text} arquivo={c.arquivo}></Card>)}
            </div>
        </div>
    )
}