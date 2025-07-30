import { renderStatChart } from '../modules/chartManager.js';

let activeDetailId = null;
let chartInstance = null;

/**
 * Öffnet die Detailansicht für ein Pokémon
 * @param {Object} pokemon - Das Pokémon-Objekt mit ID, Name, Typen, Bild, Stats
 */
export function openDetailView(pokemon) {
  const overlay = document.getElementById('detailOverlay');

  // HTML-Template
  overlay.innerHTML = `
    <div class="detailContent" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
      <h2 id="detailTitle">${pokemon.name}</h2>
      <img src="${pokemon.image}" alt="${pokemon.name}" class="detailImage" />
      <canvas id="statChart" width="300" height="180"></canvas>
      <button id="detailOverlayClose" aria-label="Close detail view" class="closeButton">×</button>
    </div>
  `;

  if (!overlay) return;
  // Show overlay + lock scroll
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
  document.body.classList.remove('no-scroll'); // optional

  // Eventbindung
  document.getElementById('detailOverlayClose')?.addEventListener('click', closeDetailView);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeDetailView(); // klick neben Box
  });

  // Chart.js
  const canvas = document.getElementById('statChart');
  if (canvas) {
    chartInstance?.destroy?.(); // falls vorhanden, zerstören
    chartInstance = renderStatChart(canvas, pokemon.stats, pokemon.name);
  }

  activeDetailId = pokemon.id;
}

export function openDetailView(pokemon) {
  const overlay = document.getElementById('detailOverlay');
  if (!overlay) return;

  overlay.innerHTML = renderDetailContent(pokemon); // deine eigene Funktion
  overlay.classList.remove('hidden');
  document.body.classList.add('no-scroll'); // optional: Scroll blocken
}

export function closeDetailView() {
  
}