import { routeRequest } from "./router.js";
import { safeRun } from "./fallback.js";

export async function orchestrate(request){
const start = Date.now();

const decision = routeRequest(request);

const result = await safeRun(decision.provider,{
prompt: request.prompt,
mode: request.mode
});

return {
result: result.data,
provider: decision.provider.name,
latency: Date.now() - start,
estimatedCost: decision.estimatedCost
};
}