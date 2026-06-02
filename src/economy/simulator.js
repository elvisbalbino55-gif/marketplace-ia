import { generateScenarios } from "./scenarios.js";

export function simulateEconomicImpact(strategy){

const scenarios = generateScenarios(strategy);

const expectedRevenue = (
(scenarios.optimistic.revenue * 0.25) +
(scenarios.realistic.revenue * 0.55) +
(scenarios.pessimistic.revenue * 0.20)
);

const expectedCost = (
(scenarios.optimistic.cost * 0.25) +
(scenarios.realistic.cost * 0.55) +
(scenarios.pessimistic.cost * 0.20)
);

const expectedProfit =
  expectedRevenue - expectedCost;

const score =
  expectedProfit;

return {
scenarios,
expectedRevenue: Number(expectedRevenue.toFixed(2)),
expectedCost: Number(expectedCost.toFixed(2)),
expectedProfit: Number(expectedProfit.toFixed(2)),
score: Number(score.toFixed(2))
};
}
