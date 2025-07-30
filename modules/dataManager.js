const BASE_URL = "https://pokeapi.co/api/v2/";

export class DataManager {
  // Core Pokémon
  static async getAllPokemon(limit = 20, offset = 0) {
    return await this.fetchJson(`pokemon?limit=${limit}&offset=${offset}`);
  }

  static async getPokemonByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon/${idOrName}`);
  }

  // Species & Evolution
  static async getAllSpecies(limit = 20, offset = 0) {
    return await this.fetchJson(
      `pokemon-species?limit=${limit}&offset=${offset}`
    );
  }

  static async getSpeciesByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon-species/${idOrName}`);
  }

  static async getEvolutionChainById(chainId) {
    return await this.fetchJson(`evolution-chain/${chainId}`);
  }

  // Types
  static async getAllTypes() {
    return await this.fetchJson(`type`);
  }

  static async getTypeByNameOrId(idOrName) {
    return await this.fetchJson(`type/${idOrName}`);
  }

  // Abilities
  static async getAllAbilities(limit = 20, offset = 0) {
    return await this.fetchJson(`ability?limit=${limit}&offset=${offset}`);
  }

  static async getAbilityByNameOrId(idOrName) {
    return await this.fetchJson(`ability/${idOrName}`);
  }

  // Moves
  static async getAllMoves(limit = 20, offset = 0) {
    return await this.fetchJson(`move?limit=${limit}&offset=${offset}`);
  }

  static async getMoveByNameOrId(idOrName) {
    return await this.fetchJson(`move/${idOrName}`);
  }

  // Items
  static async getAllItems(limit = 20, offset = 0) {
    return await this.fetchJson(`item?limit=${limit}&offset=${offset}`);
  }

  static async getItemByNameOrId(idOrName) {
    return await this.fetchJson(`item/${idOrName}`);
  }

  // Berries
  static async getAllBerries(limit = 20, offset = 0) {
    return await this.fetchJson(`berry?limit=${limit}&offset=${offset}`);
  }

  static async getBerryByNameOrId(idOrName) {
    return await this.fetchJson(`berry/${idOrName}`);
  }

  // Locations
  static async getAllLocations(limit = 20, offset = 0) {
    return await this.fetchJson(`location?limit=${limit}&offset=${offset}`);
  }

  static async getLocationByNameOrId(idOrName) {
    return await this.fetchJson(`location/${idOrName}`);
  }

  static async getLocationAreaByNameOrId(idOrName) {
    return await this.fetchJson(`location-area/${idOrName}`);
  }

  // Pokedex + Generations + Versions
  static async getPokedexByNameOrId(idOrName) {
    return await this.fetchJson(`pokedex/${idOrName}`);
  }

  static async getGenerationByNameOrId(idOrName) {
    return await this.fetchJson(`generation/${idOrName}`);
  }

  static async getVersionByNameOrId(idOrName) {
    return await this.fetchJson(`version/${idOrName}`);
  }

  // Move Metadata
  static async getMoveDamageClassByNameOrId(idOrName) {
    return await this.fetchJson(`move-damage-class/${idOrName}`);
  }

  static async getMoveLearnMethodByNameOrId(idOrName) {
    return await this.fetchJson(`move-learn-method/${idOrName}`);
  }

  static async getMoveTargetByNameOrId(idOrName) {
    return await this.fetchJson(`move-target/${idOrName}`);
  }

  // Shapes, Habitats
  static async getPokemonShapeByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon-shape/${idOrName}`);
  }

  static async getPokemonHabitatByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon-habitat/${idOrName}`);
  }

  // Reusable Fetch Utility
  static async fetchJson(endpoint) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
      return await res.json();
    } catch (err) {
      console.error(`[DataManager] ${endpoint}: ${err.message}`);
      return null;
    }
  }
}
