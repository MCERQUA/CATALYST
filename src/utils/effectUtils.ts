export function getColor(offset: number) {
  const phase = (offset % 1) * Math.PI * 2;
  return {
    r: Math.sin(phase) * 20 + 147,
    g: Math.sin(phase + 2) * 20 + 51,
    b: Math.sin(phase + 4) * 20 + 234
  };
}

export function getWelcomeColor(offset: number) {
  const phase = (offset % 1) * Math.PI * 2;
  return {
    r: 255,                                    // Full red component
    g: Math.floor(140 + Math.sin(phase) * 50), // Orange to yellow variation
    b: Math.floor(Math.sin(phase) * 8)         // Minimal blue for warmth
  };
}