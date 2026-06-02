import { trackUsage } from "../services/usageTracker.js";
import { logRequest } from "./logger.js";

export function observeExecution(tenantId, result, meta){
logRequest({
tenantId,
provider: result.provider,
cost: result.estimatedCost,
latency: result.latency
});

return trackUsage(tenantId,{
cost: result.estimatedCost,
latency: result.latency
});
}