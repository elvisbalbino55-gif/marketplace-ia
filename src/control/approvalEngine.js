export function requiresApproval(action){

if(action.risk > 0.5) return true;
if(action.cost > 1000) return true;

return false;
}