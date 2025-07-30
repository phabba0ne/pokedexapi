import { GraphicsManager } from '../modules/graphicsManager.js';

export class CardTemplate {
  static create(pokemonData) {
    const card = document.createElement('div');
    card.className = 'pokemonCard';
    card.dataset.pokemonId = pokemonData.id;

    const img = document.createElement('img');
    img.src = pokemonData.sprites?.other?.['official-artwork']?.front_default || '';
    img.alt = pokemonData.name;

    const name = document.createElement('h2');
    name.textContent = this.capitalize(pokemonData.name);

    const id = document.createElement('span');
    id.className = 'pokemonId';
    id.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;

    const types = document.createElement('div');
    types.className = 'typeContainer';

    pokemonData.types.forEach(t => {
      const typeTag = document.createElement('span');
      typeTag.className = 'typeTag';
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