import { useEffect, useState } from 'react';
import { FireButton } from './FireButton';
import { WelcomeMouseEffect } from './WelcomeMouseEffect';
import { WelcomeAmbientBackground } from './WelcomeAmbientBackground';

export function WelcomeMessage() {
  const [scale, setScale] = useState(0.2);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setInterval(() => {
      setScale(prev => {
        if (prev >= 1) {
          clearInterval(timer);
          return 1;
        }
        return prev + 0.016;
      });
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <WelcomeMouseEffect />
      <WelcomeAmbientBackground />
      <div 
        className={`text-center transition-opacity duration-1000 min-h-screen flex items-center justify-center ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <div className="space-y-12">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              The most powerful reactions
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              start with a single{' '}
              <span className="text-[#ff6b08] animate-pulse [text-shadow:0_0_15px_#ff6b08] inline-block transform scale-110 ml-2">
                spark
              </span>
            </h1>
          </div>

          <div>
            <FireButton />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              The smallest spark knows nothing
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              of the fire it{' '}
              <span className="text-[#ff6b08] animate-pulse [text-shadow:0_0_15px_#ff6b08] inline-block transform scale-110 ml-2">
                Ignites
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}