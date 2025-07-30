import { renderPokemonCards } from './render.js';
import { setupLoadMoreButton } from '../modules/renderManager.js';
import { setupSearchInteraction, searchByName } from '../modules/dataManager.js';


document.addEventListener('DOMContentLoaded', async () => {
  await renderPokemonCards(0, 20);
  setupLoadMoreButton();
  setupSearchInteraction();
});

document.getElementById('searchInput').addEventListener('input', e => {
  document.getElementById('searchButton').classList.toggle('hidden', e.target.value.length < 3);
});

document.getElementById("searchButton").addEventListener("click", () => {
  const term = document.getElementById("searchInput").value.trim();
  searchByName(term);
});