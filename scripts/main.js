import { DataManager } from '../modules/dataManager.js';
import { RenderManager } from '../modules/renderManager.js';

let currentOffset = 0;
const limit = 20;

document.addEventListener('DOMContentLoaded', () => {
  loadPokemonBatch();

  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.addEventListener('click', loadPokemonBatch);
});

async function loadPokemonBatch() {
  const data = await DataManager.getAllPokemon(limit, currentOffset);
  if (data && data.results) {
    for (const entry of data.results) {
      const pokemonData = await DataManager.getPokemonByNameOrId(entry.name);
      RenderManager.renderCard(pokemonData);
    }
    currentOffset += limit;
  }
}