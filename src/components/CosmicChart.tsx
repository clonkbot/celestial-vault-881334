import { useMemo } from 'react';

interface Props {
  address: string;
}

export function CosmicChart({ address }: Props) {
  const chartData = useMemo(() => {
    const hash = address.toLowerCase();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months.map((month, index) => {
      const seed = parseInt(hash.slice(2 + index * 2, 4 + index * 2), 16);
      return {
        month,
        value: (seed % 60) + 20,
        energy: (seed % 40) + 30,
      };
    });
  }, [address]);

  const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.energy)));

  return (
    <div className="cosmic-card rounded-2xl p-6 md:p-8">
      <h2 className="font-display text-xl md:text-2xl text-cosmic-gold text-center mb-2">
        Celestial Activity Chart
      </h2>
      <p className="font-body text-sm text-cosmic-silver text-center mb-6">
        Monthly cosmic energy fluctuations
      </p>

      {/* Chart */}
      <div className="relative h-48 md:h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-cosmic-gold/10 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around gap-1 md:gap-2 px-2">
          {chartData.map((data, index) => (
            <div
              key={data.month}
              className="flex-1 flex flex-col items-center gap-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-full flex gap-0.5 items-end h-40 md:h-52">
                {/* Main Activity Bar */}
                <div
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t transition-all duration-1000 ease-out opacity-80 hover:opacity-100"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                />
                {/* Energy Bar */}
                <div
                  className="flex-1 bg-gradient-to-t from-cosmic-bronze to-cosmic-gold rounded-t transition-all duration-1000 ease-out delay-300 opacity-80 hover:opacity-100"
                  style={{ height: `${(data.energy / maxValue) * 100}%` }}
                />
              </div>
              <span className="font-body text-xs text-cosmic-silver mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-t from-indigo-600 to-purple-400" />
          <span className="font-body text-xs text-cosmic-silver">Transactions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-t from-cosmic-bronze to-cosmic-gold" />
          <span className="font-body text-xs text-cosmic-silver">Cosmic Energy</span>
        </div>
      </div>
    </div>
  );
}
