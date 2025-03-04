# Rapid Typing Game

A fast-paced typing game built with React, Vite, Tailwind CSS, and React Router. Test your typing speed with paragraphs of varying difficulty, track your Words Per Minute (WPM), and save high scores by logging in—all wrapped in a sleek black, cyan, and pink neon UI.

## Features

- **Play Anytime**: Jump into the game with "Play Now" from the home screen—no login required.
- **WPM Tracking**: See your WPM in real-time, whether logged in or not.
- **Difficulty Levels**:
  - Easy: Long paragraphs (45 seconds)
  - Medium: Medium paragraphs (30 seconds)
  - Hard: Short, tricky paragraphs (20 seconds)
- **User Authentication**: Optional login/signup to save high scores in `localStorage`.
- **Interactive UI**: Larger game area with hover effects and responsive buttons.
- **Audio Feedback**: Sound effects for clicks, correct words, and game over.
- **Minimal Design**: Clean black background with cyan and pink accents.

## Setup Instructions

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/GeorgeET15/rapid-typing-game.git](https://github.com/GeorgeET15/rapid-typing-game.git)
    cd rapid-typing-game
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Add Audio Files**

    Place `click.mp3`, `correct.mp3`, and `game-over.mp3` in `public/sounds/`. Source these from free sound libraries (e.g., freesound.org) or create your own.

4.  **Add Data File**

    Ensure `src/data.json` exists with paragraph sets for each difficulty (see example below).

5.  **Run the Development Server**

    ```bash
    npm run dev
    ```

    Open `http://localhost:5173` in your browser.

    **Example `data.json`**

    ```json
    {
      "easy": [
        "The sun began to set over the peaceful valley, casting a warm golden glow across the rolling hills and quiet streams.",
        "Children played happily in the vast green meadows, their laughter echoing through the gentle breeze of a perfect afternoon."
      ],
      "medium": [
        "Deep in the forest, a narrow path wound through ancient trees whose branches stretched high above the mossy ground.",
        "Rain tapped lightly against the window as the cozy room glowed with the soft light of a flickering fireplace."
      ],
      "hard": [
        "Zip zap zip, the bee buzzed fast.",
        "Run hop skip, the kid dashed quick."
      ]
    }
    ```

## How to Play

- Visit `/` for the home page.
- Click "Play Now" to start at `/game`, or log in/signup to save scores.
- Choose a difficulty (Easy, Medium, Hard).
- Type words as they appear—watch them disappear when correct.
- Track your WPM, words, lines, and accuracy in real-time.
- If logged in, visit `/dashboard` to see your high score.

## Approach

### Tech Stack

- **Vite**: Fast development and build tool for a modern React setup.
- **React**: Component-based architecture for reusable UI pieces.
- **Tailwind CSS**: Utility-first styling with a custom black/cyan/pink theme.
- **React Router**: Handles navigation (`/`, `/login`, `/game`, `/dashboard`).

### Structure

- **App.jsx**: Manages routing and top-level state (user, isLoggedIn).
- **Home.jsx**: Minimal entry point with "Play Now" and login/signup options, plus a footer.
- **TypingGame.jsx**: Core game logic, public access, with real-time WPM and audio.
- **Dashboard.jsx**: Private route for logged-in users to view high scores.
- **Auth.jsx**: Handles login/signup with localStorage persistence.
- **data.json**: Stores paragraphs for scalability and easy updates.

## Future Improvements

- Add more sound effects or background music.
- Expand `data.json` with diverse paragraphs.
- Implement leaderboards for logged-in users.
- Enhance interactivity with animations or visual cues.

Made with ❤️ in Kochi by [GeorgeET15](https://github.com/GeorgeET15/). View source on [GitHub](https://github.com/GeorgeET15/rapid-typing-game).
