const BASE_URL = 'https://pokeapi.co/api/v2/';

export class DataManager {
  static async getAllPokemon(limit = 20, offset = 0) {
    return await this.fetchJson(`pokemon?limit=${limit}&offset=${offset}`);
  }

  static async getPokemonByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon/${idOrName}`);
  }

  static async getSpeciesByNameOrId(idOrName) {
    return await this.fetchJson(`pokemon-species/${idOrName}`);
  }

  static async getEvolutionChainById(chainId) {
    return await this.fetchJson(`evolution-chain/${chainId}`);
  }

  static async getTypeByNameOrId(idOrName) {
    return await this.fetchJson(`type/${idOrName}`);
  }

  static async getAbilityByNameOrId(idOrName) {
    return await this.fetchJson(`ability/${idOrName}`);
  }

  static async getMoveByNameOrId(idOrName) {
    return await this.fetchJson(`move/${idOrName}`);
  }

  static async fetchJson(endpoint) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);
      return await res.json();
    } catch (error) {
      console.error(`[DataManager] Error: ${error.message}`);
      return null;
    }
  }
}