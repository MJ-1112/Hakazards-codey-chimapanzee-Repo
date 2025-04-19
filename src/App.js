import React, { useState } from "react";
import Home from "./components/Home";
import GameArena from "./components/GameArena";

function App() {
  const [showGame, setShowGame] = useState(false);

  const handleStartGame = () => {
    setShowGame(true);
  };

  const handleBackToHome = () => {
    setShowGame(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showGame ? (
        <GameArena onBackToHome={handleBackToHome} />
      ) : (
        <Home onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;