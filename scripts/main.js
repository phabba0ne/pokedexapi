import { DataManager } from '../modules/dataManager.js';
import { RenderManager } from '../modules/renderManager.js';

let offset = 0;
const limit = 20;

async function loadAndRenderPokemon() {
  const list = await DataManager.getAllPokemon(limit, offset);
  if (!list?.results) return;

  const detailed = await Promise.all(
    list.results.map(p => DataManager.getPokemonByNameOrId(p.name))
  );

  detailed.forEach(RenderManager.renderCard);
  offset += limit;
}

document.getElementById('loadMoreButton')?.addEventListener('click', loadAndRenderPokemon);

// Initial load
loadAndRenderPokemon();



