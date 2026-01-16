# Random Generator App

A fun and interactive web application featuring various random generators with animations and sound effects.

[Deployed on Vercel](https://random-generator-app-magicalmongoose.vercel.app/)

## Features

### 🪙 Coin Flip
- Flip a virtual coin with 3D animation
- See heads or tails result
- Sound effects included

### 🎲 Roll Dice
- Roll multiple dice (1-6 dice)
- Choose from different dice types: D4, D6, D8, D10, D12, D20, D100
- 3D dice animations
- See individual results and total sum

### 🃏 Draw Card
- Draw cards from a standard 52-card deck
- Visual card display with suit symbols
- Tracks remaining cards in the deck
- Automatically reshuffles when deck is empty

### 🎡 Spin Wheel
- Customizable spin wheel with your own items
- Enter items separated by commas or new lines
- Shows example items when textbox is empty
- Colorful sectors with smooth spinning animation
- Pointer indicates selected item

### 🎰 Reel Slots
- Classic slot machine with 3 reels
- Multiple symbols: 🍒 🍋 🍇 💎 7️⃣ ⭐ 🍀
- Staggered reel stopping animation
- Jackpot detection when all reels match

### 🎨 Random Color Generator
- Generate random colors instantly
- Support for multiple color formats: HEX, RGB, HSL
- Large color swatch display
- Click to copy color code
- Automatic text contrast for readability

## Technologies

- React
- Tailwind CSS
- HTML5 Audio API

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Troubleshooting

### "react-scripts is not recognized" Error

If you encounter the error:
```
'react-scripts' is not recognized as an internal or external command
```

This means the project dependencies haven't been installed yet. The `node_modules` folder (which contains all dependencies) is not included in the repository and must be installed locally.

**Solution:**
1. Make sure you're in the `app` directory
2. Run `npm install` to install all dependencies
3. Once installation completes, try running `npm start` again

## Project Structure

```
app/
├── public/
│   ├── favicon.svg          # App icon
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── CoinFlip.jsx     # Coin flip component
│   │   ├── RollDice.jsx     # Dice rolling component
│   │   ├── DrawCard.jsx     # Card drawing component
│   │   ├── SpinWheel.jsx    # Spin wheel component
│   │   ├── ReelSlots.jsx    # Slot machine component
│   │   └── RandomColor.jsx   # Color generator component
│   ├── Assets/              # Audio files and images
│   ├── App.js               # Main app component
│   └── index.js             # Entry point
└── package.json
```

## License

See LICENSE file for details.
