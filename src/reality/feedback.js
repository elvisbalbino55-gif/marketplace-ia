export function collectFeedback(execution, feedback){

return {
...execution,
feedback: {
success: feedback.success,
revenueImpact: feedback.revenueImpact,
costImpact: feedback.costImpact
}
};
}