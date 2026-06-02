export function observeSystem(state){

return {
anomalies: state.healthScore < 0.5,
opportunities: state.opportunityScore > 0.7,
risk: state.riskLevel > 0.6
};
}