import { MarvelCharacter, CharacterAbility, CharacterCodeConfig } from "@/types/gameTypes";
export const MARVEL_CHARACTERS = [
    {
      id: 1,
      name: "Spider-Man",
      image: "/characters/spiderman.png",
      abilities: [
        "Wall-Crawling",
        "Spider-Sense",
        "Superhuman Strength",
        "Web-Shooting",
        "Enhanced Agility"
      ],
      description: "Your friendly neighborhood Spider-Man!"
    },
    {
      id: 2,
      name: "Iron Man",
      image: "/characters/ironman.png",
      abilities: [
        "Genius Intellect",
        "Advanced Technology",
        "Powered Armor",
        "Flight",
        "Energy Repulsors"
      ],
      description: "Genius, billionaire, playboy, philanthropist."
    },
    {
      id: 3,
      name: "Thor",
      image: "/characters/thor.png",
      abilities: [
        "God of Thunder",
        "Mjolnir Control",
        "Lightning Manipulation",
        "Superhuman Durability",
        "Immortality"
      ],
      description: "God of Thunder, Protector of the Nine Realms"
    },
    {
      id: 4,
      name: "Black Widow",
      image: "/characters/blackwidow.png",
      abilities: [
        "Master Spy",
        "Expert Martial Artist",
        "Weapons Expert",
        "Strategic Mind",
        "Peak Human Condition"
      ],
      description: "Master spy and deadly assassin"
    },
    {
      id: 5,
      name: "Doctor Strange",
      image: "/characters/doctorstrange.png",
      abilities: [
        "Mystic Arts",
        "Time Manipulation",
        "Reality Warping",
        "Dimensional Travel",
        "Energy Projection"
      ],
      description: "Master of the Mystic Arts"
    },
    {
      id: 6,
      name: "Black Panther",
      image: "/characters/blackpanther.png",
      abilities: [
        "Enhanced Strength",
        "Vibranium Suit",
        "Martial Arts Master",
        "Enhanced Senses",
        "Diplomatic Immunity"
      ],
      description: "King of Wakanda, Protector of his people"
    },
    {
      id: 7,
      name: "Captain America",
      image: "/characters/captainamerica.png",
      abilities: [
        "Peak Human Condition",
        "Master Tactician",
        "Shield Master",
        "Enhanced Strength",
        "Leadership"
      ],
      description: "The First Avenger"
    },
    {
      id: 8,
      name: "Scarlet Witch",
      image: "/characters/scarletwitch.png",
      abilities: [
        "Reality Manipulation",
        "Chaos Magic",
        "Telekinesis",
        "Energy Projection",
        "Mind Control"
      ],
      description: "Most powerful Avenger"
    },
    {
      id: 9,
      name: "Hulk",
      image: "/characters/hulk.png",
      abilities: [
        "Unlimited Strength",
        "Regenerative Healing",
        "Superhuman Durability",
        "Gamma Radiation",
        "Genius Intellect"
      ],
      description: "The strongest there is!"
    }
  ];

  export const CHARACTER_ABILITIES: Record<MarvelCharacter, CharacterAbility> = {
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
  } as const;
  
  export const CHARACTER_CODES: Record<MarvelCharacter, CharacterCodeConfig> = {
    "Spider-Man": {
      words: ["WEBSLINGER", "RESPONSIBILITY", "PARKER", "SPIDEY"],
      hints: [
        "Remember what Uncle Ben taught us about great power?",
        "Think about the webs we use to protect the city",
        "MJ's favorite word for describing your heroics",
        "The Daily Bugle's favorite wall-crawler"
      ]
    },
    "Iron Man": {
      words: ["JARVIS", "GENIUS", "STARK", "MARK"],
      hints: [
        "Your closest digital companion's name",
        "The word Pepper uses to describe your mind",
        "The legacy you're trying to protect",
        "Each suit has this designation"
      ]
    },
    "Thor": {
      words: ["MJOLNIR", "WORTHY", "ASGARD", "THUNDER"],
      hints: [
        "Only the worthy can lift it",
        "What Odin saw in you",
        "Your eternal home",
        "Your domain of power"
      ]
    },
    "Black Widow": {
      words: ["WIDOW", "LEDGER", "SHIELD", "NATASHA"],
      hints: [
        "Code name from your past",
        "What you're trying to clear",
        "The organization that gave you a second chance",
        "The name only your closest friends use"
      ]
    },
    "Doctor Strange": {
      words: ["SANCTUM", "MYSTIC", "KAMAR", "SORCERER"],
      hints: [
        "Your place of power and protection",
        "The arts you mastered",
        "The taj of dimensional gateways",
        "Your title in the order"
      ]
    },
    "Black Panther": {
      words: ["WAKANDA", "VIBRANIUM", "WARRIOR", "PANTHER"],
      hints: [
        "The kingdom you protect",
        "Your nation's greatest resource",
        "What your father trained you to be",
        "The mantle you carry"
      ]
    },
    "Captain America": {
      words: ["SHIELD", "SOLDIER", "AMERICA", "AVENGER"],
      hints: [
        "Your iconic weapon",
        "What you were before the serum",
        "The nation you represent",
        "Earth's mightiest defender"
      ]
    },
    "Scarlet Witch": {
      words: ["CHAOS", "VISION", "WITCH", "REALITY"],
      hints: [
        "The magic you control",
        "Your greatest love",
        "Your destined title",
        "What you can bend to your will"
      ]
    },
    "Hulk": {
      words: ["SMASH", "BANNER", "GAMMA", "STRONGEST"],
      hints: [
        "Your favorite word",
        "The scientist within",
        "The radiation that changed you",
        "What you truly are"
      ]
    }
  } as const;
  
  export interface VictoryCode {
    word: string;
    number: number;
    fullCode: string;
  }
  
  export const generateCharacterCode = (characterName: MarvelCharacter): VictoryCode => {
    const character = CHARACTER_CODES[characterName];
    const word = character.words[Math.floor(Math.random() * character.words.length)];
    const number = Math.floor(Math.random() * 90) + 10; // 10-99
    return {
      word,
      number,
      fullCode: `${word}-${number}`
    };
  };
  
  export const getCharacterHints = (
    characterName: MarvelCharacter, 
    attemptsRemaining: number
  ): string[] => {
    const character = CHARACTER_CODES[characterName];
    const numHints = Math.min(4, Math.ceil((10 - attemptsRemaining) / 2));
    return character.hints.slice(0, numHints);
  };

