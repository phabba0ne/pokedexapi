import { GraphicsManager } from "../modules/graphicsManager.js";

export class DetailTemplate {
  static create(pokemon, species, evolutionChain) {
    const types = this.getPokemonTypes(pokemon);
    const primaryColor = this.getPrimaryColor(types[0]);
    const name = this.capitalize(pokemon.name);
    const id = this.getPaddedId(pokemon.id);
    const flavor = this.extractFlavorText(species);

    return this.getDetailTemplate(
      pokemon,
      name,
      id,
      types,
      flavor,
      primaryColor,
      evolutionChain
    );
  }

  static getPokemonTypes(pokemon) {
    return pokemon.types.map((t) => t.type.name);
  }

  static getPrimaryColor(type) {
    return GraphicsManager.getTypeColor(type);
  }

  static getPaddedId(id) {
    return id.toString().padStart(3, "0");
  }

  static getDetailTemplate(
    pokemon,
    name,
    id,
    types,
    flavor,
    color,
    evolutionChain
  ) {
    return `
      <div class="detailOverlayInner">
        <article class="detailCard" style="--main-color: ${color}; border-color: ${color};">
          <button class="backButton" id="closeDetailBtn">← BACK</button>
          <button class="prevButton" aria-label="Previous Pokémon">←</button>
          <button class="nextButton" aria-label="Next Pokémon">→</button>
          <h2>#${id} ${name}</h2>
          <img src="${
            pokemon.sprites.other["official-artwork"].front_default
          }" alt="${name}" />
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
    const names = this.extractEvolutionNames(chain);
    return this.getEvolutionTemplate(names);
  }

  static extractEvolutionNames(chain) {
    const names = [];
    let current = chain.chain;

    while (current) {
      names.push(current.species.name);
      current = current.evolves_to?.[0];
    }

    return names;
  }

  static getEvolutionTemplate(names) {
    const stages = names
      .map((name) => `<div class="evoStage">${this.capitalize(name)}</div>`)
      .join('<span class="evoArrow">→</span>');

    return `
    <div class="evolutionChain mt2">
      <h3>Evolution</h3>
      <div class="evoLine">${stages}</div>
    </div>
  `;
  }
}
