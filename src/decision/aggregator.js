import { scoreResponse } from "./scoring.js";

export function aggregate(results){

let best = null;
let bestScore = -Infinity;

for(const r of results){
const score = scoreResponse(r);

if(score > bestScore){
bestScore = score;
best = r;
}
}

return {
best,
all: results,
score: bestScore
};
}