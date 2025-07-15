# MiniGo

A modern web-based Go (Weiqi/Baduk) game built with React, TypeScript, and Vite. Play the ancient strategy game in your browser with a beautiful dark theme and component-based architecture.

## Features

- 🔴⚫ **5×5 Go Board** - Perfect for quick games and learning
- ⚛️ **React Components** - Clean, modular component architecture
- 🎨 **Dark Theme** - Beautiful, modern UI optimized for focus
- ⚡ **TypeScript** with strict type checking for robust code
- 🔥 **Vite** for lightning-fast development and optimized builds
- 📱 **Responsive Design** - Play on desktop, tablet, or mobile
- 🎯 **Game Features**:
  - Turn-based gameplay (Black plays first)
  - Stone capture mechanics
  - Move history tracking
  - Pass and undo functionality
  - Captured stone counting
  - Game state management with React hooks

## Component Architecture

- **App** - Main application wrapper
- **Header** - Game title and branding
- **GameContainer** - Main game logic container
- **GameInfo** - Player information and game controls
- **GoBoard** - Interactive 5×5 Go board
- **Intersection** - Individual board intersection
- **MoveHistory** - Move tracking and display
- **Footer** - App information

## Custom Hooks

- **useGoGame** - Complete game state management and logic

## How to Play

1. **Objective**: Control territory by placing stones and capturing opponent stones
2. **Placement**: Click on any empty intersection to place a stone
3. **Capture**: Surround opponent stones to capture them (remove liberties)
4. **Pass**: Click "Pass" if you don't want to make a move
5. **Winning**: Game ends when both players pass consecutively

## Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

This will start the Vite development server on `http://localhost:3000` with hot module replacement.

### Building for Production

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Type Checking

Run TypeScript type checking without emitting files:

```bash
npm run type-check
```

## Project Structure

```
minigo/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # App header component
│   │   ├── Footer.tsx        # App footer component
│   │   ├── GameContainer.tsx # Main game container
│   │   ├── GameInfo.tsx      # Player info and controls
│   │   ├── GoBoard.tsx       # Interactive Go board
│   │   └── MoveHistory.tsx   # Move history display
│   ├── hooks/
│   │   └── useGoGame.ts      # Game state management hook
│   ├── App.tsx              # Main React app component
│   ├── main.tsx             # React app entry point
│   ├── go-game.ts           # Go game types and interfaces
│   ├── utils.ts             # Utility functions
│   └── style.css            # Dark theme styles
├── index.html               # HTML template
├── package.json             # NPM configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration with React
└── README.md               # This file
```

## Game Rules (Simplified for 5×5)

- **Black** plays first
- Stones are placed on line intersections, not squares
- Captured stones are removed from the board
- A stone/group is captured when it has no liberties (empty adjacent points)
- Players can pass their turn
- Game ends when both players pass consecutively

## Technologies Used

- **React** - Component-based UI library
- **TypeScript** - Type-safe JavaScript with modern features
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients, animations, and grid layout
- **ES2020** - Modern JavaScript features and modules

## Browser Support

This project targets modern browsers that support ES2020 features and CSS Grid.

## Contributing

Feel free to fork the project and submit pull requests for improvements!

## License

ISC
