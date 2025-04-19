import React, { useState } from "react";
import warriorImage from "../assets/warrior.png";

const Home = ({ onStartGame }) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Wallet connected!");
    }, 2000);
  };

  const handleMint = () => {
    alert("Minting...");
    // Simulate a delay for minting, then start game
    setTimeout(() => {
      onStartGame(); // This will switch to the GameArena screen
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
        ⚔️ Crypto Duels
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center">
        Mint your warrior. Battle. Heal. Defend. Earn.
      </p>
      <div className="mb-8">
        <img
          src={warriorImage}
          alt="NFT Warrior"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full"
        />
      </div>

      {/* 🚀 MINT SECTION STARTS HERE */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mt-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          🧬 Mint Your Warrior
        </h2>
        <p className="text-gray-300 mb-4 text-center">
          Generate a unique NFT warrior to enter the battlefield.
        </p>
        <button
          onClick={handleMint}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold transition-transform transform hover:scale-105"
        >
          Mint Warrior
        </button>
      </div>
    </div>
  );
};

export default Home;