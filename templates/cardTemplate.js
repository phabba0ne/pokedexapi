import { GraphicsManager } from "../modules/graphicsManager.js";
import { TypeManager } from "./modules/typeManager.js";

export class CardTemplate {
  static async create(pokemonData) {
    const card = document.createElement("div");
    card.className = "pokemonCard";
    card.dataset.pokemonId = pokemonData.id;

    const primaryType = pokemonData.types[0].type.name;
    card.style.backgroundColor = GraphicsManager.getTypeColor(primaryType);

    const img = document.createElement("img");
    img.src =
      pokemonData.sprites?.other?.["official-artwork"]?.front_default || "";
    img.alt = pokemonData.name;

    const name = document.createElement("h2");
    name.textContent = this.capitalize(pokemonData.name);

    const id = document.createElement("span");
    id.className = "pokemonId";
    id.textContent = `#${pokemonData.id.toString().padStart(3, "0")}`;

    const types = await TypeManager.getTypeOverview();
    types.forEach((t) => {
      const div = document.createElement("div");
      div.className = "typeCard";
      div.innerHTML = `
    <h3 style="background-color:${t.color}">${t.name.toUpperCase()}</h3>
    <div>
      <h4>Weak to (2×): ${t.damageRelations.double_damage_from
        .map((d) => d.name)
        .join(", ")}</h4>
      <h4>Resists (½×): ${t.damageRelations.half_damage_from
        .map((d) => d.name)
        .join(", ")}</h4>
      <h4>No damage from (0×): ${t.damageRelations.no_damage_from
        .map((d) => d.name)
        .join(", ")}</h4>
      <h4>Strong against (2×): ${t.damageRelations.double_damage_to
        .map((d) => d.name)
        .join(", ")}</h4>
    </div>
  `;
      container.append(div);
    });
    types.className = "typeContainer";

    pokemonData.types.forEach((t) => {
      const typeTag = document.createElement("span");
      typeTag.className = "typeTag";
      typeTag.textContent = this.capitalize(t.type.name);
      typeTag.style.backgroundColor = GraphicsManager.getTypeColor(t.type.name);
      types.appendChild(typeTag);
    });

    card.append(img, name, id, types);
    return card;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
