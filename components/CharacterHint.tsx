import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  X, Zap, Shield } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CharacterHintProps {
  hint: string | null;
  character: {
    name: string;
    abilities: string[];
  };
  timelineStatus: {
    stabilityPercentage: number;
  };
  onUseAbility: () => void;
}

const CharacterHint: React.FC<CharacterHintProps> = ({ 
  hint, 
  character, 
  timelineStatus,
  onUseAbility 
}) => {
  const [show, setShow] = useState(false);
  const [isAbilityUsed, setIsAbilityUsed] = useState(false);

  useEffect(() => {
    if (hint && !isAbilityUsed) {
      setShow(true);
    }
  }, [hint, isAbilityUsed]);

  const handleUseAbility = () => {
    setIsAbilityUsed(true);
    onUseAbility();
    setTimeout(() => setShow(false), 1000);
  };

  if (!hint || isAbilityUsed) return null;

  type Abilities = {
    [key: string]: {
      icon: string;
      color: string;
      ability: string;
      description: string;
    };
  };

  const getCharacterAbilityDetails = (characterName: string) => {
    const abilities: Abilities = {
      "Spider-Man": {
        icon: "🕷️",
        color: "from-red-600 to-blue-600",
        ability: "Spider-Sense Stabilization",
        description: "Your Spider-Sense can temporarily stabilize the timeline frequency"
      },
      "Iron Man": {
        icon: "🤖",
        color: "from-yellow-600 to-red-600",
        ability: "Quantum Field Analysis",
        description: "JARVIS can synchronize with your suit to analyze timeline patterns"
      },
      "Thor": {
        icon: "⚡",
        color: "from-blue-500 to-yellow-500",
        ability: "Bifrost Resonance",
        description: "Channel Mjolnir's power to stabilize reality fragments"
      },
      "Black Widow": {
        icon: "🕴️",
        color: "from-red-500 to-gray-600",
        ability: "Tactical Timeline Analysis",
        description: "Your strategic mind can identify critical timeline weakpoints"
      },
      "Doctor Strange": {
        icon: "✨",
        color: "from-orange-500 to-purple-600",
        ability: "Mystic Arts Synchronization",
        description: "The Time Stone's residual energy can reveal temporal patterns"
      },
      "Black Panther": {
        icon: "🐆",
        color: "from-purple-600 to-gray-600",
        ability: "Vibranium Pulse",
        description: "Vibranium can temporarily stabilize quantum fluctuations"
      },
      "Captain America": {
        icon: "🛡️",
        color: "from-blue-600 to-red-600",
        ability: "Strategic Time Mapping",
        description: "Your tactical experience can predict timeline convergence points"
      },
      "Scarlet Witch": {
        icon: "🔮",
        color: "from-red-600 to-purple-600",
        ability: "Reality Manipulation",
        description: "Your chaos magic can temporarily hold reality together"
      },
      "Hulk": {
        icon: "💪",
        color: "from-green-600 to-green-800",
        ability: "Gamma Radiation Pulse",
        description: "Channel gamma energy to stabilize temporal anomalies"
      }
    };
    return abilities[characterName] || abilities["Iron Man"];
  };

  const abilityDetails = getCharacterAbilityDetails(character.name);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <Alert className="relative overflow-hidden bg-black border border-white/10 text-white shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-r ${abilityDetails.color} opacity-10 blur-xl`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{abilityDetails.icon}</span>
                  <h3 className="font-bold text-lg tracking-tight">
                    {abilityDetails.ability}
                  </h3>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
        
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield className="h-4 w-4" />
                  <span>Timeline: {timelineStatus.stabilityPercentage}%</span>
                </div>
              </div>
              <AlertDescription className="mb-4 text-white/90">
                {abilityDetails.description}
              </AlertDescription>

              <button
                onClick={handleUseAbility}
                className={`w-full py-2 px-4 rounded bg-gradient-to-r ${abilityDetails.color} 
                           text-white font-medium transform hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-200 shadow-lg hover:shadow-xl
                           flex items-center justify-center gap-2`}
              >
                <Zap className="h-4 w-4" />
                Activate Ability
              </button>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterHint;