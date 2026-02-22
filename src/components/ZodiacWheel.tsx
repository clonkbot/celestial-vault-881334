import { useState, useEffect } from 'react';

interface Props {
  address: string;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries', element: 'Fire' },
  { symbol: '♉', name: 'Taurus', element: 'Earth' },
  { symbol: '♊', name: 'Gemini', element: 'Air' },
  { symbol: '♋', name: 'Cancer', element: 'Water' },
  { symbol: '♌', name: 'Leo', element: 'Fire' },
  { symbol: '♍', name: 'Virgo', element: 'Earth' },
  { symbol: '♎', name: 'Libra', element: 'Air' },
  { symbol: '♏', name: 'Scorpio', element: 'Water' },
  { symbol: '♐', name: 'Sagittarius', element: 'Fire' },
  { symbol: '♑', name: 'Capricorn', element: 'Earth' },
  { symbol: '♒', name: 'Aquarius', element: 'Air' },
  { symbol: '♓', name: 'Pisces', element: 'Water' },
];

export function ZodiacWheel({ address }: Props) {
  const [activeSign, setActiveSign] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Derive zodiac from wallet address
  useEffect(() => {
    const hash = parseInt(address.slice(2, 4), 16);
    const signIndex = hash % 12;
    setActiveSign(signIndex);
    setRotation(-signIndex * 30);
  }, [address]);

  const walletSign = ZODIAC_SIGNS[activeSign];

  const elementColors: Record<string, string> = {
    Fire: 'text-orange-400',
    Earth: 'text-emerald-400',
    Air: 'text-sky-400',
    Water: 'text-blue-400',
  };

  return (
    <div className="cosmic-card rounded-2xl p-6 md:p-8">
      <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-6">
        Wallet Ascendant
      </h2>

      <div className="relative flex justify-center">
        {/* Outer Ring */}
        <div
          className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border border-cosmic-gold/30 transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {ZODIAC_SIGNS.map((sign, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <button
                key={sign.name}
                onClick={() => {
                  setActiveSign(index);
                  setRotation(-index * 30);
                }}
                className={`absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl transition-all duration-300 rounded-full ${
                  index === activeSign
                    ? 'text-cosmic-gold scale-125 glow-pulse'
                    : 'text-cosmic-silver/60 hover:text-cosmic-silver hover:scale-110'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 1.25rem)`,
                  top: `calc(50% + ${y}px - 1.25rem)`,
                  transform: `rotate(${-rotation}deg)`,
                }}
              >
                {sign.symbol}
              </button>
            );
          })}

          {/* Center Display */}
          <div
            className="absolute inset-8 md:inset-12 rounded-full bg-cosmic-deep border border-cosmic-gold/20 flex flex-col items-center justify-center"
            style={{ transform: `rotate(${-rotation}deg)` }}
          >
            <span className="text-5xl md:text-6xl zodiac-symbol text-cosmic-gold">
              {walletSign.symbol}
            </span>
            <span className="font-display text-lg md:text-xl text-cosmic-light mt-2">
              {walletSign.name}
            </span>
            <span className={`font-body text-sm ${elementColors[walletSign.element]}`}>
              {walletSign.element} Sign
            </span>
          </div>
        </div>
      </div>

      {/* Sign Description */}
      <div className="mt-6 text-center">
        <p className="font-body text-sm md:text-base text-cosmic-silver max-w-sm mx-auto">
          This wallet resonates with the energy of <span className="text-cosmic-gold">{walletSign.name}</span>,
          channeling {walletSign.element.toLowerCase()} element traits in its on-chain activities.
        </p>
      </div>
    </div>
  );
}
