import { GraphicsManager } from "../modules/graphicsManager.js";

export class DetailTemplate {
  static create(pokemon, species, evolutionChain) {
    const types = pokemon.types.map((t) => t.type.name);
    return this.getDetailTemplate({
      pokemon,
      name: this.capitalize(pokemon.name),
      id: this.padId(pokemon.id),
      types,
      flavor: this.getFlavorText(species),
      primaryColor: GraphicsManager.getTypeColor(types[0]),
      evolutionChain,
    });
  }

  static padId(id) { return id.toString().padStart(3, "0"); }
  static capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

  static getFlavorText(species) {
    const entry = species.flavor_text_entries?.find(e => e.language.name === "en");
    return entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available.";
  }

  static getDetailTemplate({ pokemon, name, id, types, flavor, primaryColor, evolutionChain }) {
    return `
      <div class="detailOverlayInner">
        <article class="detailCard" style="--main-color:${primaryColor}; border-color:${primaryColor};">
          <button class="backButton" id="closeDetailBtn">← BACK</button>
          <h2>#${id} ${name}</h2>
          <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${name}" />
          <button class="prevButton" aria-label="Previous Pokémon">←</button>
          <button class="nextButton" aria-label="Next Pokémon">→</button>
          ${this.getTabsTemplate(types, evolutionChain)}
          <div class="tabContent active" id="types">${this.renderTypes(types)}</div>
          <div class="tabContent" id="flavor"><p class="flavorText">${flavor}</p></div>
          <div class="tabContent" id="stats">${this.getStatsTemplate(pokemon)}<hr>${this.getMetaTemplate(pokemon)}</div>
          ${evolutionChain ? `<div class="tabContent" id="evolution">${this.renderEvolution(evolutionChain)}</div>` : ""}
        </article>
      </div>
    `;
  }

  static getTabsTemplate(types, evolutionChain) {
    return `
      <div class="tabs">
        <button class="tabBtn active" data-tab="types">Types</button>
        <button class="tabBtn" data-tab="flavor">Description</button>
        <button class="tabBtn" data-tab="stats">Stats</button>
        ${evolutionChain ? `<button class="tabBtn" data-tab="evolution">Evolution</button>` : ""}
      </div>
    `;
  }

  static getStatsTemplate(pokemon) {
    const stats = pokemon.stats.reduce((acc, s) => (acc[s.stat.name] = s.base_stat, acc), {});
    return `<div class="cardStats"><p>HP: ${stats.hp||"??"}</p><p>ATK: ${stats.attack||"??"} | DEF: ${stats.defense||"??"}</p><p>SPD: ${stats.speed||"??"}</p></div>`;
  }

  static getMetaTemplate(pokemon) {
    const abilities = pokemon.abilities.map(a => a.ability.name.replace(/-/g, " ")).join(", ");
    return `<div class="cardMeta"><p>Height: ${pokemon.height/10} m</p><p>Weight: ${pokemon.weight/10} kg</p><p>Abilities: ${abilities}</p></div>`;
  }

  static renderTypes(types) {
    return `<div class="typeContainer">${types.map(t => `<span class="typeTag" data-type="${t}">${this.capitalize(t)}</span>`).join("")}</div>`;
  }

  static renderEvolution(chain) {
    const names = [], pushNames = c => { while(c){names.push(c.species.name); c=c.evolves_to?.[0];} };
    pushNames(chain.chain);
    const stages = names.map(n=>`<div class="evoStage">${this.capitalize(n)}</div>`).join('<span class="evoArrow">→</span>');
    return `<div class="evolutionChain"><div class="evoLine">${stages}</div></div>`;
  }
}