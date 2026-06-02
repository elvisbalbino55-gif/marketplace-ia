const usageStats = [];

export function registerUsage(data){

usageStats.push(data);

const growthFactor = usageStats.length * 0.01;

return {
totalUsage: usageStats.length,
networkEffectMultiplier: 1 + growthFactor
};
}