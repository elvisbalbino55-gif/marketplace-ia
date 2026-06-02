import { evolve } from "./evolutionEngine.js";

export function reorganize(strategies){

return strategies.map(s => evolve(s));
}