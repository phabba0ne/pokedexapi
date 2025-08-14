import { GraphicsManager } from "../modules/graphicsManager.js";

export function cardTemplate(pokemon) {
  const card = document.createElement("article");
  card.className = "pokemonCard";
  card.dataset.id = pokemon.id;

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const id = `#${pokemon.id.toString().padStart(3, "0")}`;
  const types = pokemon.types.map((t) => t.type.name);
  const mainColor = GraphicsManager.getTypeColor(types[0]);

  const stats = {};
  pokemon.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });

  const abilities = pokemon.abilities
    .map((a) => a.ability.name.replace(/-/g, " "))
    .join(", ");

  card.innerHTML = getCardTemplate(
    pokemon,
    name,
    id,
    types,
    mainColor,
    stats,
    abilities
  );

  return card;
}

function getCardTemplate(
  pokemon,
  name,
  id,
  types,
  mainColor,
  stats,
  abilities
) {
  return `
    <div class="tradingCard" style="background-color: ${mainColor}20; border: 2px solid ${mainColor}; border-radius: 12px; padding: 1rem; width: 100%; max-width: 300px; box-shadow: 0 0 8px ${mainColor};">
      <div class="cardHeader">
        <h2>${name}</h2>
        <p class="cardId">${id}</p>
      </div>
      <img src="${
        pokemon.sprites.other["official-artwork"].front_default
      }" alt="${name}" class="cardImage" />
      ${getTypeTagsTemplate(types)}
      <div class="cardMeta">
        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      </div>
      <div class="cardMeta">
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
      </div>
    </div>
  `;
}

function getTypeTagsTemplate(types) {
  return `
    <div class="typeTags">
      ${types
        .map(
          (t) =>
            `<span class="typeBadge" style="background-color: ${GraphicsManager.getTypeColor(
              t
            )};">${t}</span>`
        )
        .join("")}
    </div>
  `;
}

function getCardStatsTemplate(stats) {
  return `
    <div class="cardStats">
      <p>HP: ${stats.hp || "??"}</p>
      <p>ATK: ${stats.attack || "??"} | <strong>DEF:</strong> ${
    stats.defense || "??"
  }</p>
      <p>SPD: ${stats.speed || "??"}</p>
    </div>
  `;
}

function getCardMetaTemplate(pokemon, abilities) {
  return `
    <div class="cardMeta">
      <p>Height: ${pokemon.height / 10} m</p>
      <p>Weight: ${pokemon.weight / 10} kg</p>
      <p>Abilities: ${abilities}</p>
    </div>
  `;
}
