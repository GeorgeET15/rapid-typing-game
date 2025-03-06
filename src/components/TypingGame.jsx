// src/components/TypingGame.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import wordSets from "../data.json";

const TypingGame = ({ user, setUser, setIsLoggedIn, isLoggedIn }) => {
  const [currentParagraph, setCurrentParagraph] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correctWords: 0, totalLines: 0 });
  const [difficulty, setDifficulty] = useState("easy");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Corrected audio file paths
  const clickSound = new Audio("/sounds/click.mp3");
  const correctSound = new Audio("/sounds/correct.mp3");
  const gameOverSound = new Audio("/sounds/game-over.mp3");

  const getRandomParagraph = () => {
    const paragraphs = wordSets[difficulty];
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex]
      .split(". ")
      .map((sentence) => sentence.trim() + ".");
  };

  const getTimeLimit = () => {
    switch (difficulty) {
      case "easy":
        return 45;
      case "medium":
        return 30;
      case "hard":
        return 20;
      default:
        return 45;
    }
  };

  const initializeLine = (line) => {
    const words = line.split(" ");
    setCurrentWords(words);
    setTypedWords([]);
  };

  const startGame = () => {
    clickSound
      .play()
      .catch((error) => console.error("Click sound failed:", error));
    setIsPlaying(true);
    setScore({ correctWords: 0, totalLines: 0 });
    setTimeLeft(getTimeLimit());
    const newParagraph = getRandomParagraph();
    setCurrentParagraph(newParagraph);
    setCurrentLineIndex(0);
    initializeLine(newParagraph[0]);
    setInput("");
    inputRef.current.focus();
  };

  const resetGame = () => {
    clickSound
      .play()
      .catch((error) => console.error("Click sound failed:", error));
    setIsPlaying(false);
    setScore({ correctWords: 0, totalLines: 0 });
    setTimeLeft(getTimeLimit());
    setCurrentParagraph([]);
    setCurrentLineIndex(0);
    setCurrentWords([]);
    setTypedWords([]);
    setInput("");
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    const currentWord = currentWords[typedWords.length];

    if (value.trim() === currentWord) {
      correctSound
        .play()
        .catch((error) => console.error("Correct sound failed:", error));
      setTypedWords((prev) => [...prev, currentWord]);
      setScore((prev) => ({
        ...prev,
        correctWords: prev.correctWords + 1,
      }));
      setInput("");

      if (typedWords.length + 1 === currentWords.length) {
        setScore((prev) => ({
          ...prev,
          totalLines: prev.totalLines + 1,
        }));
        if (currentLineIndex + 1 < currentParagraph.length) {
          setCurrentLineIndex((prev) => prev + 1);
          initializeLine(currentParagraph[currentLineIndex + 1]);
        } else {
          const newParagraph = getRandomParagraph();
          setCurrentParagraph(newParagraph);
          setCurrentLineIndex(0);
          initializeLine(newParagraph[0]);
        }
      }
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    clickSound
      .play()
      .catch((error) => console.error("Click sound failed:", error));
    setDifficulty(newDifficulty);
  };

  const handleLogout = () => {
    clickSound
      .play()
      .catch((error) => console.error("Click sound failed:", error));
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!isPlaying) {
      setTimeLeft(getTimeLimit());
    }
  }, [difficulty, isPlaying]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      gameOverSound
        .play()
        .catch((error) => console.error("Game over sound failed:", error));
      setIsPlaying(false);
      if (isLoggedIn && user) {
        const newHighScore = Math.max(user.highScore || 0, calculateWPM());
        const updatedUser = { ...user, highScore: newHighScore };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, user, setUser, isLoggedIn]);

  const calculateWPM = () =>
    Math.round(score.correctWords / (getTimeLimit() / 60));
  const calculateAccuracy = () =>
    score.totalLines > 0
      ? Math.round(
          (score.correctWords /
            (score.correctWords + (currentWords.length - typedWords.length))) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wide">
            TypeBlitz {/* Updated name */}
          </h1>
          <div className="flex items-center space-x-4">
            {isLoggedIn && user ? (
              <>
                <span className="text-gray-300">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  clickSound
                    .play()
                    .catch((error) =>
                      console.error("Click sound failed:", error)
                    );
                  navigate("/login");
                }}
                className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          {!isLoggedIn && (
            <p className="text-gray-400 mb-4 text-center">
              Log in to save your high scores and track progress!
            </p>
          )}
          <div className="flex justify-between mb-6">
            <div className="flex space-x-4">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all text-lg font-semibold ${
                    difficulty === level ? "bg-cyan-400 text-gray-900" : ""
                  } ${isPlaying ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isPlaying}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-gray-300 text-lg">
              Time:{" "}
              <span
                className={timeLeft <= 5 && timeLeft > 0 ? "text-red-500" : ""}
              >
                {timeLeft}s
              </span>
            </p>
          </div>

          <div className="flex justify-around mb-6 text-gray-300 text-lg">
            <p>Words: {score.correctWords}</p>
            <p>Lines: {score.totalLines}</p>
            <p>WPM: {calculateWPM()}</p>
            <p>Accuracy: {calculateAccuracy()}%</p>
          </div>

          {currentParagraph.length > 0 && (
            <div className="mb-8">
              <div className="bg-gray-800 p-6 rounded-lg mb-6 max-h-64 overflow-y-auto text-lg">
                {currentParagraph.map((line, index) => (
                  <p
                    key={index}
                    className={`${
                      index === currentLineIndex
                        ? "text-pink-400 font-bold"
                        : "text-gray-500"
                    } hover:text-pink-300 transition-colors`}
                  >
                    {index + 1}.{" "}
                    {index === currentLineIndex
                      ? currentWords.map((word, wordIndex) => (
                          <span
                            key={wordIndex}
                            className={
                              wordIndex < typedWords.length
                                ? "text-gray-700 line-through"
                                : "text-pink-400"
                            }
                          >
                            {word}{" "}
                          </span>
                        ))
                      : line}
                  </p>
                ))}
              </div>
              <input
                ref={inputRef}
                value={input}
                onChange={handleInput}
                disabled={!isPlaying}
                placeholder={`Type "${
                  currentWords[typedWords.length] || ""
                }" from line ${currentLineIndex + 1}`}
                className="w-full p-4 text-xl bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 hover:border-cyan-300 transition-all"
              />
            </div>
          )}

          <div className="flex justify-center space-x-6">
            <button
              onClick={startGame}
              disabled={isPlaying}
              className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              Start
            </button>
            <button
              onClick={resetGame}
              disabled={!isPlaying && timeLeft === getTimeLimit()}
              className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              Reset
            </button>
            <button
              onClick={() => {
                clickSound
                  .play()
                  .catch((error) =>
                    console.error("Click sound failed:", error)
                  );
                navigate("/dashboard");
              }}
              className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all text-lg font-semibold"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingGame;
