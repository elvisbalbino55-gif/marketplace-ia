import { calculateRisk } from "../economy/riskModel.js";
import { simulate } from "../economy/simulator.js";
import { optimize } from "../economy/optimizer.js";

function scoreStrategy(strategy){

  const risk = calculateRisk(strategy);
  const simulation = simulate(strategy);
  const optimized = optimize(strategy);

  const revenue = simulation.expectedRevenue || 1;
  const cost = simulation.expectedCost || 1;

  const profit = revenue - cost;

  const riskPenalty = risk.score * 0.5;

  const efficiency = optimized.efficiency || 1;

  const score = (profit * efficiency) - riskPenalty;

  return {
    strategy,
    revenue,
    cost,
    profit,
    risk: risk.score,
    efficiency,
    score
  };
}

export function executiveDecision(payload){

  const strategies = payload.strategies || {
    openai: {type:"openai"},
    gemini: {type:"gemini"},
    claude: {type:"claude"}
  };

  const evaluated = Object.entries(strategies).map(
    ([key, strategy]) => scoreStrategy(strategy)
  );

  evaluated.sort((a,b)=>b.score-a.score);

  return {
    best: evaluated[0],
    ranked: evaluated,
    timestamp: new Date().toISOString()
  };
}
