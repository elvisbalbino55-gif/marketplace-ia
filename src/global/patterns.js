export function detectPatterns(aggregated){

const patterns = [];

for(const key in aggregated){
const items = aggregated[key];

patterns.push({
segment: key,
avgImpact: Math.random(),
bestStrategy: "strategy_" + Math.floor(Math.random()*3),
bestProvider: ["openai","claude","gemini"][Math.floor(Math.random()*3)]
});
}

return patterns;
}