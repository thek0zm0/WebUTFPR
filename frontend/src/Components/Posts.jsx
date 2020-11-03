import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Card from './PostCard'
import Axios from 'axios'
import './Posts.css'

export default function (props) {

    const [posts, setPosts] = useState([])
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        Axios.get("http://localhost:3003/post/?name=" + filtro).then(resp => {
            console.log(resp.data);
            setPosts(resp.data)
        })
    }, [filtro])

    return (
        <div>
            <div>
                <h3>Filtro de Nome: </h3>
                <input type="text" value={filtro} onChange={e => setFiltro(e.target.value)}></input>
            </div>
            <div className="posts">
                {posts.map(c => <Card name={c.name} text={c.text} arquivo={c.arquivo}></Card>)}
            </div>
        </div>
    )
}