export function observeSystem(metrics){

return {
latencyAnomaly: metrics.latency > 2000,
costSpike: metrics.cost > 0.02,
errorRate: metrics.errors > 0.1,
qualityDrop: metrics.quality < 0.6
};
}