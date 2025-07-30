import { DataManager } from '../modules/dataManager.js';
import { RenderManager } from "../modules/renderManager.js";
import { showLoading, hideLoading } from "../modules/graphicsManager.js";
import { Detail } from './detail.js';

let offset = 0;
const limit = 40;

async function loadAndRenderPokemon() {
  showLoading();
  try {
    const list = await DataManager.getAllPokemon(limit, offset);
    if (!list?.results) throw new Error("No Pokémon list fetched");

    const detailed = await Promise.all(
      list.results.map((p) => DataManager.getPokemonByNameOrId(p.name))
    );

    detailed.forEach(RenderManager.renderCard);
    offset += limit;
  } catch (err) {
    console.error("[Main] Failed to load Pokémon:", err);
  } finally {
    hideLoading(); // ⬅️ STOP SPINNER
  }
}

document
  .getElementById("loadMoreButton")
  ?.addEventListener("click", loadAndRenderPokemon);

// Initial load
loadAndRenderPokemon();

document.getElementById('cardContainer').addEventListener('click', (event) => {
  const card = event.target.closest('.pokemonCard');
  if (!card) return;

  const id = card.dataset.id;
  if (id) {
    Detail.show(id); // 🟢 This triggers the detail view
  }
});

document.addEventListener('click', e => {
  if (e.target.id === 'closeDetailBtn') {
    RenderManager.hideDetailView();
  }
});