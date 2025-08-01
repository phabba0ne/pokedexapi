import { GraphicsManager } from "../modules/graphicsManager.js";

export class DetailTemplate {
  static create(pokemon, species, evolutionChain) {
    const types = pokemon.types.map((t) => t.type.name);
    const primaryColor = GraphicsManager.getTypeColor(types[0]);
    const capitalizedName = this.capitalize(pokemon.name);
    const paddedId = pokemon.id.toString().padStart(3, "0");
    const flavor = this.extractFlavorText(species);

    return `
      <div class="detailOverlayInner">
        <article class="detailCard" style="--main-color: ${primaryColor}; border-color: ${primaryColor};">
          <button class="backButton" id="closeDetailBtn">← BACK</button>
          <h2>#${paddedId} ${capitalizedName}</h2>
          <img src="${
            pokemon.sprites.other["official-artwork"].front_default
          }" alt="${capitalizedName}" />
          ${this.renderTypes(types)}
          <p class="flavorText">${flavor}</p>
          <canvas id="statsChart" aria-label="Stat chart"></canvas>
          ${evolutionChain ? this.renderEvolution(evolutionChain) : ""}
        </article>
      </div>
    `;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static extractFlavorText(species) {
    const entry = species.flavor_text_entries?.find(
      (e) => e.language.name === "en"
    );
    return entry
      ? entry.flavor_text.replace(/\f/g, " ")
      : "No description available.";
  }

  static renderTypes(types) {
    return `
      <div class="typeContainer">
        ${types
          .map(
            (type) =>
              `<span class="typeTag" data-type="${type}">${this.capitalize(
                type
              )}</span>`
          )
          .join("")}
      </div>
    `;
  }

  static renderEvolution(chain) {
    const evoLine = [];
    let current = chain.chain;

    while (current) {
      evoLine.push(current.species.name);
      current = current.evolves_to[0];
    }

    return `
      <div class="evolutionChain mt2">
        <h3>Evolution</h3>
        <div class="evoLine">
          ${evoLine
            .map(
              (name) => `<div class="evoStage">${this.capitalize(name)}</div>`
            )
            .join('<span class="evoArrow">→</span>')}
        </div>
      </div>
    `;
  }
}
