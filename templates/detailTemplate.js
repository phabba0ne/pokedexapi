import { GraphicsManager } from '../modules/graphicsManager.js';

export class DetailTemplate {
  static create(pokemonData, speciesData, evolutionChainData) {
    const container = document.createElement('div');
    container.className = 'detailCard';

    // Header section with name, ID, image
    const header = document.createElement('div');
    header.className = 'detailHeader';

    const name = document.createElement('h2');
    name.textContent = this.capitalize(pokemonData.name);

    const id = document.createElement('span');
    id.className = 'detailId';
    id.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;

    const image = document.createElement('img');
    image.src = pokemonData.sprites.other['official-artwork'].front_default;
    image.alt = pokemonData.name;

    header.append(name, id, image);

    // Type tags
    const types = document.createElement('div');
    types.className = 'detailTypes';
    pokemonData.types.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'typeTag';
      tag.textContent = this.capitalize(t.type.name);
      tag.style.backgroundColor = GraphicsManager.getTypeColor(t.type.name);
      types.appendChild(tag);
    });

    // Abilities
    const abilities = document.createElement('div');
    abilities.className = 'detailAbilities';
    const abilityLabel = document.createElement('h3');
    abilityLabel.textContent = 'Abilities';
    const abilityList = document.createElement('ul');
    pokemonData.abilities.forEach(a => {
      const item = document.createElement('li');
      item.textContent = this.capitalize(a.ability.name);
      abilityList.appendChild(item);
    });
    abilities.append(abilityLabel, abilityList);

    // Stats chart container
    const statsSection = document.createElement('div');
    statsSection.className = 'detailStats';

    const statsTitle = document.createElement('h3');
    statsTitle.textContent = 'Base Stats';

    const canvas = document.createElement('canvas');
    canvas.id = 'statsChart';
    canvas.setAttribute('aria-label', 'Stat chart');
    canvas.setAttribute('role', 'img');

    statsSection.append(statsTitle, canvas);

    // Flavor text
    const flavor = document.createElement('p');
    flavor.className = 'flavorText';
    flavor.textContent = this.getFlavorText(speciesData);

    // Evolution chain (basic)
    const evolution = document.createElement('div');
    evolution.className = 'detailEvolution';
    const evoTitle = document.createElement('h3');
    evoTitle.textContent = 'Evolution Chain';
    const evoChain = document.createElement('div');
    evoChain.className = 'evolutionChain';
    this.buildEvolutionChain(evoChain, evolutionChainData.chain);
    evolution.append(evoTitle, evoChain);

    // Compose final card
    container.append(header, types, abilities, statsSection, flavor, evolution);
    return container;
  }

  static buildEvolutionChain(container, chainNode) {
    if (!chainNode) return;

    const stage = document.createElement('span');
    stage.textContent = this.capitalize(chainNode.species.name);
    container.appendChild(stage);

    if (chainNode.evolves_to.length > 0) {
      const arrow = document.createElement('span');
      arrow.textContent = ' → ';
      container.appendChild(arrow);

      chainNode.evolves_to.forEach(next => {
        this.buildEvolutionChain(container, next);
      });
    }
  }

  static getFlavorText(speciesData) {
    const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'en');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}