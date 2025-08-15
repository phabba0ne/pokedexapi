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

  static applyTypeGlow(element, types) {
    if (!element || !types || !types.length) return;

    const primaryColor = this.getTypeColor(types[0].type.name);
    if (types.length > 1) {
      const secondaryColor = this.getTypeColor(types[1].type.name);
      element.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
    } else {
      element.style.backgroundColor = primaryColor;
    }

    element.style.setProperty("--type-color", primaryColor);
    element.classList.add("type-glow");
  }
}

let loaderEl = null;
let loadButtonEl = null;

function getLoader() {
  if (loaderEl) return loaderEl;

  loaderEl = document.getElementById("loadingSpinner");
  if (!loaderEl) {
    loaderEl = document.createElement("div");
    loaderEl.id = "loadingSpinner";
    loaderEl.className = "spinnerOverlay hidden";
    loaderEl.setAttribute("role", "status");
    loaderEl.setAttribute("aria-live", "polite");
    loaderEl.innerHTML = `<div class="spinner" aria-hidden="true"></div>`;
    document.body.appendChild(loaderEl);
  }
  return loaderEl;
}

function getLoadButton() {
  if (loadButtonEl) return loadButtonEl;
  return (loadButtonEl = document.getElementById("loadMoreButton"));
}

function setLoaderVisible(show) {
  const loader = getLoader();
  loader.classList.toggle("hidden", !show);
  loader.setAttribute("aria-busy", show ? "true" : "false");
}

function setButtonState(disabled) {
  const button = getLoadButton();
  if (!button) return;
  button.disabled = disabled;
  button.setAttribute("aria-disabled", disabled ? "true" : "false");
  button.classList.toggle("loadingDisabled", disabled);
}

export function toggleLoader(show = true) {
  setLoaderVisible(show);
  setButtonState(show);
}

export const showLoading = () => toggleLoader(true);
export const hideLoading = () => toggleLoader(false);