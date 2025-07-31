import { cardTemplate } from '../templates/template.js';

export class RenderManager {
  static renderCard(pokemonData) {
    const container = document.getElementById('cardContainer');
    const card = cardTemplate(pokemonData);
    container.appendChild(card);
  }
static showDetailView(html) {
  const overlay = document.getElementById('detailOverlay');
  overlay.innerHTML = html;

  // prevents scrolling when detail view open
  document.body.classList.add('lockScroll');

  document.getElementById('cardView')?.classList.add('hidden');
  document.getElementById('tabView')?.classList.add('hidden');
  document.getElementById('detailView')?.classList.remove('hidden');
}

  static hideDetailView() {
    document.getElementById('detailView')?.classList.add('hidden');
    document.getElementById('cardView')?.classList.remove('hidden');
  }
}