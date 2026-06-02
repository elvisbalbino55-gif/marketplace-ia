import { engine as autonomyCore } from "../autonomy/core.js";
import { executiveDecision } from "../core/executive/decisionEngine.js";
import { engine as platformEngine } from "../platform/engine.js";
import { realExecution } from "../execution/realExecution.js";

export async function core(payload){

  const platform = await platformEngine(payload);

  const autonomy = await autonomyCore(payload);

  const executive = executiveDecision({
    ...payload,
    tenant: payload.tenant || payload.tenantId
  });

  const execution = await realExecution({
    selectedStrategy: executive.best
  });

  return {
    platform,
    autonomy,
    executive,
    execution,
    timestamp: new Date().toISOString()
  };
}

