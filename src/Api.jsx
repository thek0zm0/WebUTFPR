import React, { Component } from 'react'
import './api.css'
const base_url = "https://api.jikan.moe/v3";


export default class Api extends Component {
    
    state = {
        searchTextValue: 'Lala'
    }

    onChangeText(event) {
        this.setState({ searchTextValue: event.target.value });
      }

    searchAnime(event)
    {
        event.preventDefault();
        fetch(`${base_url}/search/anime?q=${this.state.searchTextValue}&page=1`)
        .then(res=>res.json())
        .then(this.updateDom)
        .catch(err=>console.warn(err.message));
    }
    
    updateDom(data)
    {
        const searchResults = document.getElementById('search-results');
    
        searchResults.innerHTML = data.results 
            .map(anime=>{
                return `
                    <div class="resultadoAnimes">
                        <h5 class="tituloAnime">${anime.title}</h5>
                        <img src="${anime.image_url}" class="imagemAnime">
                        <p>${anime.synopsis}</p>
                        <a href="${anime.url}">Link Página do Anime</a>
                    </div>
                    `
            })
    }


    render() {
        return(
            <>
                <form id="search_form" className="searchForm">
                    <label htmlFor="search">Digite o nome do anime</label>
                    <input type="text" 
                        onChange={this.onChangeText.bind(this)}
                        onSubmit={this.searchAnime.bind(this)}
                    />
                    <button onClick={this.searchAnime.bind(this)}>Search</button>
                </form>
        
                <div id="search-results"></div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>        
            </>
        )
    }
} 



