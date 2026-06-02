export function calculateReward(result){

// simulação inicial (depois vira real feedback do usuário)
let reward = 0;

if(result.latency < 2000) reward += 0.3;
if(result.cost < 0.01) reward += 0.3;
if(result.quality > 0.7) reward += 0.4;

return reward;
}