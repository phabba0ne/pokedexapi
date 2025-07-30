/**
 * Render a stat chart inside a given canvas element using Chart.js
 * @param {HTMLCanvasElement} canvasElement - The canvas to render into
 * @param {Object} stats - { hp: number, attack: number, defense: number }
 * @param {string} label - The label (usually Pokémon name)
 */
export function renderStatChart(canvasElement, stats, label) {
  if (!window.Chart || !canvasElement || !stats) return null;

  return new Chart(canvasElement, {
    type: 'bar',
    data: {
      labels: ['HP', 'Attack', 'Defense'],
      datasets: [{
        label,
        data: [stats.hp, stats.attack, stats.defense],
        backgroundColor: ['#FF5959', '#F5AC78', '#9DB7F5'],
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}