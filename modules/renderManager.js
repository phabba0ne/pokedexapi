import { cardTemplate } from '../templates/template.js';
import { Detail } from '../scripts/detail.js';

export class RenderManager {
  static renderCard(pokemonData) {
    const container = document.getElementById('cardContainer');
    const card = cardTemplate(pokemonData);
    container.appendChild(card);
  }
static showDetailView(html) {
  const overlay = document.getElementById('detailOverlay');
  overlay.innerHTML = html;

  document.getElementById('cardView')?.classList.add('hidden');
  document.getElementById('tabView')?.classList.add('hidden');
  document.getElementById('detailView')?.classList.remove('hidden');
}

  static hideDetailView() {
    document.getElementById('detailView')?.classList.add('hidden');
    document.getElementById('cardView')?.classList.remove('hidden');
  }
}

