import { TypeManager } from "../modules/typeManager.js";

export function cardTemplate(pokemon) {
  const card = document.createElement("article");
  card.className = "pokemonCard";
  card.dataset.id = pokemon.id;
  card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${
      pokemon.sprites.other["official-artwork"].front_default
    }" alt="${pokemon.name}" />
    <p>#${pokemon.id.toString().padStart(3, "0")}</p>
  `;
  return card;
}

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("typeOverviewContainer");
  if (!container) {
    console.warn("Missing #typeOverviewContainer in HTML");
    return;
  }
});
