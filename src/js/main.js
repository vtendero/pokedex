'use strict';

const resultsPokemon = document.querySelector('.js-results');
const searchButtonElement = document.querySelector('.js-searchButton');
const inputElement = document.querySelector('.js-input');
const formElement = document.querySelector('.js-form');
const resetResults = document.querySelector('.js-reset');
const buttonDetailElement = document.querySelector('.js-detail');

function handleSearchResults(event) {
  event.preventDefault();
  getPokemon(getPokemonName());
}
searchButtonElement.addEventListener('click', handleSearchResults);
formElement.addEventListener('submit', handleSearchResults);

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

function getPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
      let pokemon = transformPokeObject(data);
      renderPokemons(pokemon);
    });
}

function getPokemonName() {
  return inputElement.value;
}

function handleReset() {
  return inputElement.value = "";
}
resetResults.addEventListener('click', handleReset);

function renderPokemons(pokemon) {
  buttonDetailElement.classList.remove('js-hidden');
  let htmlCode = '';
  htmlCode += `<li class="resultsList__item id="${pokemon.id} ">`;
  htmlCode += `<h3 class="resultsList__item--name">${pokemon.pokeName}</h3>`;
  htmlCode += `<img class="resultsList__item--image" src="${pokemon.image}" alt="${pokemon.pokeName} picture">`;
  htmlCode += '</li>';
  resultsPokemon.innerHTML = htmlCode;
}