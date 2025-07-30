// DOM template creation

export function createCardTemplate(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = pokemon.id;

  card.innerHTML = `
    <div class="cardHeader">
      <span class="cardId">#${String(pokemon.id).padStart(3, '0')}</span>
      <h3 class="cardName">${pokemon.name}</h3>
    </div>
    <img src="${pokemon.image}" alt="${pokemon.name}" class="cardImage">
    <div class="cardTypes">
      ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
    </div>
  `;

  return card;
}
// WIP 1b : render 20 up to to 40 Pokémon Cards at a time
