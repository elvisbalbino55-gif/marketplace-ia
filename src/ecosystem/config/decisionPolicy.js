export function applyPolicy(decision, tenant){

if(tenant.autonomyLevel === 0){
return { status: "needs_human_approval", decision };
}

if(decision.risk > tenant.riskTolerance){
return { status: "blocked_by_policy", decision };
}

return { status: "approved", decision };
}