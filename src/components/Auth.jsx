import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = ({ setUser, setIsLoggedIn, isLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsSignup(params.get("signup") === "true");
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    new Audio("/sounds/click.mp3").play();

    if (isSignup) {
      const existingUser = localStorage.getItem("user");
      if (existingUser) {
        setError("User already exists");
        return;
      }
      const newUser = { username, password, highScore: 0 };
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("loggedin", "true");
      setUser(newUser);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
      ) {
        localStorage.setItem("loggedin", "true");
        setUser(storedUser);
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96 border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 text-gray-400 hover:text-pink-400 transition-colors w-full text-center"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
