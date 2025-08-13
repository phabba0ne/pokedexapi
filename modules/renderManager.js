import { cardTemplate } from "../templates/template.js";

export class RenderManager {
  static container = document.getElementById("cardContainer");
  static overlay = document.getElementById("detailOverlay");
  static cardView = document.getElementById("cardView");
  static tabView = document.getElementById("tabView");
  static detailView = document.getElementById("detailView");

  // ----------------- Cards -----------------
  static renderCard(pokemonData) {
    const card = cardTemplate(pokemonData);
    this.container.appendChild(card);
  }

  static renderList(pokemonArray) {
    this.container.innerHTML = ""; // clear previous cards
    const fragment = document.createDocumentFragment();
    pokemonArray.forEach((pokemon) => {
      fragment.appendChild(cardTemplate(pokemon));
    });
    this.container.appendChild(fragment);
  }

  // ----------------- Detail View -----------------
  static showDetailView(html) {
    this.overlay.innerHTML = html;
    document.body.classList.add("lockScroll");
    this.toggleViews({ showDetail: true });
  }

  static hideDetailView() {
    document.body.classList.remove("lockScroll");
    this.toggleViews({ showDetail: false });
  }

  // ----------------- View Helper -----------------
  static toggleViews({ showDetail }) {
    if (showDetail) {
      this.detailView?.classList.remove("hidden");
      this.cardView?.classList.add("hidden");
      this.tabView?.classList.add("hidden");
    } else {
      this.detailView?.classList.add("hidden");
      this.cardView?.classList.remove("hidden");
      this.tabView?.classList.remove("hidden");
    }
  }
}