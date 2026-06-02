export function scoreResponse({cost, quality, latency}){

// pesos simples iniciais (vai evoluir depois)
const costScore = 1 - cost;
const qualityScore = quality;
const speedScore = 1 / (latency + 1);

return (costScore * 0.3) + (qualityScore * 0.5) + (speedScore * 0.2);
}