import { DataManager } from '../modules/dataManager.js';
import { RenderManager } from '../modules/renderManager.js';
import { DetailTemplate } from '../templates/detailTemplate.js';

export class Detail {
  static async show(pokemonId) {
    RenderManager.showLoading();

    try {
      // Load core data
      const pokemonData = await DataManager.getPokemonByNameOrId(pokemonId);
      const speciesData = await DataManager.getSpeciesByNameOrId(pokemonId);

      // Evolution chain requires extra fetch
      const evoUrl = speciesData.evolution_chain?.url;
      const evoId = evoUrl?.split('/').filter(Boolean).pop();
      const evolutionChain = evoId
        ? await DataManager.getEvolutionChainById(evoId)
        : null;

      // Render detail view
      const detailHTML = DetailTemplate.create(pokemonData, speciesData, evolutionChain);
      RenderManager.showDetailView(detailHTML);

      // Build stat chart
      this.renderStatsChart(pokemonData.stats);
    } catch (error) {
      console.error('[Detail] Error rendering detail view:', error);
    } finally {
      RenderManager.hideLoading();
    }
  }

  static renderStatsChart(stats) {
    const ctx = document.getElementById('statsChart');

    if (!ctx) return;

    const labels = stats.map(stat => this.formatLabel(stat.stat.name));
    const data = stats.map(stat => stat.base_stat);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Base Stats',
          data,
          backgroundColor: '#3b4cca',
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
            },
          },
        },
      },
    });
  }

  static formatLabel(label) {
    switch (label) {
      case 'hp': return 'HP';
      case 'attack': return 'ATK';
      case 'defense': return 'DEF';
      case 'special-attack': return 'SpA';
      case 'special-defense': return 'SpD';
      case 'speed': return 'SPD';
      default: return label.toUpperCase();
    }
  }
}