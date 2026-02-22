import { useMemo, useState } from 'react';

interface Props {
  address: string;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries' },
  { symbol: '♉', name: 'Taurus' },
  { symbol: '♊', name: 'Gemini' },
  { symbol: '♋', name: 'Cancer' },
  { symbol: '♌', name: 'Leo' },
  { symbol: '♍', name: 'Virgo' },
  { symbol: '♎', name: 'Libra' },
  { symbol: '♏', name: 'Scorpio' },
  { symbol: '♐', name: 'Sagittarius' },
  { symbol: '♑', name: 'Capricorn' },
  { symbol: '♒', name: 'Aquarius' },
  { symbol: '♓', name: 'Pisces' },
];

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

export function CosmicReading({ address }: Props) {
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const reading = useMemo(() => {
    const hash = address.toLowerCase();

    const sunSign = ZODIAC_SIGNS[parseInt(hash.slice(2, 4), 16) % 12];
    const moonSign = ZODIAC_SIGNS[parseInt(hash.slice(4, 6), 16) % 12];
    const risingSign = ZODIAC_SIGNS[parseInt(hash.slice(6, 8), 16) % 12];

    const traits = [
      'Visionary', 'Determined', 'Intuitive', 'Bold', 'Analytical',
      'Creative', 'Strategic', 'Resilient', 'Innovative', 'Patient'
    ];

    const traitIndex1 = parseInt(hash.slice(8, 10), 16) % traits.length;
    const traitIndex2 = parseInt(hash.slice(10, 12), 16) % traits.length;
    const traitIndex3 = parseInt(hash.slice(12, 14), 16) % traits.length;

    const predictions = [
      'A significant transaction will bring unexpected gains.',
      'The stars align for a new DeFi venture.',
      'Mercury retrograde warns against impulsive trades.',
      'Jupiter\'s blessing favors long-term holdings.',
      'A cosmic convergence suggests portfolio diversification.',
      'Venus enters your wealth house - expect positive flows.',
      'The new moon heralds fresh opportunities in NFTs.',
      'Saturn\'s influence calls for patience in the markets.',
    ];

    const planetaryPositions = PLANETS.map((planet, i) => ({
      planet,
      sign: ZODIAC_SIGNS[parseInt(hash.slice(14 + i * 2, 16 + i * 2), 16) % 12],
      degree: parseInt(hash.slice(28 + i, 29 + i), 16) % 30,
    }));

    return {
      sunSign,
      moonSign,
      risingSign,
      dominantTraits: [traits[traitIndex1], traits[traitIndex2], traits[traitIndex3]],
      prediction: predictions[parseInt(hash.slice(14, 16), 16) % predictions.length],
      planetaryPositions,
      luckyNumbers: [
        parseInt(hash.slice(32, 34), 16) % 100,
        parseInt(hash.slice(34, 36), 16) % 100,
        parseInt(hash.slice(36, 38), 16) % 100,
      ],
      cosmicAlignment: ((parseInt(hash.slice(38, 40), 16) % 50) + 50),
    };
  }, [address]);

  const toggleCard = (index: number) => {
    setRevealedCards(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const tarotCards = [
    { title: 'Past', content: `Guided by ${reading.sunSign.name}`, symbol: reading.sunSign.symbol },
    { title: 'Present', content: `Illuminated by ${reading.moonSign.name}`, symbol: reading.moonSign.symbol },
    { title: 'Future', content: `Rising towards ${reading.risingSign.name}`, symbol: reading.risingSign.symbol },
  ];

  return (
    <div className="space-y-8">
      {/* Tarot-style Cards */}
      <div className="cosmic-card rounded-2xl p-6 md:p-8">
        <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-2">
          Your Cosmic Destiny
        </h2>
        <p className="font-body text-sm text-cosmic-silver text-center mb-8">
          Click the cards to reveal your celestial path
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          {tarotCards.map((card, index) => (
            <button
              key={card.title}
              onClick={() => toggleCard(index)}
              className={`relative w-full md:w-48 h-72 rounded-xl border-2 transition-all duration-700 transform-gpu ${
                revealedCards.includes(index)
                  ? 'border-cosmic-gold rotate-0'
                  : 'border-cosmic-gold/30 hover:border-cosmic-gold/60'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: revealedCards.includes(index) ? 'rotateY(0deg)' : 'rotateY(180deg)',
              }}
            >
              {/* Card Back */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br from-cosmic-purple via-cosmic-deep to-cosmic-dark flex items-center justify-center ${
                  revealedCards.includes(index) ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-center">
                  <div className="text-4xl text-cosmic-gold mb-2">✧</div>
                  <p className="font-display text-cosmic-silver">{card.title}</p>
                  <p className="font-body text-xs text-cosmic-silver/60 mt-2">Click to reveal</p>
                </div>
              </div>

              {/* Card Front */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br from-cosmic-gold/20 via-cosmic-bronze/10 to-cosmic-dark p-4 flex flex-col items-center justify-center ${
                  revealedCards.includes(index) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="font-body text-sm text-cosmic-silver uppercase tracking-widest mb-4">
                  {card.title}
                </span>
                <span className="text-6xl text-cosmic-gold zodiac-symbol mb-4">
                  {card.symbol}
                </span>
                <p className="font-body text-center text-cosmic-light">
                  {card.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Planetary Positions */}
      <div className="cosmic-card rounded-2xl p-6 md:p-8">
        <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-6">
          Planetary Alignment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {reading.planetaryPositions.map((position) => (
            <div
              key={position.planet}
              className="p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-gold/10 hover:border-cosmic-gold/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-cosmic-light">{position.planet}</span>
                <span className="text-2xl text-cosmic-gold">{position.sign.symbol}</span>
              </div>
              <p className="font-body text-sm text-cosmic-silver">
                {position.sign.name} at {position.degree}°
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Traits & Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="cosmic-card rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-lg text-cosmic-gold mb-4">Dominant Traits</h3>
          <div className="flex flex-wrap gap-3">
            {reading.dominantTraits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-2 rounded-full bg-cosmic-gold/10 border border-cosmic-gold/30 font-body text-cosmic-light"
              >
                {trait}
              </span>
            ))}
          </div>

          <h3 className="font-display text-lg text-cosmic-gold mt-6 mb-4">Lucky Numbers</h3>
          <div className="flex gap-4">
            {reading.luckyNumbers.map((num, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cosmic-gold to-cosmic-bronze flex items-center justify-center font-display text-cosmic-dark font-bold"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="cosmic-card rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-lg text-cosmic-gold mb-4">Cosmic Prophecy</h3>
          <blockquote className="font-body text-lg md:text-xl text-cosmic-light italic leading-relaxed">
            "{reading.prediction}"
          </blockquote>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="font-body text-sm text-cosmic-silver">Cosmic Alignment</span>
              <span className="font-mono text-sm text-cosmic-gold">{reading.cosmicAlignment}%</span>
            </div>
            <div className="h-3 bg-cosmic-dark rounded-full overflow-hidden border border-cosmic-gold/20">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cosmic-gold rounded-full"
                style={{ width: `${reading.cosmicAlignment}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
