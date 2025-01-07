import React, { useEffect, useRef } from 'react';
import { getColor } from '../utils/effectUtils';

interface Point {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  speed: number;
  angle: number;
  colorOffset: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    }

    function createPoint() {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const maxLife = 3 + Math.random() * 2;
      
      return {
        x,
        y,
        size: 0,
        life: 0,
        maxLife,
        speed: 0.05 + Math.random() * 0.05,
        angle: Math.random() * Math.PI * 2,
        colorOffset: Math.random()
      };
    }

    function updatePoints() {
      // Add new points randomly
      if (Math.random() < 0.05 && pointsRef.current.length < 15) {
        pointsRef.current.push(createPoint());
      }

      // Update existing points
      for (let i = pointsRef.current.length - 1; i >= 0; i--) {
        const point = pointsRef.current[i];
        point.life += 0.01;

        // Grow and shrink based on life cycle
        const lifecycle = point.life / point.maxLife;
        if (lifecycle < 0.3) {
          point.size = (lifecycle / 0.3) * 100;
        } else if (lifecycle > 0.7) {
          point.size = ((1 - lifecycle) / 0.3) * 100;
        } else {
          point.size = 100;
        }

        // Remove dead points
        if (point.life >= point.maxLife) {
          pointsRef.current.splice(i, 1);
          continue;
        }

        // Gentle movement
        point.x += Math.cos(point.angle) * point.speed;
        point.y += Math.sin(point.angle) * point.speed;
        point.angle += (Math.random() - 0.5) * 0.02;
      }
    }

    function drawPoints() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      pointsRef.current.forEach(point => {
        const color = getColor(point.colorOffset + timeRef.current * 0.0002);
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        );

        const alpha = Math.sin((point.life / point.maxLife) * Math.PI) * 0.3;
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      timeRef.current += 1;
      updatePoints();
      drawPoints();
      requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full mix-blend-screen pointer-events-none"
      style={{ filter: 'blur(8px)', zIndex: 0 }}
    />
  );
}