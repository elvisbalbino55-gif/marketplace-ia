export function governance(action){

if(action.risk > 0.7){
return { approved: false, reason: "high risk blocked" };
}

if(action.cost > 1000){
return { approved: false, reason: "cost limit exceeded" };
}

return { approved: true };
}