import { DataManager } from '../modules/dataManager.js';

const loadFirstBatch = async () => {
  const pokemonList = await DataManager.getAllPokemon(40, 0);
  if (!pokemonList) return;

  for (const item of pokemonList.results) {
    const pokemonData = await DataManager.getPokemonByNameOrId(item.name);
    if (pokemonData) {
      // Pass to renderManager or renderCard()
    }
  }
};

import { Detail } from './detail.js';

document.addEventListener('click', async event => {
  const card = event.target.closest('.pokemonCard');
  if (card && card.dataset.pokemonId) {
    await Detail.show(card.dataset.pokemonId);
  }
});

loadFirstBatch();