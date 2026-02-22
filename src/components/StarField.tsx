import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = window.innerWidth < 640 ? 50 : 100;

      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            ['--duration' as string]: `${star.duration}s`,
            ['--delay' as string]: `${star.delay}s`,
          }}
        />
      ))}

      {/* Shooting star occasional */}
      <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '15%', left: '80%', animationDuration: '4s' }} />
      <div className="absolute w-0.5 h-0.5 bg-cosmic-gold rounded-full animate-ping" style={{ top: '45%', left: '20%', animationDuration: '6s', animationDelay: '2s' }} />
    </div>
  );
}
