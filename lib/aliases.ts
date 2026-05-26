const first = ["Quiet", "Blue", "Amber", "Olive", "Soft", "Velvet", "Neon", "Warm", "Silent", "Glass", "Copper", "Slow", "Midnight", "Paper", "Golden", "Lucky", "Low", "Small"];
const second = ["Tiger", "Vinyl", "Signal", "Moon", "Static", "Echo", "Sparrow", "Orbit", "Radio", "Fox", "Room", "Comet", "Finch", "Lantern", "Frequency", "Tide", "Thunder"];

export function generateAlias(seed = Date.now()) {
  const a = first[seed % first.length];
  const b = second[Math.floor(seed / first.length) % second.length];
  return `${a} ${b}`;
}
