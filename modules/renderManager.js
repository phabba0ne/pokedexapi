import { cardTemplate } from '../templates/template.js';

export class RenderManager {
  static renderCard(pokemonData) {
    const container = document.getElementById('cardContainer');
    const card = cardTemplate(pokemonData);
    container.appendChild(card);
  }
}

