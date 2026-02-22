import { useState, useEffect } from 'react';
import { StarField } from './components/StarField';
import { ZodiacWheel } from './components/ZodiacWheel';
import { WalletStats } from './components/WalletStats';
import { CosmicChart } from './components/CosmicChart';
import { TokenOrbit } from './components/TokenOrbit';
import { CosmicReading } from './components/CosmicReading';
import './styles.css';

const WALLET_ADDRESS = '0xfd2d53b5b47efb3768586515082230130879172b';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'reading'>('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const shortAddress = `${WALLET_ADDRESS.slice(0, 6)}...${WALLET_ADDRESS.slice(-4)}`;

  return (
    <div className="min-h-screen bg-cosmic-dark text-cosmic-light relative overflow-x-hidden">
      <StarField />

      {/* Cosmic Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none cosmic-gradient-overlay" />

      {/* Nebula Effects */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] nebula-blob opacity-30" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] nebula-blob-2 opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`pt-6 md:pt-10 px-4 md:px-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-cosmic-gold tracking-wider cosmic-glow">
                  CELESTIAL VAULT
                </h1>
                <p className="font-body text-sm md:text-base text-cosmic-silver mt-1 tracking-widest uppercase">
                  On-Chain Astrology Portal
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                <a
                  href={`https://etherscan.io/address/${WALLET_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs md:text-sm text-cosmic-silver hover:text-cosmic-gold transition-colors art-nouveau-border px-4 py-2"
                >
                  {shortAddress}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className={`mt-6 md:mt-8 px-4 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-2 md:gap-4">
              {[
                { id: 'overview', label: 'Cosmic Overview', icon: '✧' },
                { id: 'tokens', label: 'Token Orbits', icon: '◎' },
                { id: 'reading', label: 'Your Reading', icon: '☽' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 md:px-6 py-3 font-body text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-cosmic-gold border-b-2 border-cosmic-gold'
                      : 'text-cosmic-silver hover:text-cosmic-light'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Decorative Divider */}
        <div className={`my-6 md:my-8 flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="art-nouveau-divider w-64 md:w-96" />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 px-4 md:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && (
              <div className={`space-y-8 md:space-y-12 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <ZodiacWheel address={WALLET_ADDRESS} />
                  <WalletStats address={WALLET_ADDRESS} />
                </div>
                <CosmicChart address={WALLET_ADDRESS} />
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <TokenOrbit address={WALLET_ADDRESS} />
              </div>
            )}

            {activeTab === 'reading' && (
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <CosmicReading address={WALLET_ADDRESS} />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 text-center">
          <p className="font-body text-xs text-cosmic-silver/50 tracking-wider">
            Requested by <span className="text-cosmic-silver/70">@jianke2</span> · Built by <span className="text-cosmic-silver/70">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
