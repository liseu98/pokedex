const pokemonContainer = document.querySelector('.pokemon-container');
const button = document.querySelector('button');
const input = document.querySelector("input");
const limpiar = document.querySelector('#limpiar');
const spinner = document.querySelector('#spinner');
const next = document.getElementById('next');
const previo = document.getElementById('previo');

let offset = 1;
let limit = 8;

previo.addEventListener('click', (e) => {
    if(offset != 1){
        offset-=9;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit)
    }
});

next.addEventListener('click', () => {
    offset+=9;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit);
});


button.addEventListener("click",(e)=> {
    e.preventDefault();
    fetchPokemon(input.value);
});

limpiar.addEventListener("click",(e)=> {
    e.preventDefault();
    clearHtml();
});


async function fetchPokemon(id){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => { crearPokemon(data);
    spinner.style.display = "none";
});

}

function fetchPokemons(offset, limit){
    spinner.style.display = "block";
    setTimeout(function(){
        for(let i = offset; i <= offset + limit; i++){
            fetchPokemon(i);
        }
    }, 500)
};

function crearPokemon(pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add("pokemon-block");

    const imgContainer = document.createElement('div');
    imgContainer.classList.add("img-container");

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    
    imgContainer.appendChild(img);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString()}`

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    card.appendChild(imgContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    
    cardBack.appendChild(progressBar(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
};

function progressBar(stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");

    for(let i=0; i<3; i++){
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + '%';
        const statContainer = document.createElement('div');
        statContainer.classList.add("stat-container");

        const statName = document.createElement('div');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add("progress");

        const progressBar = document.createElement('div');
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute('aria-valuenow', stat.base_stat);
        progressBar.setAttribute('aria-valuemin', 0);
        progressBar.setAttribute('aria-valuemax', 250);
        progressBar.style.width = statPercent;

        progressBar.textContent = statPercent;

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)
    }

    return statsContainer;
}

function clearHtml() {
    pokemonContainer.textContent = '';
};

function removeChildNodes(parent) {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


fetchPokemons(2,8);
