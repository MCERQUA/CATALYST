// Utility functions for pointer and touch event handling
export type PointerPosition = {
  x: number;
  y: number;
};

export function getPointerPosition(event: TouchEvent | MouseEvent | PointerEvent): PointerPosition {
  if ('touches' in event) {
    const touch = event.touches[0];
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}

export function isInsideElement(position: PointerPosition, element: DOMRect): boolean {
  return (
    position.x >= element.left &&
    position.x <= element.right &&
    position.y >= element.top &&
    position.y <= element.bottom
  );
}

export function supportsPointerEvents(): boolean {
  return window.PointerEvent !== undefined;
}