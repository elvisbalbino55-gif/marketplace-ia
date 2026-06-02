import { getUsage } from "../services/usageTracker.js";

export function dashboard(req,res){

const usage = getUsage(req.tenant.id);

return res.json({
tenant:req.tenant,
usage:usage || {
requests:0,
cost:0,
latency:0
}
});
}