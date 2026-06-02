import { diagnostic } from "./diagnostic.js";
import { decompose } from "./decomposer.js";
import { generateStrategies } from "./strategyEngine.js";
import { simulate } from "./simulator.js";
import { synthesize } from "./synthesizer.js";

export async function autopilot(input){

const diag = diagnostic(input);
const problem = decompose(diag);
const strategies = await generateStrategies(problem);
const simulation = simulate(strategies);
const final = synthesize(strategies, simulation);

return {
diagnostic: diag,
problem,
strategies,
simulation,
final
};
}