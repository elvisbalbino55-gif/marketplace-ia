import { simulateEconomicImpact } from "./simulator.js";
import { calculateRisk } from "./riskModel.js";

export function economicValue(strategy){

const simulation = simulateEconomicImpact(strategy);
const risk = calculateRisk(strategy);

const valueScore =
(simulation.score * (1 - risk)).toFixed(2);

return {
simulation,
risk,
valueScore: parseFloat(valueScore)
};
}