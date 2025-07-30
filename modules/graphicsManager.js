// modules/graphicsManager.js

export class GraphicsManager {
  static getTypeColor(type) {
    const colors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    return colors[type] || '#AAA';
  }
}

// WIP 3a : (user feedback) show stylish loading animation while loading data

// TODO 3b : (user feedback) deactivate button while loading

// TODO 4b : glowing hover effect on each card (type-fitting)

// TODO 6 : use chartJS for Diagrams and status presentation (Radar chart)
