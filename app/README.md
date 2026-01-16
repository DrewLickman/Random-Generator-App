# Random Generator App

A fun and interactive web application featuring various random generators with animations and sound effects.

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak it. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

## Technologies

- React
- Tailwind CSS
- HTML5 Audio API

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
