function clamp(value, min = 0, max = 1){
  return Math.min(Math.max(value, min), max);
}

function number(value, fallback = 0){
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function calculateRisk(strategy = {}){

let risk =
  strategy.risk !== undefined
    ? number(strategy.risk)
    : 0.3;

if(strategy.complexity) risk += 0.2;
if(strategy.costHigh) risk += 0.3;
if(strategy.timeLong) risk += 0.2;

return clamp(Number(risk.toFixed(4)));
}
