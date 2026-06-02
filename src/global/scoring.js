import { detectPatterns } from "./patterns.js";

export function globalScore(aggregated){

const patterns = detectPatterns(aggregated);

return patterns.map(p => ({
segment: p.segment,
recommendedProvider: p.bestProvider,
confidence: 0.7 + Math.random()*0.3,
strategy: p.bestStrategy
}));
}