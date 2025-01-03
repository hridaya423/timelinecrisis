  'use client';

  import React, { useState, useEffect } from 'react';
  import { useRouter } from 'next/navigation';
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import CharacterCard from '@/components/CharacterCard';
  import { motion } from 'framer-motion';
  import { Sparkles } from 'lucide-react';
  import { MARVEL_CHARACTERS } from '@/lib/data';


  interface Character {
      id: number;
      name: string;
      image: string;
      abilities: string[];
      description: string;
    }

    const CharacterSelect: React.FC = () => {
      const router = useRouter();
      const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);
      const [playerName, setPlayerName] = useState<string>('');
    
      useEffect(() => {
        const storedName = localStorage.getItem('playerName');
        if (storedName) {
          setPlayerName(storedName);
        }
      }, []);
    
      const handleSelect = (character: Character) => {
        setSelectedCharacter(character);
        setShowConfirmDialog(true);
      };
    
      const handleConfirm = () => {
        if (selectedCharacter) {
          localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
          router.push('/game');
        }
      };
    
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center py-6 relative overflow-hidden">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.15),rgba(0,0,0,1)_70%)]" />
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
            </div>
          </div>
    
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '18px 18px, 26px 26px',
              backgroundPosition: '0 0, 9px 9px'
            }} 
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center mb-8 max-w-2xl px-4"
          >
            <div className="relative inline-block">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                <span className="text-white">Choose Your </span>
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                    Identity
                  </span>
                  <Sparkles className="absolute -right-8 -top-1 w-5 h-5 text-purple-400/70" />
                </span>
              </h1>
            </div>
    
            <div className="w-1/2 h-px mx-auto bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-3" />
    
            <p className="text-lg text-purple-200/80 tracking-wide">
              Get Ready, <span className="text-pink-400 font-semibold">{playerName}</span>
            </p>
          </motion.div>
          <div className="relative z-10 w-full max-w-[1600px] px-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-20">
                {MARVEL_CHARACTERS.map((character) => (
                  <CarouselItem key={character.id} className="pl-20 basis-1/3">
                    <div className="p-4">
                      <CharacterCard
                        {...character}
                        onSelect={() => handleSelect(character)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
    
              <CarouselPrevious className="w-11 h-11 -left-16 
                                      bg-gradient-to-r from-purple-700/90 to-pink-600/90
                                      hover:from-purple-600 hover:to-pink-500
                                      border border-purple-500/50 hover:border-purple-400
                                      text-white/90 hover:text-white
                                      transition-all duration-500" />
              <CarouselNext className="w-11 h-11 -right-16
                                      bg-gradient-to-r from-purple-700/90 to-pink-600/90
                                      hover:from-purple-600 hover:to-pink-500
                                      border border-purple-500/50 hover:border-purple-400
                                      text-white/90 hover:text-white
                                      transition-all duration-500" />
            </Carousel>
          </div>
    
          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent className="sm:max-w-md bg-gradient-to-b from-purple-900/95 to-black/95 border border-purple-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center text-white">Confirm Character</DialogTitle>
                <DialogDescription className="text-center text-purple-200">
                  Are you ready to begin your journey as {selectedCharacter?.name}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={() => setShowConfirmDialog(false)}
                  variant="outline"
                  className="border-purple-500/50 hover:bg-purple-950/50 text-purple-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 
                          hover:from-purple-500 hover:to-pink-500
                          text-white shadow-lg hover:shadow-xl
                          transition-all duration-300"
                >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    };
    
    export default CharacterSelect;