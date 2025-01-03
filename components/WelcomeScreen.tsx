'use client';

import React, { useState } from 'react';
import { Shield, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WelcomeScreen = () => {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      router.push('/character-select');
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(25,25,25,0.8)_0%,rgba(0,0,0,1)_100%)]" />
      
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent animate-fog-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent animate-fog-2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <Shield className="w-20 h-20 mx-auto text-red-600 animate-glow" />
        </div>

        <h1 className="text-7xl font-black tracking-tighter mb-4">
          <span className="block text-white opacity-90">TIMELINE</span>
          <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-500 
                         text-transparent bg-clip-text animate-pulse-slow">
            CRISIS
          </span>
        </h1>

        <p className="text-xl text-red-500 font-medium tracking-widest mb-16 animate-fade-in">
          ULTRON CORRUPTS JARVIS  
        </p>

        <div className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="ENTER YOUR NAME"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-80 px-6 py-4 bg-black/50 text-red-500 placeholder-red-500/50
                         border border-red-900/50 rounded-lg focus:outline-none
                         focus:border-red-500 transition-all duration-300
                         backdrop-blur-sm"
            />
            <div className="absolute inset-0 -z-10 bg-red-500/5 blur-xl group-hover:bg-red-500/10 
                          transition-all duration-300" />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center text-red-500 space-x-2">
              <Timer className="w-5 h-5 animate-pulse" />
              <span className="text-sm tracking-wider">TIME ISN&apos;T ON OUR SIDE</span>
            </div>

            <button 
              onClick={handleStart}
              disabled={!playerName.trim()}
              className={`group relative overflow-hidden ${!playerName.trim() && 'opacity-50 cursor-not-allowed'}`}>
              <div className="relative px-8 py-4 bg-gradient-to-r from-red-900 to-red-800
                            rounded border border-red-700/50 transition-all duration-300
                            group-hover:from-red-800 group-hover:to-red-700">
                <span className="relative z-10 text-xl text-white font-medium tracking-wider">
                  START 
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              <div className="absolute inset-0 -z-10 bg-red-500/20 blur-xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;