import React, { useState } from "react";
import "../index.css"; // Ensure this imports your custom animations

const GameArena = ({ onBackToHome }) => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [log, setLog] = useState([]);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isOpponentAttacking, setIsOpponentAttacking] = useState(false);
  const [playerDamageFlash, setPlayerDamageFlash] = useState(false);
  const [opponentDamageFlash, setOpponentDamageFlash] = useState(false);

  const addLog = (message) => {
    setLog((prev) => [message, ...prev.slice(0, 4)]);
  };

  const handleAction = (action) => {
    if (!isPlayerTurn) return;

    let newOpponentHealth = opponentHealth;
    let newPlayerHealth = playerHealth;

    if (action === "attack") {
      const damage = Math.floor(Math.random() * 15) + 5;
      newOpponentHealth = Math.max(0, opponentHealth - damage);
      setIsPlayerAttacking(true);
      setTimeout(() => setIsPlayerAttacking(false), 500);
      setOpponentHealth(newOpponentHealth);
      setOpponentDamageFlash(true);
      setTimeout(() => setOpponentDamageFlash(false), 500);
      addLog(`🗡️ You attacked and dealt ${damage} damage!`);
    } else if (action === "heal") {
      const heal = Math.floor(Math.random() * 10) + 5;
      newPlayerHealth = Math.min(100, playerHealth + heal);
      setPlayerHealth(newPlayerHealth);
      addLog(`💊 You healed for ${heal} HP!`);
    } else if (action === "defend") {
      addLog(`🛡️ You defended this turn!`);
    }

    setIsPlayerTurn(false);

    setTimeout(() => {
      if (newOpponentHealth <= 0) {
        addLog("🎉 You won the duel!");
        return;
      }

      const opponentAction = ["attack", "heal"][Math.floor(Math.random() * 2)];

      if (opponentAction === "attack") {
        const damage = Math.floor(Math.random() * 15) + 5;
        setIsOpponentAttacking(true);
        setTimeout(() => setIsOpponentAttacking(false), 500);
        setPlayerHealth((hp) => {
          const newHP = Math.max(0, hp - damage);
          setPlayerDamageFlash(true);
          setTimeout(() => setPlayerDamageFlash(false), 500);
          return newHP;
        });
        addLog(`👹 Opponent attacked for ${damage} damage!`);
      } else {
        const heal = Math.floor(Math.random() * 10) + 5;
        setOpponentHealth((hp) => Math.min(100, hp + heal));
        addLog(`👹 Opponent healed for ${heal} HP.`);
      }

      setIsPlayerTurn(true);
    }, 1500);
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setOpponentHealth(100);
    setIsPlayerTurn(true);
    setLog([]);
  };

  return (
    <div className="p-6 flex flex-col items-center text-white min-h-screen bg-gradient-to-br from-black to-gray-900">
      <h1 className="text-4xl font-bold mb-6">⚔️ Battle Arena</h1>

      <div className="mb-4 animate-bounce">
        <h2 className="text-2xl font-bold text-yellow-400">
          {playerHealth <= 0 || opponentHealth <= 0
            ? playerHealth <= 0
              ? "💀 You Lost!"
              : "🏆 You Win!"
            : isPlayerTurn
            ? "🕹️ Your Turn"
            : "⏳ Opponent’s Turn"}
        </h2>
      </div>

      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <div className="flex flex-col items-center w-1/2 px-4">
          <img
            src={require("../assets/warrior.png")}
            alt="Player Warrior"
            className={`w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-2 border-4 border-green-500 ${isPlayerAttacking ? "animate-shake" : ""}`}
          />
          <p className="mb-1 text-sm font-semibold">🧍‍♂️ You</p>
          <div className={`w-full bg-gray-700 h-4 rounded-full overflow-hidden relative ${playerDamageFlash ? "flash-damage" : ""}`}>
            <div
              className="bg-green-500 h-4 transition-all duration-700 ease-in-out"
              style={{ width: `${playerHealth}%` }}
            />
            <span className="absolute right-2 top-[-22px] text-sm text-white font-mono">
              {playerHealth} HP
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/2 px-4">
          <img
            src={require("../assets/warrior1.png")}
            alt="Opponent Warrior"
            className={`w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-2 border-4 border-red-500 ${isOpponentAttacking ? "animate-shake" : ""}`}
          />
          <p className="mb-1 text-sm font-semibold">👹 Opponent</p>
          <div className={`w-full bg-gray-700 h-4 rounded-full overflow-hidden relative ${opponentDamageFlash ? "flash-damage" : ""}`}>
            <div
              className="bg-red-500 h-4 transition-all duration-700 ease-in-out"
              style={{ width: `${opponentHealth}%` }}
            />
            <span className="absolute right-2 top-[-22px] text-sm text-white font-mono">
              {opponentHealth} HP
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleAction("attack")}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md flex items-center gap-2"
          disabled={!isPlayerTurn || opponentHealth <= 0 || playerHealth <= 0}
        >
          🗡️ Attack
        </button>
        <button
          onClick={() => handleAction("defend")}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md flex items-center gap-2"
          disabled={!isPlayerTurn || opponentHealth <= 0 || playerHealth <= 0}
        >
          🛡️ Defend
        </button>
        <button
          onClick={() => handleAction("heal")}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md flex items-center gap-2"
          disabled={!isPlayerTurn || opponentHealth <= 0 || playerHealth <= 0}
        >
          💊 Heal
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-2">📜 Battle Log</h2>
        <ul className="space-y-1 text-sm">
          {log.map((entry, index) => (
            <li key={index} className="text-gray-300">
              {entry}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={restartGame}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
      >
        🔁 Restart Game
      </button>

      <button
        onClick={onBackToHome}
        className="mt-4 text-sm text-gray-400 hover:underline"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default GameArena;
