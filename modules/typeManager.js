import { GraphicsManager } from "./graphicsManager.js";
import { DataManager } from "./dataManager.js";

export class TypeManager {
  static async getTypeOverview() {
    const list = await DataManager.getAllTypes();
    if (!list?.results) return null;

    const types = await Promise.all(
      list.results.map(async (t) => {
        const detail = await DataManager.getTypeByNameOrId(t.name);
        return {
          name: t.name,
          color: GraphicsManager.getTypeColor(t.name),
          damageRelations: detail?.damage_relations || {},
        };
      })
    );
    return types;
  }
}
