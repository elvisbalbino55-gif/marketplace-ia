import { realReward } from "./rewardReal.js";

const memory = new Map();

export function applyLearning(tenantId, execution){

const reward = realReward(execution.feedback);

const current = memory.get(tenantId) || {
performance: {},
history: []
};

current.history.push({
execution,
reward
});

current.performance[execution.type] =
(current.performance[execution.type] || 0) + reward;

memory.set(tenantId, current);

return current;
}

export function getLearning(tenantId){
return memory.get(tenantId) || null;
}