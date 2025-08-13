export class GraphicsManager {
  static typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  static getTypeColor(typeName) {
    return this.typeColors[typeName] ?? "#999";
  }
}

// ----------------- Loader Utilities -----------------

let loaderEl = null;
let loadButtonEl = null;

function getLoader() {
  if (loaderEl) return loaderEl;

  loaderEl = document.getElementById("loadingSpinner");
  if (!loaderEl) {
    loaderEl = document.createElement("div");
    loaderEl.id = "loadingSpinner";
    loaderEl.className = "spinnerOverlay hidden";
    loaderEl.setAttribute("aria-live", "polite");
    loaderEl.setAttribute("role", "status");
    loaderEl.innerHTML = `<div class="spinner" aria-hidden="true"></div>`;
    document.body.appendChild(loaderEl);
  }
  return loaderEl;
}

function getLoadButton() {
  if (loadButtonEl) return loadButtonEl;
  loadButtonEl = document.getElementById("loadMoreButton");
  return loadButtonEl;
}

function toggleLoader(show = true) {
  const loader = getLoader();
  const button = getLoadButton();

  if (show) {
    loader.classList.remove("hidden");
    loader.setAttribute("aria-busy", "true");
    if (button) {
      button.disabled = true;
      button.setAttribute("aria-disabled", "true");
      button.classList.add("loadingDisabled");
    }
  } else {
    loader.classList.add("hidden");
    loader.removeAttribute("aria-busy");
    if (button) {
      button.disabled = false;
      button.removeAttribute("aria-disabled");
      button.classList.remove("loadingDisabled");
    }
  }
}

export function showLoading() {
  toggleLoader(true);
}

export function hideLoading() {
  toggleLoader(false);
}