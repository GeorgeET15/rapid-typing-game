# Rapid Typing Game (Vite + Tailwind + React Router)

A typing game with user authentication, home page, and dashboard built with React.js, Vite, Tailwind CSS, and React Router.

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Add sound files (click.mp3, correct.mp3, game-over.mp3) to public/sounds/
4. Run `npm run dev` to start the development server
5. Open `http://localhost:5173` in your browser

## Features

- Simple black UI with purple outlines
- Home page with game information
- User signup and login with localStorage
- Dashboard with high score display
- High score tracking per user
- Typing game with difficulty levels and paragraphs
- Words disappear as correctly typed within each line
- Sound effects (button clicks, correct words, game over)
- WPM and accuracy calculation
- Responsive design
- React Router navigation
- Protected routes

## Difficulty Levels

- Easy: Longer words (45 seconds)
- Medium: Medium words (30 seconds)
- Hard: Shorter words (20 seconds)

## How to Play

1. Visit / to see the home page
2. Click Login or Sign Up to go to /login
3. After authentication, view dashboard at /dashboard
4. Click "Start Game" to go to /game
5. Choose difficulty (Easy, Medium, Hard)
6. Type the displayed words
7. Game lasts based on difficulty
8. Return to dashboard
9. Logout when finished

## Technical Details

- Vite for fast development
- Tailwind CSS with default configuration
- Simple purple and black color scheme
- Outlined buttons instead of gradients
- React hooks for state management
- LocalStorage for user data
- Web Audio API for sound effects
- Tailwind animations
- Component-based architecture
- Sleek dark theme with gradients
- Protected routes implementation
