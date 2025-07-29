# PokédexAPI

A responsive, modular, and accessible Pokédex built with native JavaScript and powered by the official [PokéAPI](https://pokeapi.co/).  
This app displays Pokémon in card format with type-specific styling, searchable list view, detailed overlays with stat charts, and user feedback mechanisms like loading indicators.

Built with **HTML5**, **ES Modules**, **CSS3**, and integrated with **Chart.js** for stat visualization.

---

## 🔥 Features

- 🔁 Load 20–40 Pokémon cards at a time
- 🔍 Search Pokémon by name (activated after 3 characters)
- 📊 Show Pokémon stats (HP, Attack, Defense) using **Chart.js**
- 🎨 Type-based background colors and glowing hover effects
- 📱 Responsive grid layout (mobile-first)
- ⏳ Stylish loading animation during data fetching
- 🚫 Disable UI elements while loading to avoid race conditions
- ♿ Accessibility optimized (ARIA, keyboard-safe)
- 🧩 Modular JavaScript structure (ESM)

---

## 🖼️ Screenshot

> *(Optional: Include image of the grid and stat chart overlay here)*

---

## 📁 Project Structure

/index.html             # Main HTML structure
/README.md              # Project documentation

/scripts/
main.js               # App initialization
render.js             # Batch rendering logic
template.js           # DOM card generation
detail.js             # Overlay + stat chart handling
(...)

/modules/
dataManager.js        # Fetching, transforming, filtering
renderManager.js      # Load-more and pagination logic
graphicsManager.js    # Loading spinner, effects, CSS hooks
(...)

/styles/
style.css             # Layout, theme, accessibility
(...)

MIT License © [Fabian Zeußel]
Powered by PokéAPI and Chart.js

⸻

🙌 Credits
	•	Data: PokéAPI
	•	Charts: Chart.js
	•	Icons/Sprites: Official Pokémon artwork (via PokéAPI)
