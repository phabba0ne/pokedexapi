import { CardTemplate } from '../templates/cardTemplate.js';

export class RenderManager {
  static cardContainer = document.getElementById('cardContainer');
  static detailOverlay = document.getElementById('detailOverlay');
  static detailView = document.getElementById('detailView');
  static cardView = document.getElementById('cardView');

  static renderPokemonCard(pokemonData) {
    const card = CardTemplate.create(pokemonData);
    this.cardContainer.appendChild(card);
  }

  static clearCards() {
    this.cardContainer.innerHTML = '';
  }

  static showDetailView(detailHTML) {
    this.detailOverlay.innerHTML = '';
    this.detailOverlay.appendChild(detailHTML);
    this.detailView.classList.remove('hidden');
    this.cardView.classList.add('hidden');
  }

  static closeDetailView() {
    this.detailView.classList.add('hidden');
    this.cardView.classList.remove('hidden');
    this.detailOverlay.innerHTML = '';
  }

  static showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
  }

  static hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
  }
}