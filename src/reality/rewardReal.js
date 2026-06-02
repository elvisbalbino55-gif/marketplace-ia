export function realReward(feedback){

if(!feedback) return 0;

let score = 0;

if(feedback.success) score += 0.5;
if(feedback.revenueImpact > 0) score += 0.3;
if(feedback.costImpact < 0) score += 0.2;

return score;
}