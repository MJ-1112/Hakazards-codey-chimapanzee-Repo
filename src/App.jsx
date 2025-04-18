import React, { useState, useEffect } from 'react';
import './App.css';
import { usePrivy } from '@privy-io/react-auth';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { login, authenticated } = usePrivy();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'games', 'blogs', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <header>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <nav className='rounded-4xl bg-gradient-to-tr from-gray-700 to-gray-500 z-1 w-150 h-15 flex flex-col justify-center items-center fixed left-83 top-10 p-2'>
          <div className='flex flex-row justify-center items-center w-100'>
            <ul className='inline-flex space-x-15'>
              <li className={`text-white hover:text-gray-300 cursor-pointer text-xl ${activeSection === 'home' ? 'text-blue-400' : ''}`}>
                <a href="#home">Home</a>
              </li>
              <li className={`text-white hover:text-gray-300 ease-in-out cursor-pointer text-xl ${activeSection === 'games' ? 'text-blue-400' : ''}`}>
                <a href="#games">Games</a>
              </li>
              <li className={`text-white hover:text-gray-300 ease-in-out cursor-pointer text-xl ${activeSection === 'blogs' ? 'text-blue-400' : ''}`}>
                <a href="#blogs">Blogs</a>
              </li>
              <li className={`text-white hover:text-gray-300 ease-in-out cursor-pointer text-xl ${activeSection === 'about' ? 'text-blue-400' : ''}`}>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div 
          onClick={login}
          className='neon-button text-black bg-yellow-400 w-40 h-10 text-2xl font-bold rounded-xl relative left-250 top-6 hover:bg-yellow-500 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.8)] hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] flex items-center justify-center'
        >
          {authenticated ? 'Connected' : 'Connect'}
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="pt-32">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center -mt-40">
            <div className="flex gap-8 mb-12">
              <button className="neon-button bg-blue-500/20 text-blue-400 w-40 h-12 text-xl font-bold rounded-xl hover:bg-blue-500/30 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(77,201,255,0.5)] hover:shadow-[0_0_25px_rgba(77,201,255,0.8)] flex items-center justify-center border border-blue-400">
                Leaderboard
              </button>
              <button className="neon-button bg-pink-500/20 text-pink-400 w-40 h-12 text-xl font-bold rounded-xl hover:bg-pink-500/30 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,113,206,0.5)] hover:shadow-[0_0_25px_rgba(255,113,206,0.8)] flex items-center justify-center border border-pink-400">
                How to Use
              </button>
            </div>
            <h1 className="game-title text-7xl font-black mb-8">
              <span className="neon-red">CHAIN</span>{' '}
              <span className="neon-blue">YOUR</span>{' '}
              <span className="neon-pink">GAME</span>
            </h1>
            <div className="flex gap-20">
              <span className="subtitle neon-blue">COMPETE</span>
              <span className="subtitle neon-red">WIN</span>
              <span className="subtitle neon-pink">EARN</span>
            </div>
          </div>
        </section>

        <section id="games" className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center">Our Games</h2>
          </div>
        </section>

        <section id="blogs" className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center">Latest Blogs</h2>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center">About Us</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
