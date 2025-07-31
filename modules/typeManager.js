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
    const color = GraphicsManager.getTypeColor(t.name);
    if (!detail?.damage_relations) {
      console.warn(`No damage_relations found for type: ${t.name}`, detail);
    }
    return {
      name: t.name,
      color,
      damageRelations: detail.damage_relations || {},
    };
  }
}
