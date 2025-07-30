import { GraphicsManager } from '../modules/graphicsManager.js';

export class DetailTemplate {
  static create(pokemon, species, evolutionChain) {
    const types = pokemon.types.map(t => t.type.name);
    const primaryColor = GraphicsManager.getTypeColor(types[0]);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const paddedId = pokemon.id.toString().padStart(3, '0');
    const flavor = this.extractFlavorText(species);

    return `
      <article class="detailCard" style="border-color: ${primaryColor}">
      <button class="backButton" id="closeDetailBtn">← Back</button>
        <h2>#${paddedId} ${capitalizedName}</h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${capitalizedName}" />

        <div class="typeContainer mt1 mb1">
          ${types.map(type =>
            `<span class="typeTag" style="background-color: ${GraphicsManager.getTypeColor(type)}">${type}</span>`
          ).join('')}
        </div>

        <p class="flavorText mb1">${flavor}</p>

        <canvas id="statsChart" width="320" height="240" aria-label="Stat chart"></canvas>

        ${evolutionChain ? this.renderEvolution(evolutionChain) : ''}
      </article>
    `;
  }

  static extractFlavorText(species) {
    const entry = species.flavor_text_entries?.find(e => e.language.name === 'en');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
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
          ${evoLine.map(name =>
            `<div class="evoStage">${name.charAt(0).toUpperCase() + name.slice(1)}</div>`
          ).join('<span class="evoArrow">→</span>')}
        </div>
      </div>
    `;
  }
}