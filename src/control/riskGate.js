export function riskGate(action){

if(action.risk > 0.8){
return { blocked: true, reason: "high risk detected" };
}

if(action.cost > 5000){
return { blocked: true, reason: "high cost operation" };
}

return { blocked: false };
}