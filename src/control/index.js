import { requiresApproval } from "./approvalEngine.js";
import { approvalWorkflow } from "./workflow.js";
import { audit } from "./auditLog.js";
import { riskGate } from "./riskGate.js";

export function controlLayer(action){

const riskCheck = riskGate(action);

if(riskCheck.blocked){
audit({ action, status: "blocked", reason: riskCheck.reason });
return riskCheck;
}

if(requiresApproval(action)){
audit({ action, status: "pending" });
return approvalWorkflow(action);
}

audit({ action, status: "auto_executed" });
return { status: "executed", action };
}