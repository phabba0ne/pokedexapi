import { GraphicsManager } from "../modules/graphicsManager.js";

export class DetailTemplate {
  static create(pokemon, species, evolutionChain) {
    const types = pokemon.types.map((t) => t.type.name);
    const primaryColor = GraphicsManager.getTypeColor(types[0]);
    const name = this.capitalize(pokemon.name);
    const id = this.padId(pokemon.id);
    const flavor = this.getFlavorText(species);

    return this.getDetailTemplate({
      pokemon,
      name,
      id,
      types,
      flavor,
      primaryColor,
      evolutionChain,
    });
  }

  static padId(id) {
    return id.toString().padStart(3, "0");
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getFlavorText(species) {
    const entry = species.flavor_text_entries?.find(
      (e) => e.language.name === "en"
    );
    return entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available.";
  }

  static getDetailTemplate({ pokemon, name, id, types, flavor, primaryColor, evolutionChain }) {
    return `
      <div class="detailOverlayInner">
        <article class="detailCard" style="--main-color: ${primaryColor}; border-color: ${primaryColor};">
          <button class="backButton" id="closeDetailBtn">← BACK</button>
          <button class="prevButton" aria-label="Previous Pokémon">←</button>
          <button class="nextButton" aria-label="Next Pokémon">→</button>

          <h2>#${id} ${name}</h2>
          <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${name}" />

          <!-- Tabs -->
          <div class="tabs">
            <button class="tabBtn active" data-tab="types">Types</button>
            <button class="tabBtn" data-tab="flavor">Description</button>
            <button class="tabBtn" data-tab="stats">Stats</button>
            ${evolutionChain ? `<button class="tabBtn" data-tab="evolution">Evolution</button>` : ""}
          </div>

          <!-- Tab Contents -->
          <div class="tabContent active" id="types">
            ${this.renderTypes(types)}
          </div>
          <div class="tabContent" id="flavor">
            <p class="flavorText">${flavor}</p>
          </div>
          <div class="tabContent" id="stats">
            <canvas id="statsChart" aria-label="Stat chart"></canvas>
          </div>
          ${
            evolutionChain
              ? `<div class="tabContent" id="evolution">${this.renderEvolution(evolutionChain)}</div>`
              : ""
          }
        </article>
      </div>
    `;
  }

  static renderTypes(types) {
    return `
      <div class="typeContainer">
        ${types
          .map(
            (type) =>
              `<span class="typeTag" data-type="${type}">${this.capitalize(type)}</span>`
          )
          .join("")}
      </div>
    `;
  }

  static renderEvolution(chain) {
    const names = [];
    let current = chain.chain;

    while (current) {
      names.push(current.species.name);
      current = current.evolves_to?.[0];
    }

    const stages = names
      .map((name) => `<div class="evoStage">${this.capitalize(name)}</div>`)
      .join('<span class="evoArrow">→</span>');

    return `
      <div class="evolutionChain">
        <div class="evoLine">${stages}</div>
      </div>
    `;
  }
}