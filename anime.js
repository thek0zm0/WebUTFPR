const base_url = "https://api.jikan.moe/v3";


function searchAnime(event)
{

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data)
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

function pageLoaded()
{
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);