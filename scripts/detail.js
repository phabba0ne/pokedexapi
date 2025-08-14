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
      const [pokemon, species] = await this.fetchPokemonAndSpecies(pokemonId);
      const evolutionChain = await this.fetchEvolutionChain(species);
      this.renderStatsChart(pokemon.stats);
      this.renderDetail(pokemon, species, evolutionChain);
      this.updateNavigationIndex(pokemon);
      this.attachNavigationEvents();

    } catch (err) {
      console.error("[Detail] Failed to show detail view:", err);
    } finally {
      hideLoading();
      this.updateArrowStates();
    }
  }

  static async fetchPokemonAndSpecies(id) {
    const pokemon = await DataManager.getPokemonByNameOrId(id);
    const species = await DataManager.getSpeciesByNameOrId(id);
    return [pokemon, species];
  }

  static async fetchEvolutionChain(species) {
    const url = species.evolution_chain?.url;
    const evoId = url?.split("/").filter(Boolean).pop();
    return evoId ? await DataManager.getEvolutionChainById(evoId) : null;
  }

  static renderDetail(pokemon, species, evolutionChain) {
    const detailHTML = DetailTemplate.create(pokemon, species, evolutionChain);
    RenderManager.showDetailView(detailHTML);
    document.body.classList.add("no-scroll");

    // Initialize tabs after the detail view is in the DOM
    this.initDetailTabs();
  }

  static initDetailTabs() {
    const tabButtons = document.querySelectorAll(".tabBtn");
    const tabContents = document.querySelectorAll(".tabContent");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        // Deactivate all tabs
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        // Activate clicked tab
        btn.classList.add("active");
        document.getElementById(target).classList.add("active");
      });
    });

    // Optionally, activate the first tab by default
    if (tabButtons.length && tabContents.length) {
      tabButtons[0].classList.add("active");
      tabContents[0].classList.add("active");
    }
  }

  static updateNavigationIndex(pokemon) {
    const index = this.pokemonList.findIndex(
      (p) => p.name === pokemon.name || p.id === pokemon.id
    );
    if (index !== -1) this.currentIndex = index;
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
      prevBtn.addEventListener("click", () => this.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.next());
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

  static prev() {
    if (this.currentIndex > 0) {
      const prevPokemon = this.pokemonList[this.currentIndex - 1];
      this.show(prevPokemon.name || prevPokemon.id);
    }
  }

  static next() {
    if (this.currentIndex < this.pokemonList.length - 1) {
      const nextPokemon = this.pokemonList[this.currentIndex + 1];
      this.show(nextPokemon.name || nextPokemon.id);
    }
  }

  static updateArrowStates() {
    const prevBtn = document.querySelector(".prevButton");
    const nextBtn = document.querySelector(".nextButton");

    if (prevBtn) {
      prevBtn.disabled = this.currentIndex <= 0;
      prevBtn.style.visibility = this.currentIndex <= 0 ? "hidden" : "visible";
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentIndex >= this.pokemonList.length - 1;
      nextBtn.style.visibility =
        this.currentIndex >= this.pokemonList.length - 1 ? "hidden" : "visible";
    }
  }
}
