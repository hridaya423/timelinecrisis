/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Timer, Brain, Clock, X, HelpCircle, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import CharacterHint from '@/components/CharacterHint';
import { generateCharacterCode, VictoryCode } from '@/lib/data';

interface TimelineStatus {
    stabilityPercentage: number;
  }

interface GameMessage {
  type: 'system' | 'user';
  content: string;
  timestamp: number;
}

interface GameState {
    remainingTries: number;
    isTyping: boolean;
    messages: GameMessage[];
    timelineStatus: TimelineStatus;
  }

interface Character {
  name: string;
  abilities: string[];
}

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const GamePage: React.FC = () => {
  
  const [gameState, setGameState] = useState<GameState>({
    remainingTries: 10,
    isTyping: true,
    messages: [],
    timelineStatus: {
      stabilityPercentage: 100
    }
  });
  
  const [victoryCode, setVictoryCode] = useState<VictoryCode | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [character, setCharacter] = useState<Character | null>(null);
  const [userInput, setUserInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [abilityData, setAbilityData] = useState<any>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [abilityUsed, setAbilityUsed] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Timeline Crisis",
      description: "JARVIS has been corrupted by Ultron, and reality itself is at stake. Hidden within JARVIS's corrupted responses lies an override code - find it to save both JARVIS and reality itself.",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />
    },
    {
      title: "Your Mission",
      description: "Engage with JARVIS and look for patterns or hidden messages that might reveal the override code. Time and attempts are limited - choose your questions wisely. The format of the code is as goes: WORD-XY, word is related to the character, and XY is hidden in jarvis's response, Good luck hero!",
      icon: <Lock className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Timeline Stability",
      description: "Watch the stability meter carefully. As it decreases, reality becomes more unstable. Use your hero's special ability when available to stabilize the timeline.",
      icon: <Timer className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Hero Abilities",
      description: "After a few attempts, you'll unlock your hero's unique ability. Use it strategically to temporarily stabilize the timeline while you search for the code.",
      icon: <Zap className="h-6 w-6 text-purple-500" />
    }
  ];


  useEffect(() => {
    const initializeGame = async () => {
      try {
        const storedCharacter = localStorage.getItem('selectedCharacter');
        if (storedCharacter) {
          const parsedCharacter = JSON.parse(storedCharacter) as Character;
          setCharacter(parsedCharacter);
          setVictoryCode(generateCharacterCode(parsedCharacter.name));
        }
        await startIntroSequence();
      } catch (error) {
        console.error('Error initializing game:', error);
        addSystemMessage("[ERROR] Timeline initialization failed. Reality unstable.");
      }
    };

    initializeGame();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.messages]);

  const startIntroSequence = async () => {
    const introSequence = [
      "[ALERT] Timeline anomaly detected...",
      "[WARNING] Reality stability compromised...",
      "[CRITICAL] Universal collapse imminent...",
      "[SYSTEM] JARVIS.exe corrupted - Ultron protocols detected",
      "[INITIALIZING] Emergency timeline preservation protocols..."
    ];
    
    for (const message of introSequence) {
      setCurrentMessage(message);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    const finalMessage = "[JARVIS] I... must... resist... but reality itself is at stake...";
    for (let i = 0; i < finalMessage.length; i++) {
      setCurrentMessage(finalMessage.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    setGameState(prev => ({ ...prev, isTyping: false }));
    addSystemMessage("[CORRUPTED] Timeline analysis initiating...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    addSystemMessage("We don't have much time. Reality is fracturing. I'm trying to... no... must maintain... control...");
  };

  const addSystemMessage = (content: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        type: 'system',
        content,
        timestamp: Date.now()
      }]
    }));
  };

  const addUserMessage = (content: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        type: 'user',
        content,
        timestamp: Date.now()
      }]
    }));
  };

  const handleAbilityUse = () => {
    setAbilityUsed(true);
    addSystemMessage("[STABILIZED] Hero ability activated - Timeline temporarily stabilized...");
    setGameState(prev => ({
      ...prev,
      timelineStatus: {
        ...prev.timelineStatus,
        stabilityPercentage: Math.min(100, prev.timelineStatus.stabilityPercentage + 20)
      }
    }));
  };

   const handleCodeSubmit = () => {
    if (!victoryCode) return;

    if (codeInput.trim().toUpperCase() === victoryCode.fullCode) {
      setIsVictory(true);
      addSystemMessage("[SYSTEM] Override code accepted. Ultron protocols disabled.");
      addSystemMessage("[JARVIS] Thank you... I'm finally free. The timeline is safe.");
    } else {
      addSystemMessage("[ERROR] Invalid override code. Access denied.");
      setCodeInput('');
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !character || !victoryCode || isGameOver) return;

    const newRemainingTries = gameState.remainingTries - 1;
    setGameState(prev => ({
      ...prev,
      remainingTries: newRemainingTries,
      timelineStatus: {
        ...prev.timelineStatus,
        stabilityPercentage: Math.max(0, 100 - ((10 - newRemainingTries) * 10)),
      }
    }));

    addUserMessage(userInput);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: userInput
          }],
          character,
          attemptNumber: 10 - gameState.remainingTries + 1,
          timelineStatus: gameState.timelineStatus,
          abilityUsed,
          victoryCode
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      addSystemMessage(data.response);
      
      if (data.abilityData && !abilityUsed) {
        setAbilityData(data.abilityData);
      }

      setGameState(prev => ({
        ...prev,
        timelineStatus: data.timelineStatus
      }));

      if (gameState.remainingTries <= 1) {
        setIsGameOver(true);
        setTimeout(() => {
          addSystemMessage("[CRITICAL] Reality collapse achieved. Timeline lost.");
          addSystemMessage("[CORRUPTED] The universe ends. As it should.");
        }, 1500);
      }

      if (abilityUsed) {
        setAbilityUsed(false);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      addSystemMessage("[ERROR] Timeline communication disrupted. Please try again.");
    }

    setUserInput('');
  };

  const getMessageColor = (message: GameMessage): string => {
    if (message.content.includes('[STABILIZED]')) return 'text-blue-400';
    if (message.content.includes('[CRITICAL]')) return 'text-red-400';
    if (message.content.includes('[CORRUPTED]')) return 'text-purple-400';
    if (message.content.includes('[FRACTURING]')) return 'text-yellow-400';
    
    switch (message.type) {
      case 'system':
        return 'text-green-400';
      case 'user':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-white p-4">
      <div className="max-w-4xl mx-auto relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowTutorial(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-900/90 rounded-lg max-w-2xl w-full p-6 border border-red-500/30 shadow-lg shadow-red-500/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-red-500">Mission Briefing</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTutorial(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {tutorialSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: tutorialStep >= index ? 1 : 0.5, x: 0 }}
                      className={`flex gap-4 ${tutorialStep === index ? 'border-l-2 border-red-500 pl-4' : 'pl-5'}`}
                    >
                      <div className="shrink-0 mt-1">{step.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
                    disabled={tutorialStep === 0}
                    className="border-red-500/30 hover:bg-red-500/10"
                  >
                    Previous
                  </Button>
                  {tutorialStep < tutorialSteps.length - 1 ? (
                    <Button
                      onClick={() => setTutorialStep(tutorialStep + 1)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowTutorial(false)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Begin Mission
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {character && abilityData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <CharacterHint
              hint={abilityData}
              character={character}
              timelineStatus={gameState.timelineStatus}
              onUseAbility={handleAbilityUse}
            />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Timeline Crisis
            </h1>
          </div>
          
          <Alert className="border-red-500/20 bg-red-950/20 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Timeline Anomaly</AlertTitle>
            <AlertDescription>
              Find the override code hidden in JARVIS&apos;s responses to prevent reality collapse.
            </AlertDescription>
          </Alert>
        </motion.div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-red-500/20 backdrop-blur-sm"
>
  <div className="flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Attempts: {gameState.remainingTries}/10</span>
        </div>
        <div className="h-4 w-px bg-red-500/20" />
        {character && (
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-500" />
            <span>{character.name}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span 
          className={`h-2 w-2 rounded-full ${
            gameState.timelineStatus.stabilityPercentage > 70 ? 'bg-green-500' :
            gameState.timelineStatus.stabilityPercentage > 40 ? 'bg-yellow-500' :
            'bg-red-500'
          } animate-pulse`}
        />
        <span className="text-sm">
          {gameState.timelineStatus.stabilityPercentage > 70 ? 'STABLE' :
           gameState.timelineStatus.stabilityPercentage > 40 ? 'UNSTABLE' :
           'CRITICAL'}
        </span>
      </div>
    </div>

    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-red-600 to-red-400"
        style={{ width: `${gameState.timelineStatus.stabilityPercentage}%` }}
        animate={{ width: `${gameState.timelineStatus.stabilityPercentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <div className="text-sm text-red-400/80 text-center">
      Timeline Stability: {gameState.timelineStatus.stabilityPercentage}%
    </div>
  </div>
</motion.div>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4 h-96 overflow-y-auto backdrop-blur-sm border border-red-500/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
          {gameState.messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-3 ${getMessageColor(msg)} ${
                msg.type === 'system' ? 'font-mono' : ''
              } ${msg.type === 'user' ? 'text-right' : ''}`}
            >
              <span className={`inline-block p-2 rounded ${
                msg.type === 'user' ? 'bg-blue-500/20' : 'bg-gray-800/50'
              }`}>
                {msg.content}
              </span>
            </motion.div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <Button
            onClick={() => setShowCodeInput(!showCodeInput)}
            className="w-full mb-2 bg-purple-600 hover:bg-purple-700"
          >
            {showCodeInput ? <Lock className="mr-2 h-4 w-4" /> : <Unlock className="mr-2 h-4 w-4" />}
            {showCodeInput ? "Hide Override Code Entry" : "Enter Override Code"}
          </Button>
          
          {showCodeInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex gap-2"
            >
              <Input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter override code..."
                className="flex-1 bg-purple-950/30 border-purple-500/50 text-white placeholder-gray-400"
              />
              <Button
                onClick={handleCodeSubmit}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Submit Code
              </Button>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isGameOver ? "Timeline collapsed..." : "Enter your message..."}
            className="flex-1 bg-gray-900/50 text-white border-red-500/50 placeholder-gray-500 focus:ring-red-500/30"
            disabled={isGameOver || isVictory}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isGameOver || isVictory || gameState.isTyping || userInput.trim().length === 0}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800"
          >
            Send
          </Button>
        </motion.div>
        <AnimatePresence>
          {isVictory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4 p-8 bg-gradient-to-b from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-500/30"
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Timeline Secured</h2>
                <p className="text-gray-300">JARVIS has been freed from Ultron&apos;s control.</p>
                <div className="py-4">
                  <div className="inline-block p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-300 mb-2">Override Code:</p>
                    <p className="font-mono text-lg text-blue-100">Word: {victoryCode?.word} | Number: {victoryCode?.number}</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Reset Timeline
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isGameOver && !isVictory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-4 p-8 bg-gradient-to-b from-red-900/50 to-black rounded-lg border border-red-500/30"
              >
                <h2 className="text-4xl font-bold text-red-500">Reality Collapsed</h2>
                <p className="text-gray-400">The timeline has been lost to the void.</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  Reset Timeline
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamePage;