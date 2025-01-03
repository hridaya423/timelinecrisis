import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  image: string;
  abilities: string[];
  description: string;
  onSelect: () => void;
}

interface MousePosition {
  x: number;
  y: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  name, 
  image, 
  abilities, 
  description, 
  onSelect 
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute inset-0 -m-1 rounded-xl bg-gradient-to-b from-purple-500/20 via-transparent to-purple-500/20 blur-sm" />
      
      <Card 
        onMouseMove={handleMouseMove}
        className="group w-96 h-[720px] relative overflow-hidden rounded-lg
                 bg-gradient-to-b from-black/95 via-black/80 to-black/95 
                 hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)]
                 transition-all duration-700"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            background: `
              radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(147, 51, 234, 0.08),
                rgba(139, 92, 246, 0.05),
                transparent 70%)`
          }}
        />

        <div className="absolute inset-0 p-[1px] rounded-lg">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-purple-500/30 via-pink-500/20 to-purple-500/30 
                         opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 rounded-lg bg-gradient-conic from-purple-500/30 via-pink-500/20 to-purple-500/30 
                         opacity-0 group-hover:opacity-100 group-hover:animate-spin-slower transition-all duration-700" />
        </div>

        <div className="relative h-full p-8 flex flex-col items-center">
          <motion.div 
            className="relative w-full h-80 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 rounded-xl border border-purple-500/20 
                         bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5" />
            
            <div className="absolute -inset-2 bg-gradient-radial from-purple-500/10 via-transparent to-transparent
                         opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

            <div className="relative h-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain transform transition-all duration-700 
                         group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative mb-4 group/title"
          >
            <h2 className="text-4xl font-bold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r 
                           from-purple-300 via-pink-300 to-purple-300
                           group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-200
                           transition-all duration-700">
                {name}
              </span>
              <Sparkles className="absolute -right-8 top-1 w-5 h-5 text-purple-400/70 
                               opacity-0 group-hover/title:opacity-100 transition-opacity duration-700" />
            </h2>
          </motion.div>
          <p className="text-purple-200/70 text-center mb-6 italic font-light
                     transition-colors duration-700 group-hover:text-purple-100/90 px-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center mb-12 px-2">
            {abilities.map((ability, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge
                  variant="outline"
                  className="bg-black/20 border-purple-500/30 text-purple-300/90
                           hover:bg-purple-950/20 hover:border-purple-400 hover:text-purple-200
                           shadow-sm hover:shadow-purple-500/20 py-1.5 px-3
                           transition-all duration-500"
                >
                  {ability}
                </Badge>
              </motion.div>
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-8"
          >
            <Button
              onClick={onSelect}
              className="w-48 h-11 relative overflow-hidden rounded-lg
                      bg-gradient-to-r from-purple-700/90 via-pink-600/90 to-purple-700/90
                      hover:from-purple-600 hover:via-pink-500 hover:to-purple-600
                      shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30
                      border border-purple-500/50 hover:border-purple-400/70
                      text-white/90 hover:text-white
                      transition-all duration-500"
            >
              <span className="relative z-10 font-semibold tracking-wide">Choose</span>
              <div className="absolute inset-0 w-full translate-x-[-100%] 
                           group-hover:translate-x-[100%]
                           bg-gradient-to-r from-transparent via-white/10 to-transparent 
                           transition-transform duration-1000" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                           bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 
                           blur-md transition-opacity duration-500" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CharacterCard;