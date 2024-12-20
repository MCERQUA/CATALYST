export function getColor(offset: number) {
  const phase = (offset % 1) * Math.PI * 2;
  return {
    r: Math.sin(phase) * 20 + 147,
    g: Math.sin(phase + 2) * 20 + 51,
    b: Math.sin(phase + 4) * 20 + 234
  };
}