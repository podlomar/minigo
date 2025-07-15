# MiniGo

A simple TypeScript web project built with Vite for fast development and modern tooling.

## Features

- ✅ **TypeScript** with strict type checking
- ✅ **Vite** for lightning-fast development and optimized builds
- ✅ **Modern ES Modules** for clean code organization
- ✅ **Hot Module Replacement** for instant updates during development
- ✅ **Beautiful UI** with modern CSS and responsive design

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
│   ├── main.ts          # Main application entry point
│   ├── utils.ts         # Utility functions and classes
│   └── style.css        # Application styles
├── index.html           # HTML template
├── package.json         # NPM configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **ES2020** - Modern JavaScript features

## Browser Support

This project targets modern browsers that support ES2020 features.

## License

ISC
