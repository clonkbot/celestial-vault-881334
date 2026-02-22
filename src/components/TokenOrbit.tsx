import { useState, useMemo } from 'react';

interface Props {
  address: string;
}

interface BaseToken {
  name: string;
  symbol: string;
  color: string;
  orbitRadius: number;
  orbitDuration: number;
  celestialBody: string;
}

interface Token extends BaseToken {
  balance: string;
  value: number;
}

export function TokenOrbit({ address }: Props) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const tokens = useMemo((): Token[] => {
    const hash = address.toLowerCase();
    const tokenList: BaseToken[] = [
      { name: 'Ethereum', symbol: 'ETH', celestialBody: '☉', color: '#627EEA', orbitRadius: 60, orbitDuration: 8 },
      { name: 'Wrapped Bitcoin', symbol: 'WBTC', celestialBody: '☿', color: '#F7931A', orbitRadius: 90, orbitDuration: 12 },
      { name: 'USD Coin', symbol: 'USDC', celestialBody: '♀', color: '#2775CA', orbitRadius: 120, orbitDuration: 16 },
      { name: 'Chainlink', symbol: 'LINK', celestialBody: '♂', color: '#375BD2', orbitRadius: 150, orbitDuration: 20 },
      { name: 'Uniswap', symbol: 'UNI', celestialBody: '♃', color: '#FF007A', orbitRadius: 180, orbitDuration: 25 },
      { name: 'Aave', symbol: 'AAVE', celestialBody: '♄', color: '#B6509E', orbitRadius: 210, orbitDuration: 30 },
    ];

    return tokenList.map((token, index) => {
      const seed = parseInt(hash.slice(2 + index * 4, 6 + index * 4), 16);
      return {
        ...token,
        balance: ((seed % 10000) / 100).toFixed(4),
        value: (seed % 50000) / 100,
      };
    });
  }, [address]);

  return (
    <div className="cosmic-card rounded-2xl p-6 md:p-8">
      <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-2">
        Token Planetary System
      </h2>
      <p className="font-body text-sm text-cosmic-silver text-center mb-8">
        Your tokens orbit in celestial harmony
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Orbit Visualization */}
        <div className="relative w-full max-w-md aspect-square flex-shrink-0">
          {/* Orbit Rings */}
          {tokens.map((token) => (
            <div
              key={`ring-${token.symbol}`}
              className="absolute rounded-full border border-cosmic-gold/10"
              style={{
                width: token.orbitRadius * 2,
                height: token.orbitRadius * 2,
                left: `calc(50% - ${token.orbitRadius}px)`,
                top: `calc(50% - ${token.orbitRadius}px)`,
              }}
            />
          ))}

          {/* Center Sun */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-cosmic-gold to-orange-500 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)] z-10">
            <span className="text-2xl">☀</span>
          </div>

          {/* Orbiting Tokens */}
          {tokens.map((token, index) => (
            <button
              key={token.symbol}
              onClick={() => setSelectedToken(token)}
              className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform hover:scale-125 z-20 ${
                selectedToken?.symbol === token.symbol ? 'ring-2 ring-cosmic-gold scale-125' : ''
              }`}
              style={{
                animation: `orbit ${token.orbitDuration}s linear infinite`,
                ['--radius' as string]: `${token.orbitRadius}px`,
                animationDelay: `${-index * 2}s`,
                left: 'calc(50% - 1.25rem)',
                top: 'calc(50% - 1.25rem)',
                backgroundColor: token.color,
                boxShadow: `0 0 20px ${token.color}80`,
              }}
            >
              <span className="text-white text-lg">{token.celestialBody}</span>
            </button>
          ))}
        </div>

        {/* Token List */}
        <div className="flex-1 w-full">
          <div className="space-y-3">
            {tokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token)}
                className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                  selectedToken?.symbol === token.symbol
                    ? 'border-cosmic-gold bg-cosmic-gold/10'
                    : 'border-cosmic-gold/20 bg-cosmic-dark/50 hover:border-cosmic-gold/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: token.color }}
                    >
                      <span className="text-white">{token.celestialBody}</span>
                    </div>
                    <div>
                      <p className="font-display text-cosmic-light">{token.name}</p>
                      <p className="font-mono text-xs text-cosmic-silver">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-cosmic-light">{token.balance}</p>
                    <p className="font-body text-xs text-cosmic-gold">${token.value.toFixed(2)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Total Value */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cosmic-gold/20 to-cosmic-bronze/20 border border-cosmic-gold/30">
            <div className="flex justify-between items-center">
              <span className="font-body text-cosmic-silver">Total Portfolio Value</span>
              <span className="font-display text-2xl text-cosmic-gold">
                ${tokens.reduce((sum, t) => sum + t.value, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
