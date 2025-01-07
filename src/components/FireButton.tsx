import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface Particle {
  element: HTMLDivElement;
  startX: number;
  endX: number;
  endY: number;
  duration: number;
  maxOpacity: number;
}

export function FireButton() {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>();

  const createParticle = (): Particle => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const startX = Math.random() * (buttonRef.current?.offsetWidth || 0);
    const endXVariation = (Math.random() - 0.5) * 50;
    const endYVariation = -(Math.random() * 150 + 50);
    
    const colors = ['#ff6b08', '#ff4500', '#ffd700', '#ff8c00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.setProperty('--particle-color', color);
    particle.style.left = '0';
    particle.style.bottom = '0';
    
    return {
      element: particle,
      startX,
      endX: endXVariation,
      endY: endYVariation,
      duration: Math.random() * 0.5 + 0.75,
      maxOpacity: Math.random() * 0.4 + 0.4
    };
  };

  const addParticles = () => {
    if (!particlesRef.current) return;
    
    for (let i = 0; i < 5; i++) {
      const particle = createParticle();
      particle.element.style.setProperty('--start-x', `${particle.startX}px`);
      particle.element.style.setProperty('--end-x', `${particle.endX}px`);
      particle.element.style.setProperty('--end-y', `${particle.endY}px`);
      particle.element.style.setProperty('--rise-duration', `${particle.duration}s`);
      particle.element.style.setProperty('--max-opacity', `${particle.maxOpacity}`);
      
      particlesRef.current.appendChild(particle.element);
      
      particle.element.addEventListener('animationend', () => {
        particle.element.remove();
      });
    }
  };

  const createBurstParticles = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colors = ['#ff6b08', '#ff4500', '#ffd700', '#ff8c00'];
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      
      const angle = (i * 30) * Math.PI / 180;
      const distance = 20 + Math.random() * 20;
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;
      
      particle.style.left = `${x + offsetX}px`;
      particle.style.top = `${y + offsetY}px`;
      particle.style.setProperty('--burst-color', colors[Math.floor(Math.random() * colors.length)]);
      
      buttonRef.current.appendChild(particle);
      
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    createBurstParticles(e);
    setTimeout(() => navigate('/coming-soon'), 500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="fire-button relative px-8 py-4 text-lg font-medium text-white bg-[#1a1a1a] border-2 border-[#ff6b08] rounded-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_#ff6b08] hover:-translate-y-0.5 active:translate-y-0.5"
      onMouseEnter={() => {
        intervalRef.current = window.setInterval(addParticles, 50);
      }}
      onMouseLeave={() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }}
      onClick={handleClick}
    >
      <span className="highlight text-[#ff6b08] font-bold [text-shadow:0_0_10px_#ff6b08,0_0_20px_#ff6b08,0_0_30px_#ff6b08]">
        Ignite
      </span>{' '}
      Your Flame
      <div className="glow absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,8,0.4),transparent_70%)] opacity-0 transition-opacity duration-300" />
      <div ref={particlesRef} className="particles absolute inset-0 overflow-hidden pointer-events-none" />
    </button>
  );
}