import React from 'react'
import SearchIcon from '../search.png'
import './Bottom.css'

export default () => (
    <div className="abaixo">
        <div className="busca">
            <div className="busca_bg">
                <input type="text" className="inputText"/>
                <select className="selectIdioma"> 
                    <option>EN</option>
                </select>
            </div>
        </div>
        <div className="botaoSearch">
            <img src={SearchIcon} alt="Search Icon" className="searchIcon"/>
        </div>
    </div>
)