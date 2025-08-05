import { DataManager } from "../modules/dataManager.js";
import { RenderManager } from "../modules/renderManager.js";
import { DetailTemplate } from "../templates/detailTemplate.js";
import { showLoading, hideLoading } from "../modules/graphicsManager.js";

export class Detail {
  static pokemonList = [];
  static currentIndex = 0;

  static setPokemonList(list) {
    this.pokemonList = list;
  }

  static async show(pokemonId) {
    showLoading();

    try {
      const pokemon = await DataManager.getPokemonByNameOrId(pokemonId);
      const species = await DataManager.getSpeciesByNameOrId(pokemonId);
      const evoUrl = species.evolution_chain?.url;
      const evoId = evoUrl?.split("/").filter(Boolean).pop();
      const evolutionChain = evoId
        ? await DataManager.getEvolutionChainById(evoId)
        : null;

      const detailHTML = DetailTemplate.create(
        pokemon,
        species,
        evolutionChain
      );

      RenderManager.showDetailView(detailHTML);
      document.body.classList.add("no-scroll");

      const index = this.pokemonList.findIndex(
        (p) => p.name === pokemon.name || p.id === pokemon.id
      );
      if (index !== -1) this.currentIndex = index;

      this.attachNavigationEvents();

      this.renderStatsChart(pokemon.stats);
    } catch (err) {
      console.error("[Detail] Failed to show detail view:", err);
    } finally {
      hideLoading();
    }
  }

  static renderStatsChart(stats) {
    const ctx = document.getElementById("statsChart");
    if (!ctx) return;

    const labels = stats.map((s) => this.formatLabel(s.stat.name));
    const values = stats.map((s) => s.base_stat);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Base Stats",
            data: values,
            backgroundColor: "#3b4cca",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 20 },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  static attachNavigationEvents() {
    const prevBtn = document.querySelector(".prevButton");
    const nextBtn = document.querySelector(".nextButton");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentIndex > 0) {
          const prevPokemon = this.pokemonList[this.currentIndex - 1];
          this.show(prevPokemon.name || prevPokemon.id);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentIndex < this.pokemonList.length - 1) {
          const nextPokemon = this.pokemonList[this.currentIndex + 1];
          this.show(nextPokemon.name || nextPokemon.id);
        }
      });
    }
  }

  static formatLabel(label) {
    switch (label) {
      case "hp":
        return "HP";
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SpA";
      case "special-defense":
        return "SpD";
      case "speed":
        return "SPD";
      default:
        return label.toUpperCase();
    }
  }
}
