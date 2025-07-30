// UI update coordination

import { renderPokemonCards } from '../scripts/render.js';

export function setupLoadMoreButton() {
  const button = document.getElementById("loadMoreButton");
  if (!button) {
    console.warn("⚠️ loadMoreButton not found in DOM");
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    await renderPokemonCards(nextOffset, 20);
    nextOffset += 20;
    button.disabled = false;
  });
}