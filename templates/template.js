export function cardTemplate(pokemon) {
  const card = document.createElement('article');
  card.className = 'pokemonCard';
  card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <p>#${pokemon.id.toString().padStart(3, '0')}</p>
  `;
  return card;
}
