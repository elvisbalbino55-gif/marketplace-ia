export function balance(systemState){

const overload = systemState.cost > 0.8;
const instability = systemState.risk > 0.7;

return {
adjustmentNeeded: overload || instability,
actions: overload ? ["reduce_cost_models"] : ["rebalance_traffic"]
};
}