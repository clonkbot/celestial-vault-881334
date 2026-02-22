import { useState, useEffect } from 'react';

interface Props {
  address: string;
}

interface WalletData {
  balance: string;
  transactions: number;
  firstActivity: string;
  cosmicAge: string;
  powerLevel: number;
  constellation: string;
}

export function WalletStats({ address }: Props) {
  const [data, setData] = useState<WalletData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Generate deterministic "cosmic" data from address
    const hash = address.toLowerCase();
    const seed1 = parseInt(hash.slice(2, 10), 16);
    const seed2 = parseInt(hash.slice(10, 18), 16);
    const seed3 = parseInt(hash.slice(18, 26), 16);

    const constellations = [
      'Orion', 'Ursa Major', 'Cassiopeia', 'Draco', 'Cygnus',
      'Lyra', 'Aquila', 'Pegasus', 'Andromeda', 'Perseus'
    ];

    setData({
      balance: ((seed1 % 10000) / 100).toFixed(4),
      transactions: seed2 % 5000 + 100,
      firstActivity: `${2020 + (seed3 % 4)}-${String((seed3 % 12) + 1).padStart(2, '0')}-${String((seed3 % 28) + 1).padStart(2, '0')}`,
      cosmicAge: `${(seed1 % 1000) + 365} days`,
      powerLevel: (seed2 % 100) + 1,
      constellation: constellations[seed3 % constellations.length],
    });

    setIsAnimating(true);
  }, [address]);

  if (!data) return null;

  const stats = [
    { label: 'Cosmic Balance', value: `${data.balance} ETH`, icon: '◈' },
    { label: 'Transactions', value: data.transactions.toLocaleString(), icon: '⟡' },
    { label: 'First Contact', value: data.firstActivity, icon: '✦' },
    { label: 'Cosmic Age', value: data.cosmicAge, icon: '☉' },
    { label: 'Power Level', value: `${data.powerLevel}%`, icon: '⚡' },
    { label: 'Constellation', value: data.constellation, icon: '✧' },
  ];

  return (
    <div className="cosmic-card rounded-2xl p-6 md:p-8">
      <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-6">
        Celestial Metrics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`relative p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-gold/10 transition-all duration-500 hover:border-cosmic-gold/30 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cosmic-gold text-lg">{stat.icon}</span>
              <span className="font-body text-xs text-cosmic-silver uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <p className="font-display text-lg md:text-xl text-cosmic-light">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Power Level Bar */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="font-body text-sm text-cosmic-silver">Cosmic Energy Level</span>
          <span className="font-mono text-sm text-cosmic-gold">{data.powerLevel}%</span>
        </div>
        <div className="h-3 bg-cosmic-dark rounded-full overflow-hidden border border-cosmic-gold/20">
          <div
            className="h-full bg-gradient-to-r from-cosmic-bronze via-cosmic-gold to-yellow-300 transition-all duration-1000 ease-out"
            style={{ width: isAnimating ? `${data.powerLevel}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
