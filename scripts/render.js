//show cards

import { getPokemonBatch } from '../modules/dataManager.js';
import { createCardTemplate } from '../templates/template.js';
import { applyTypeColor } from '../modules/graphicsManager.js';

export async function renderPokemonCards(startIndex = 0, amount = 20) {
  const cardContainer = document.getElementById('cardContainer');
  const pokemonList = await getPokemonBatch(startIndex, amount);

  const fragment = document.createDocumentFragment();

  for (const pokemon of pokemonList) {
    enrichPokemon(pokemon);
    const card = createCardTemplate(pokemon);
    applyTypeColor(card, pokemon.types); // Farbanpassung
    fragment.appendChild(card);
  }

  cardContainer.appendChild(fragment);
}

renderPokemonCards(0, 40);

const list = await DataManager.getPokemonListDetailed(20, 0);
list.forEach(RenderManager.renderCard);

async function enrichPokemon(pokemon) {
  const species = await DataManager.getSpeciesByNameOrId(pokemon.id);
  pokemon.is_legendary = species?.is_legendary ?? false;
  return pokemon;
}