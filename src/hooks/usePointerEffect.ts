import { useEffect, useRef, RefObject } from 'react';
import { getPointerPosition, isInsideElement, PointerPosition } from '../utils/pointerUtils';

type PointerEffectOptions = {
  onPointerMove: (position: PointerPosition) => void;
  excludeElementId?: string;
  throttleMs?: number;
};

export function usePointerEffect(
  canvasRef: RefObject<HTMLCanvasElement>,
  { onPointerMove, excludeElementId, throttleMs = 16 }: PointerEffectOptions
) {
  const lastMoveTime = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const handleMove = (event: TouchEvent | MouseEvent | PointerEvent) => {
      event.preventDefault();
      const now = Date.now();
      if (now - lastMoveTime.current < throttleMs) return;

      const position = getPointerPosition(event);
      
      if (excludeElementId) {
        const excludeElement = document.getElementById(excludeElementId)?.getBoundingClientRect();
        if (excludeElement && isInsideElement(position, excludeElement)) return;
      }

      onPointerMove(position);
      lastMoveTime.current = now;
    };

    const canvas = canvasRef.current;

    // Add mouse event listener
    canvas.addEventListener('mousemove', handleMove);
    
    // Add touch event listener for mobile devices
    canvas.addEventListener('touchmove', handleMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
    };
  }, [canvasRef, onPointerMove, excludeElementId, throttleMs]);
}