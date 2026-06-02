export function createTenantProfile(id){

return {
id,
industry: "unknown",
region: "BR",
language: "pt-BR",
riskTolerance: 0.5,
autonomyLevel: 1,
budgetLimit: 1000,
goals: ["growth"]
};
}