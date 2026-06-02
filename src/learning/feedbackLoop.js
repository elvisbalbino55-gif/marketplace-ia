import { saveMemory } from "./memory.js";
import { calculateReward } from "./rewardSystem.js";
import { adjustWeights } from "./adaptiveScoring.js";

export function feedbackLoop(tenantId, results){

for(const r of results){
r.reward = calculateReward(r);
}

adjustWeights(results);

saveMemory(tenantId,{
timestamp: Date.now(),
results
});

return {
status: "learned",
results
};
}