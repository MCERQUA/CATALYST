import { useEffect, useState } from 'react';

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
        return prev + 0.016; // Smooth growth over ~3 seconds
      });
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`text-center transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          The World Changed Yesterday
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-purple-500 animate-pulse [text-shadow:0_0_20px_rgba(147,51,234,0.6)]">
            Change It Back Tomorrow
          </span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-300 mt-8">
          Your Journey To The Future Begins Now
        </p>
      </div>
    </div>
  );
}