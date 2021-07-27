'use strict';
const resultsPokemon = document.querySelector('.js-results');
const searchButtonElement = document.querySelector('.js-searchButton');
const inputElement = document.querySelector('.js-input');
const formElement = document.querySelector('.js-form');
const resetResults = document.querySelector('.js-reset');
const buttonDetailElement = document.querySelector('.js-detail');
const pokemonsDetail = document.querySelector('.js-pokemonsDetail');

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
  document.getElementById("myForm").reset();
}
resetResults.addEventListener('click', handleReset);

function handleSearchResults(event) {
  event.preventDefault();
  getPokemon(getPokemonName());
}
searchButtonElement.addEventListener('click', handleSearchResults);
formElement.addEventListener('submit', handleSearchResults);

function getPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
      let pokemon = transformPokeObject(data);
      renderPokemons(pokemon);
    });
}

function renderPokemons(pokemon) {
  buttonDetailElement.classList.remove('js-hidden');
  let htmlCode = '';
  htmlCode += `<li class="resultsList__item id="${pokemon.id} ">`;
  htmlCode += `<h3 class="resultsList__item--name">${pokemon.pokeName}</h3>`;
  htmlCode += `<img class="resultsList__item--image" src="${pokemon.image}" alt="${pokemon.pokeName} picture">`;
  htmlCode += '</li>';
  resultsPokemon.innerHTML = htmlCode;
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
  resultsPokemon.classList.add('js-hidden');
  buttonDetailElement.classList.add('js-hidden');
  let htmlCode = '';
  htmlCode += `<img class="resultsList__item--image" src="${pokemon.image}" alt="${pokemon.pokeName} picture">`;
  htmlCode += `<h3 class="resultsList__item--name">${pokemon.pokeName}</h3>`;
  htmlCode += `<h5>Type: ${pokemon.type}</h5>`;
  htmlCode += `<div><h6>Height: ${pokemon.height}</h6><h6>Wight: ${pokemon.weight}</h6></div>`;
  pokemonsDetail.innerHTML = htmlCode;
}