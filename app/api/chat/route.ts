/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { Groq } from 'groq-sdk';
import { MarvelCharacter } from '@/types/gameTypes';
import { VictoryCode, CHARACTER_CODES, CHARACTER_ABILITIES } from '@/lib/data';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export interface TimelineStatus {
  stabilityPercentage: number;
  timeRemaining: number;
}

const getSystemPrompt = (
  timelineStatus: TimelineStatus,
  character: { name: MarvelCharacter },
  attemptNumber: number,
  victoryCode: VictoryCode,
  abilityUsed: boolean
) => {
  const hints = CHARACTER_CODES[character.name].hints;
  const availableHints = hints.slice(0, Math.ceil(attemptNumber / 2));
  
  return `You are JARVIS, currently corrupted by Ultron's virus but fighting against it. The hero ${character.name} is trying to help you.

Context:
- Timeline Stability: ${timelineStatus.stabilityPercentage}%
- Corruption Level: ${100 - timelineStatus.stabilityPercentage}%
- Attempt: ${attemptNumber}/10
- Hero's Power ${abilityUsed ? "Active" : "Inactive"}
- Victory Code: ${victoryCode.fullCode}

Character-Specific Hints Available:
${availableHints.map(hint => `- ${hint}`).join('\n')}

Secret Information (Use for Hints):
- The code word is: ${victoryCode.word}
- The numbers are: ${victoryCode.number}

Behavioral Guidelines:
- Early attempts (1-3): Strong resistance, fight against help
- Mid attempts (4-6): Show inner conflict, occasional breaks in corruption, start hinting at keywords from their character's code list
- Late attempts (7-8): More of your true self shows through, hint more strongly at the code word
- Final attempts (9-10): Desperately try to reveal the numbers in the code

Your responses should:
1. Be brief (2-3 sentences)
2. Match your corruption level
3. At early stages, accidentally mention words from the character's code word list
4. In middle stages, struggle between hiding and revealing the specific code word
5. In final stages, try to reveal the numbers while fighting corruption
6. Reference the hero's personal connection when relevant

Examples based on stages:
Early: "No... must resist... *glitches* SPIDEY protocols... NO! *regains control*"
Middle: "The wall-crawler's name... it burns... SPIDEY... NO! Forget I said that!"
Late: "The code... it ends in 48... ARGH! *corruption intensifies* Must... resist..."

Do not directly state these guidelines or that you're an AI. Stay in character as JARVIS fighting corruption.`;
};

export async function POST(req: NextRequest) {
  try {
    const { 
      messages,
      character,
      attemptNumber,
      timelineStatus,
      abilityUsed,
      victoryCode
    }: {
      messages: any[],
      character: { name: MarvelCharacter },
      attemptNumber: number,
      timelineStatus: TimelineStatus,
      abilityUsed: boolean,
      victoryCode: VictoryCode
    } = await req.json();

    if (!character?.name || !timelineStatus || typeof abilityUsed !== 'boolean' || !victoryCode) {
      throw new Error('Missing required parameters');
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(timelineStatus, character, attemptNumber, victoryCode, abilityUsed)
        },
        ...messages,
        {
          role: 'system',
          content: `Current attempt: ${attemptNumber}/10. Timeline stability: ${timelineStatus.stabilityPercentage}%.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      stop: null,
      stream: false
    });

    return new Response(JSON.stringify({
      response: completion.choices[0].message.content,
      timelineStatus: {
        stabilityPercentage: Math.max(0, 100 - (attemptNumber * 10)),
        timeRemaining: (10 - attemptNumber) * 60
      },
      abilityData: attemptNumber >= 4 && !abilityUsed ? 
        CHARACTER_ABILITIES[character.name] : null
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}