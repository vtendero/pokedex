'use strict';
const resultsPokemon = document.querySelector('.js-results');
const searchButtonElement = document.querySelector('.js-searchButton');
const inputElement = document.querySelector('.js-input');
const formElement = document.querySelector('.js-form');
const resetResults = document.querySelector('.js-reset');
const buttonDetailElement = document.querySelector('.js-detail');
const pokemonsDetail = document.querySelector('.js-pokemonsDetail');
const pokeId = document.querySelector('.js-pokeId');
const pokeName = document.querySelector('.js-pokeName');
const pokeImage = document.querySelector('.js-pokeImage');
const backHome = document.querySelector('.js-backHome');
const notFound = document.querySelector('.js-notFound');

const transformPokeObject = (data) => {
  const pokeObject = {
    id: data.id,
    pokeName: data.name,
    image: data.sprites.other['dream_world'].front_default,
    type: data.types.map((type) => type.type.name),
    height: data.height,
    weight: data.weight,
  };
  return pokeObject;
};

function getPokemonName() {
  return inputElement.value;
}

function handleReset() {
  document.getElementById('myForm').reset();
  notFound.classList.add('js-hidden');
  resultsPokemon.classList.add('js-hidden');
  buttonDetailElement.classList.add('js-hidden');
  pokemonsDetail.classList.add('js-hidden');
}

resetResults.addEventListener('click', handleReset);

function handleSearchResults(event) {
  event.preventDefault();
  getPokemon(getPokemonName());
}
searchButtonElement.addEventListener('click', handleSearchResults);
formElement.addEventListener('submit', handleSearchResults);

function pokemonNotFound() {
  notFound.classList.remove('js-hidden');
  resultsPokemon.classList.add('js-hidden');
  buttonDetailElement.classList.add('js-hidden');
  pokemonsDetail.classList.add('js-hidden');
}

function getPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    .then(function (response) {
      if (!response.ok) {
        pokemonNotFound();
      } else {
        return response.json();
      }
    })
    .then(data => {
      let pokemon = transformPokeObject(data);
      renderPokemons(pokemon);
    });
}

function renderPokemons(pokemon) {
  resultsPokemon.classList.remove('js-hidden');
  buttonDetailElement.classList.remove('js-hidden');
  notFound.classList.add('js-hidden');
  pokemonsDetail.classList.add('js-hidden');
  backHome.classList.add('js-hidden');
  pokeId.id = `${pokemon.id}`;
  pokeName.textContent = `${pokemon.pokeName}`;
  pokeImage.src = `${pokemon.image}`;
  pokeImage.alt = `${pokemon.pokeName} picture`;

}

function handleDetail() {
  getDetail(getPokemonName());
}
buttonDetailElement.addEventListener('click', handleDetail);

function getDetail(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
      let pokemon = transformPokeObject(data);
      renderPokemonsDetails(pokemon);
    });
}

function renderPokemonsDetails(pokemon) {
  notFound.classList.add('js-hidden');
  resultsPokemon.classList.add('js-hidden');
  buttonDetailElement.classList.add('js-hidden');
  pokemonsDetail.classList.remove('js-hidden');
  backHome.classList.remove('js-hidden');
  let htmlCode = '';
  htmlCode += `<div class="pokemonsDetail__backImage ${pokemon.type + '__back'}">`;
  htmlCode += `<img class="pokemonsDetail__backImage--image" src="${pokemon.image}" alt="${pokemon.pokeName}">`;
  htmlCode += `</div>`;
  htmlCode += `<div class="pokemonsDetail__type">`;
  htmlCode += `<h5 >Type:</h5>`;
  htmlCode += `<h6 class="pokemonsDetail__type ${pokemon.type}">${pokemon.type}</h6>`;
  htmlCode += `</div>`;
  htmlCode += `<div class="pokemonsDetail__size">`;
  htmlCode += `<div class="pokemonsDetail__size--height">`;
  htmlCode += `<h6>Height</h6>`;
  htmlCode += `<h6 class="">${pokemon.height} dm</h6>`;
  htmlCode += `</div>`;
  htmlCode += `<div class="pokemonsDetail__size--weight">`;
  htmlCode += `<h6>Weight</h6>`;
  htmlCode += `<h6 class="t">${pokemon.weight} hg</h6>`;
  htmlCode += `</div>`;
  htmlCode += `</div>`;
  pokemonsDetail.innerHTML = htmlCode;
  listener();
}

function listener() {
  backHome.addEventListener('click', handlebackHome);
}

function handlebackHome() {
  resultsPokemon.classList.remove('js-hidden');
  buttonDetailElement.classList.remove('js-hidden');
  pokemonsDetail.classList.add('js-hidden');
  backHome.classList.add('js-hidden');
}