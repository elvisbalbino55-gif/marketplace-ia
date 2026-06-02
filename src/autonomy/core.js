import { balance } from "./balanceEngine.js";
import { defineBehavior } from "./globalBehavior.js";
import { reorganize } from "./reorganizationLoop.js";

export function autonomyCycle(state, strategies){

const behavior = defineBehavior(state);
const balanced = balance(state);
const evolved = reorganize(strategies);

return {
behavior,
balanced,
evolved,
status: "ecosystem_self_adjusted"
};
}