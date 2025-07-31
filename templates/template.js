import { GraphicsManager } from "../modules/graphicsManager.js";
import { Detail } from "../scripts/detail.js";

function renderTypeBadges(types) {
  return types.map(t => `<span class="typeBadge" data-type="${t}" style="background-color: ${GraphicsManager.getTypeColor(t)}">${t}</span>`).join('');
}

function renderCardStats(stats) {
  return `<p>❤️ ${stats.hp} | ⚔️ ${stats.attack} | 🛡️ ${stats.defense} | 💨 ${stats.speed}</p>`;
}

export function cardTemplate(pokemon) {
  const card = document.createElement("article");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = `#${pokemon.id.toString().padStart(3, "0")}`;
  const types = pokemon.types.map(t => t.type.name);
  const stats = Object.fromEntries(pokemon.stats.map(s => [s.stat.name, s.base_stat]));
  const abilities = pokemon.abilities.map(a => a.ability.name.replace(/-/g, " ")).join(", ");
  const color = GraphicsManager.getTypeColor(types[0]);

  card.className = `pokemonCard neon ${pokemon.is_legendary ? "legendaryCard" : ""}`;
  card.dataset.id = pokemon.id;
  card.innerHTML = `
    <div class="tradingCard" style="--main-color: ${color}">
      <div class="shine"></div>
      <div class="cardHeader"><h2>${name}</h2><span class="cardId">${id}</span></div>
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${name}" class="cardImage" />
      <div class="typeTags">${renderTypeBadges(types)}</div>
      <div class="cardStats">${renderCardStats(stats)}</div>
      <div class="cardMeta">
        <p><strong>Size:</strong> ${pokemon.height / 10}m / ${pokemon.weight / 10}kg</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
      </div>
    </div>`;

  card.addEventListener("click", () => {
    const shine = card.querySelector(".shine");
    shine.classList.add("animate");
    setTimeout(() => shine.classList.remove("animate"), 700);
    setTimeout(() => Detail.show(pokemon.id), 300);
  });

  return card;
}
