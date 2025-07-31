import { DataManager } from "../modules/dataManager.js";
import { RenderManager } from "../modules/renderManager.js";
import { showLoading, hideLoading } from "../modules/graphicsManager.js";
import { Detail } from "./detail.js";

let limit = 20;
let offset = 0;

async function loadAndRenderPokemon() {
  showLoading();

  try {
    const list = await DataManager.getAllPokemon(limit, offset);
    if (!list?.results || !Array.isArray(list.results)) {
      throw new Error("No valid Pokémon list fetched");
    }

    const detailed = await Promise.all(
      list.results.map(async (p) => {
        const data = await DataManager.getPokemonByNameOrId(p.name);
        if (!data) {
          console.warn(`[Data] Skipped: ${p.name}`);
        }
        return data;
      })
    );

    detailed
      .filter(Boolean)
      .forEach((pokemon) => RenderManager.renderCard(pokemon));

    offset += limit;
  } catch (err) {
    console.error("[Main] Failed to load Pokémon:", err);
  } finally {
    hideLoading();
  }
}

document
  .getElementById("loadMoreButton")
  ?.addEventListener("click", loadAndRenderPokemon);

// Initial load
loadAndRenderPokemon();

document.getElementById("cardContainer").addEventListener("click", (event) => {
  const card = event.target.closest(".pokemonCard");
  if (!card) return;

  const id = card.dataset.id;
  if (id) {
    Detail.show(id);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "closeDetailBtn") {
    document.body.classList.remove("no-scroll");
    RenderManager.hideDetailView();
  }
});

document.getElementById("detailOverlay").addEventListener("click", (event) => {
  const clickedInsideCard = event.target.closest(".detailCard");
  if (!clickedInsideCard) {
    document.body.classList.remove("no-scroll");
    RenderManager.hideDetailView();
  }
});

// Search functionality
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Show button after 3 characters
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  searchButton.classList.toggle("hidden", query.length < 3);
});

// Search when button is clicked
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length < 3) return;

  showLoading();

  try {
    const result = await DataManager.getPokemonByNameOrId(query);
    if (!result) {
      alert(`No Pokémon found for "${query}"`);
      return;
    }

    // Clear previous cards and show the new one
    document.getElementById("cardContainer").innerHTML = "";
    RenderManager.renderCard(result);
  } catch (err) {
    console.error(`[Search] Failed: ${err.message}`);
  } finally {
    hideLoading();
  }
});

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length < 3) return;

  showLoading();

  try {
    const result = await DataManager.getPokemonByNameOrId(query);

    if (!result || !result.name) {
      throw new Error(`No Pokémon found for "${query}"`);
    }

    // Clear previous cards and show the searched Pokémon
    document.getElementById("cardContainer").innerHTML = "";
    RenderManager.renderCard(result);
  } catch (err) {
    alert(err.message); // Feedback for 404 or broken query
    console.warn(`[Search] ${err.message}`);
  } finally {
    hideLoading();
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchButton.classList.toggle("hidden", query.length < 3);
});
