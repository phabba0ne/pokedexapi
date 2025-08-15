const BASE_URL = "https://pokeapi.co/api/v2/";

export class DataManager {
  static cache = new Map();

  static async cachedFetchJson(endpoint) {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint);
    }

    const data = await this.fetchJson(endpoint);
    if (data) this.cache.set(endpoint, data);
    return data;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static async cachedFetchJson(endpoint) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
      return await res.json();
    } catch (err) {
      console.error(`[DataManager] ${endpoint}: ${err.message}`);
      return null;
    }
  }

  static async getPokemonByNameOrId(idOrName) {
    return await this.cachedFetchJson(`pokemon/${idOrName}`);
  }

  static async getAllPokemon(limit = 20, offset = 0) {
    const response = await this.cachedFetchJson(
      `pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response || !Array.isArray(response.results)) {
      throw new Error("Invalid response structure from PokéAPI");
    }
    return response;
  }

  static async getAllSpecies(limit = 20, offset = 0) {
    return await this.cachedFetchJson(
      `pokemon-species?limit=${limit}&offset=${offset}`
    );
  }

  static async getSpeciesByNameOrId(idOrName) {
    return await this.cachedFetchJson(`pokemon-species/${idOrName}`);
  }

  static async getEvolutionChainById(chainId) {
    return await this.cachedFetchJson(`evolution-chain/${chainId}`);
  }

  static async getAllTypes() {
    return await this.cachedFetchJson("type");
  }

  static async getTypeByNameOrId(idOrName) {
    return await this.cachedFetchJson(`type/${idOrName}`);
  }

  static async getAllAbilities(limit = 20, offset = 0) {
    return await this.cachedFetchJson(`ability?limit=${limit}&offset=${offset}`);
  }

  static async getAbilityByNameOrId(idOrName) {
    return await this.cachedFetchJson(`ability/${idOrName}`);
  }

  static async getAllMoves(limit = 20, offset = 0) {
    return await this.cachedFetchJson(`move?limit=${limit}&offset=${offset}`);
  }

  static async getMoveByNameOrId(idOrName) {
    return await this.cachedFetchJson(`move/${idOrName}`);
  }

  static async getMoveDamageClassByNameOrId(idOrName) {
    return await this.cachedFetchJson(`move-damage-class/${idOrName}`);
  }

  static async getMoveLearnMethodByNameOrId(idOrName) {
    return await this.cachedFetchJson(`move-learn-method/${idOrName}`);
  }

  static async getMoveTargetByNameOrId(idOrName) {
    return await this.cachedFetchJson(`move-target/${idOrName}`);
  }

  static async getAllItems(limit = 20, offset = 0) {
    return await this.cachedFetchJson(`item?limit=${limit}&offset=${offset}`);
  }

  static async getItemByNameOrId(idOrName) {
    return await this.cachedFetchJson(`item/${idOrName}`);
  }

  static async getAllBerries(limit = 20, offset = 0) {
    return await this.cachedFetchJson(`berry?limit=${limit}&offset=${offset}`);
  }

  static async getBerryByNameOrId(idOrName) {
    return await this.cachedFetchJson(`berry/${idOrName}`);
  }

  static async getAllLocations(limit = 20, offset = 0) {
    return await this.cachedFetchJson(`location?limit=${limit}&offset=${offset}`);
  }

  static async getLocationByNameOrId(idOrName) {
    return await this.cachedFetchJson(`location/${idOrName}`);
  }

  static async getLocationAreaByNameOrId(idOrName) {
    return await this.cachedFetchJson(`location-area/${idOrName}`);
  }

  static async getPokedexByNameOrId(idOrName) {
    return await this.cachedFetchJson(`pokedex/${idOrName}`);
  }

  static async getGenerationByNameOrId(idOrName) {
    return await this.cachedFetchJson(`generation/${idOrName}`);
  }

  static async getVersionByNameOrId(idOrName) {
    return await this.cachedFetchJson(`version/${idOrName}`);
  }

  static async getPokemonShapeByNameOrId(idOrName) {
    return await this.cachedFetchJson(`pokemon-shape/${idOrName}`);
  }

  static async getPokemonHabitatByNameOrId(idOrName) {
    return await this.cachedFetchJson(`pokemon-habitat/${idOrName}`);
  }
}
