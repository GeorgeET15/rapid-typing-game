import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser, setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    new Audio("/sounds/click.mp3").play();
    setUser(null);
    setIsLoggedIn(false);
    localStorage.setItem("loggedin", "false");
    navigate("/", { replace: true });
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wide">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4 text-gray-100">
              Ready to Type?
            </h2>
            <p className="text-gray-400 mb-6">Get in and smash it.</p>
            <p className="text-lg text-gray-300 mb-4">
              High Score:{" "}
              <span className="text-pink-400 font-bold">
                {user.highScore || 0} WPM
              </span>
            </p>
            <button
              onClick={() => {
                new Audio("/sounds/click.mp3").play();
                navigate("/game");
              }}
              className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
            >
              Start Game
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-pink-400">
              How to Play
            </h3>
            <ul className="text-gray-400 list-none space-y-2">
              <li>→ Hit Start</li>
              <li>→ Type words</li>
              <li>→ Watch them go</li>
              <li>→ Top your WPM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
