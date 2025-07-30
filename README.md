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

Project structure:

/index.html              // Minimal HTML structure with <main> and <header>

/scripts/
├── main.js              // App entry point: event listeners, orchestration
├── assets.js            // Button logic, filters, interaction controls
├── detail.js            // Detail view logic (overlay, stats, evolution)
├── fonts.js             // Dynamic font loading
├── render.js            // DOM rendering using templates
├── template.js          // Template functions (return HTML strings)

/modules/
├── dataManager.js       // API communication and data transformation
├── graphicsManager.js   // Animations, loading spinners, visual effects
├── renderManager.js     // Controls what and how to render in UI
└── stateManager.js      // (Optional) global state, active Pokémon, cache

/templates/
├── cardTemplate.js      // Pokémon card template
├── detailTemplate.js    // Detail view template
└── typeTableTemplate.js // Type effectiveness table template

/styles/
├── globals.css          // Resets, base layout settings, root variables
├── layout.css           // Flexbox layout, main/sections styling
├── assets.css           // Buttons, filters, inputs
├── detail.css           // Styling for overlay and detailed Pokémon view
├── fonts.css            // Font loading, fallback styling
└── theme.css            // Color variables (types, UI accents, etc.)

