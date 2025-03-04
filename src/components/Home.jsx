// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto text-center flex-grow flex items-center justify-center">
        <div>
          <h1 className="text-6xl font-extrabold mb-8 text-cyan-400 tracking-wider">
            Rapid Typing Game
          </h1>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-gray-300 text-lg mb-6">
              Type fast. Beat the clock. Save your scores by logging in.
            </p>

            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => {
                  new Audio("/sounds/click.mp3").play();
                  navigate("/game");
                }}
                className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
              >
                Play Now
              </button>
            </div>

            {!isLoggedIn && (
              <>
                <p className="text-gray-400 mb-4">
                  Log in or sign up to track your high scores!
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      new Audio("/sounds/click.mp3").play();
                      navigate("/login");
                    }}
                    className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      new Audio("/sounds/click.mp3").play();
                      navigate("/login?signup=true");
                    }}
                    className="px-6 py-2 border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-400 hover:text-gray-900 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
            {isLoggedIn && (
              <div>
                <button
                  onClick={() => {
                    new Audio("/sounds/click.mp3").play();
                    navigate("/dashboard");
                  }}
                  className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-gray-400 text-sm py-4">
        <p>
          Made with ❤️ in Kochi |{" "}
          <a
            href="https://github.com/GeorgeET15/rapid-typing-game" // Replace with your GitHub repo URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-all"
          >
            View source on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
