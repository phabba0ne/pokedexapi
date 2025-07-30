import { GraphicsManager } from "../modules/graphicsManager.js";
import { TypeManager } from "./modules/typeManager.js";

export class CardTemplate {
  static async create(pokemonData) {
    const card = document.createElement("div");
    card.className = "pokemonCard";
    card.dataset.pokemonId = pokemonData.id;

    const img = document.createElement("img");
    img.src =
      pokemonData.sprites?.other?.["official-artwork"]?.front_default || "";
    img.alt = pokemonData.name;

    const name = document.createElement("h2");
    name.textContent = this.capitalize(pokemonData.name);

    const id = document.createElement("span");
    id.className = "pokemonId";
    id.textContent = `#${pokemonData.id.toString().padStart(3, "0")}`;
  }
}