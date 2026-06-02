import { economicValue } from "../economy/valueEngine.js";

export function decide(observation){

const strategies = [
{ type: "growth" },
{ type: "optimization" },
{ type: "retention" }
];

let best = null;
let bestScore = -Infinity;

for(const s of strategies){

const evals = economicValue(s);

const score = evals.valueScore;

if(score > bestScore){
bestScore = score;
best = s;
}
}

return best;
}