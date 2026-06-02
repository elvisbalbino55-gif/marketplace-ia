import { buildAction } from "./actionBuilder.js";
import { executeAction } from "./engine.js";
import { verifyExecution } from "./verifier.js";

export async function executionLayer(decision){

const actionPlan = buildAction(decision);
const results = await executeAction(actionPlan);
const verified = verifyExecution(results);

return {
actionPlan,
results: verified
};
}