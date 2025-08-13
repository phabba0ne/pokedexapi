import { DataManager } from "../modules/dataManager.js";
import { RenderManager } from "../modules/renderManager.js";
import { showLoading, hideLoading } from "../modules/graphicsManager.js";
import { Detail } from "./detail.js";

let limit = 20;
let offset = 0;
let allPokemon = []; // cache for search

async function loadAndRenderPokemon() {
  showLoading();
  try {
    const list = await fetchPokemonList();
    const basicData = extractBasicPokemonData(list);
    Detail.setPokemonList([...Detail.pokemonList, ...basicData]);

    const detailed = await fetchDetailedPokemon(list.results);
    renderPokemonCards(detailed);

        // append to the cached array for search
    allPokemon.push(...detailed);

    offset += limit;
  } catch (err) {
    console.error("[Main] Failed to load Pokémon:", err);
  } finally {
    hideLoading();
  }
}

async function fetchPokemonList() {
  const list = await DataManager.getAllPokemon(limit, offset);
  if (!list?.results || !Array.isArray(list.results)) {
    throw new Error("No valid Pokémon list fetched");
  }
  return list;
}

function extractBasicPokemonData(list) {
  return list.results.map((p) => ({
    name: p.name,
    id: p.url.split("/").filter(Boolean).pop(),
  }));
}

async function fetchDetailedPokemon(results) {
  const detailed = await Promise.all(
    results.map(async (p) => {
      const data = await DataManager.getPokemonByNameOrId(p.name);
      if (!data) console.warn(`[Data] Skipped: ${p.name}`);
      return data;
    })
  );
  return detailed.filter(Boolean);
}

function renderPokemonCards(detailed) {
  detailed.forEach((pokemon) => RenderManager.renderCard(pokemon));
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

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  searchButton.classList.toggle("hidden", query.length < 3);

  if (query.length >= 3) {
    const filtered = allPokemon.filter(p => p.name.startsWith(query));
    RenderManager.renderList(filtered);
  } else {
    // show all Pokémon if query < 3 letters
    RenderManager.renderList(allPokemon);
  }
});

// Optional: keep button click for full name search
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length < 3) return;

  showLoading();
  try {
    // Only attempt API fetch if exact match
    const result = allPokemon.find(p => p.name === query) || await DataManager.getPokemonByNameOrId(query);

    if (!result) {
      alert(`No Pokémon found for "${query}"`);
      return;
    }

    document.getElementById("cardContainer").innerHTML = "";
    RenderManager.renderCard(result);
  } catch (err) {
    console.error(`[Search] Failed: ${err.message}`);
  } finally {
    hideLoading();
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchButton.classList.toggle("hidden", query.length < 3);
});

document.getElementById("prevArrow")?.addEventListener("click", () => {
  Detail.prev();
});

document.getElementById("nextArrow")?.addEventListener("click", () => {
  Detail.next();
});

document.getElementById("closeDetailBtn")?.addEventListener("click", () => {
  document.querySelector("#detailContainer").innerHTML = "";
});
