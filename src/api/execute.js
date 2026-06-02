import { orchestrate } from "../orchestrator/index.js";
import { observeExecution } from "../orchestrator/observability.js";

export async function execute(req,res){

const result = await orchestrate(req.body);

const usage = observeExecution(
req.tenant.id,
result
);

return res.json({
...result,
usage
});
}