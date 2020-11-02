import React, { Component } from 'react'
import './api.css'
const base_url = "https://api.jikan.moe/v3"

export default class Api extends Component {

    state = {
        searchTextValue: '',
        animes: []
    }

    constructor() {
        super()
        this.updateDom = this.updateDom.bind(this)
        this.searchAnime = this.searchAnime.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
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
        this.setState({ animes: data.results })
    }

    render() {
        /* Mostrar API de animes apenas se estiver logado */
        if(this.props.loggedIn) {
            return (
                <>
                    <form id="search_form" className="searchForm">
                        <label htmlFor="search">Digite o nome do anime</label>
                        <input type="text" 
                            onChange={this.onChangeText }
                            onSubmit={this.searchAnime }
                        />
                        <button onClick={this.searchAnime }>Search</button>
                    </form>
            
                    <div className="search-results">
                    {
                        this.state.animes.map((anime, index) => 
                            <div key={ index } className="anime">
                                <h5>{anime.title}</h5>
                                <img src={anime.image_url} alt=""/>
                                <p>{anime.synopsis}</p>
                                <a href={anime.url}>Link Página do Anime</a>
                            </div>
                        )
                    }
                    </div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>        
                </>
            );
        }
        else {
            return (
                <>
                </>
            );
        }
    }
} 



