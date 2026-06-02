import { getStrategies } from "./strategyMarket.js";

export function rankStrategies(){

const strategies = getStrategies();

return strategies.map(s => ({
id: s.id,
score: (Math.random() * 0.5 + 0.5),
successRate: Math.random(),
impact: Math.random()
})).sort((a,b) => b.score - a.score);
}