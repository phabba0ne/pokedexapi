import { DataManager } from "../modules/dataManager.js";
import { RenderManager } from "../modules/renderManager.js";
import { showLoading, hideLoading } from "../modules/graphicsManager.js";

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

