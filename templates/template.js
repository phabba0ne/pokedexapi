import { TypeManager } from '../modules/typeManager.js';

export function cardTemplate(pokemon) {
  const card = document.createElement('article');
  card.className = 'pokemonCard';
  card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" />
    <p>#${pokemon.id.toString().padStart(3, '0')}</p>
  `;
  return card;
}

// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('typeOverviewContainer');
  if (!container) {
    console.warn('Missing #typeOverviewContainer in HTML');
    return;
  }

  const types = await TypeManager.getTypeOverview();

  types.forEach(t => {
    const div = document.createElement('div');
    div.className = 'typeCard';
    div.innerHTML = `
      <h3 style="background-color:${t.color}">${t.name.toUpperCase()}</h3>
      <div>
        <h4>Weak to (2×): ${t.damageRelations.double_damage_from.map(d => d.name).join(', ')}</h4>
        <h4>Resists (½×): ${t.damageRelations.half_damage_from.map(d => d.name).join(', ')}</h4>
        <h4>No damage from (0×): ${t.damageRelations.no_damage_from.map(d => d.name).join(', ')}</h4>
        <h4>Strong against (2×): ${t.damageRelations.double_damage_to.map(d => d.name).join(', ')}</h4>
      </div>
    `;
    container.append(div);
  });
});