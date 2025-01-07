import React, { useEffect, useRef } from 'react';
import { usePointerEffect } from '../hooks/usePointerEffect';
import { PointerPosition } from '../utils/pointerUtils';
import { getWelcomeColor } from '../utils/effectUtils';

export function WelcomeMouseEffect() {
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<any[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const glowCanvas = glowCanvasRef.current;
    if (!glowCanvas) return;

    const glowCtx = glowCanvas.getContext('2d');
    if (!glowCtx) return;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      glowCanvas.width = window.innerWidth * dpr;
      glowCanvas.height = window.innerHeight * dpr;
      glowCanvas.style.width = `${window.innerWidth}px`;
      glowCanvas.style.height = `${window.innerHeight}px`;
      glowCtx.scale(dpr, dpr);
    }

    function noise(x: number, y: number) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      return (Math.sin(X * 0.05 + Y * 0.1 + timeRef.current * 0.001) + 1) * 0.5;
    }

    function animate() {
      glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
      timeRef.current += 0.3;

      glowCtx.globalCompositeOperation = 'screen';

      for (let i = pointsRef.current.length - 1; i >= 0; i--) {
        const point = pointsRef.current[i];
        point.prevX = point.x;
        point.prevY = point.y;

        const noiseX = noise(point.x * 0.003, timeRef.current * 0.003) * 2 - 1;
        const noiseY = noise(point.y * 0.003, timeRef.current * 0.003) * 2 - 1;
        
        point.angle += noiseX * 0.01;
        point.speed *= 0.997;
        point.x += Math.cos(point.angle) * point.speed + noiseX * 0.1;
        point.y += Math.sin(point.angle) * point.speed + noiseY * 0.1;
        point.life *= 0.995;
        
        if (point.life < 0.01) {
          pointsRef.current.splice(i, 1);
          continue;
        }

        const size = 150 * point.life;
        const alpha = point.life * point.opacity;
        const gradient = glowCtx.createLinearGradient(
          point.prevX, point.prevY,
          point.x, point.y
        );

        const startColor = getWelcomeColor(point.colorOffset + timeRef.current * 0.0005);
        const midColor1 = getWelcomeColor(point.colorOffset + 0.33 + timeRef.current * 0.0005);
        const midColor2 = getWelcomeColor(point.colorOffset + 0.66 + timeRef.current * 0.0005);

        gradient.addColorStop(0, `rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${midColor1.r}, ${midColor1.g}, ${midColor1.b}, ${alpha * 0.7})`);
        gradient.addColorStop(0.6, `rgba(${midColor2.r}, ${midColor2.g}, ${midColor2.b}, ${alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        glowCtx.beginPath();
        glowCtx.moveTo(point.prevX, point.prevY);
        
        const dx = point.x - point.prevX;
        const dy = point.y - point.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const cx1 = point.prevX + dx * 0.3 + noiseX * dist * 0.15;
        const cy1 = point.prevY + dy * 0.3 + noiseY * dist * 0.15;
        const cx2 = point.prevX + dx * 0.7 + noiseX * dist * 0.15;
        const cy2 = point.prevY + dy * 0.7 + noiseY * dist * 0.15;

        glowCtx.bezierCurveTo(cx1, cy1, cx2, cy2, point.x, point.y);
        glowCtx.lineWidth = size * 0.8;
        glowCtx.strokeStyle = gradient;
        glowCtx.lineCap = 'round';
        glowCtx.lineJoin = 'round';
        glowCtx.stroke();
      }

      requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handlePointerMove = (position: PointerPosition) => {
    if (pointsRef.current.length < 200) {
      const angle = Math.random() * Math.PI * 2;
      pointsRef.current.push({
        x: position.x,
        y: position.y,
        prevX: position.x,
        prevY: position.y,
        angle,
        speed: 0.15 + Math.random() * 0.25,
        life: 1.0,
        opacity: 0.8 + Math.random() * 0.2,
        colorOffset: Math.random()
      });
    }
  };

  usePointerEffect(glowCanvasRef, {
    onPointerMove: handlePointerMove,
    excludeElementId: 'auth-content',
    throttleMs: 16
  });

  return (
    <canvas
      ref={glowCanvasRef}
      className="fixed top-0 left-0 w-full h-full mix-blend-screen"
      style={{ filter: 'blur(8px)', zIndex: 0 }}
    />
  );
}