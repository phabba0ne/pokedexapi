import { DataManager } from "../modules/dataManager.js";
import { RenderManager } from "../modules/renderManager.js";
import { showLoading, hideLoading } from '../modules/graphicsManager.js';
let offset = 0;
const limit = 1000;

async function loadAndRenderPokemon() {
  const list = await DataManager.getAllPokemon(limit, offset);
  if (!list?.results) return;
  showLoading();
  try {
    const data = await DataManager.getAllPokemon();
    // render cards...
  } catch (err) {
    console.error(err);
  } finally {
    hideLoading();
  }
  const detailed = await Promise.all(
    list.results.map((p) => DataManager.getPokemonByNameOrId(p.name))
  );

  detailed.forEach(RenderManager.renderCard);
  offset += limit;
}

document
  .getElementById("loadMoreButton")
  ?.addEventListener("click", loadAndRenderPokemon);

// Initial load
loadAndRenderPokemon();
