// fetching / parsing data

/**
 * Search for a Pokémon by name using PokéAPI
 * Returns a single Pokémon object compatible with render/template system
 */
export async function searchByName(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');

    const data = await response.json();
    return {
      id: data.id,
      name: capitalize(data.name),
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map(t => t.type.name),
      stats: extractStats(data.stats),
    };
  } catch (error) {
    console.error(error);
    return null; // handle error in UI
  }
}

export async function getPokemonBatch(startIndex, amount) {
  const urls = [];
  for (let i = startIndex + 1; i <= startIndex + amount; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
  }

  const rawData = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));

  return rawData.map(pokemon => ({
    id: pokemon.id,
    name: capitalize(pokemon.name),
    image: pokemon.sprites.other['official-artwork'].front_default,
    types: pokemon.types.map(t => t.type.name),
    stats: extractStats(pokemon.stats),
  }));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractStats(stats) {
  const keys = ['hp', 'attack', 'defense'];
  return Object.fromEntries(
    stats
      .filter(s => keys.includes(s.stat.name))
      .map(s => [s.stat.name, s.base_stat])
  );
}

export function setupSearchInteraction() {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  input.addEventListener("input", () => {
    button.classList.toggle("visible", input.value.length >= 3);
  });
}

