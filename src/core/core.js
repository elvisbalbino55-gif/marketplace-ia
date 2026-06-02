import { autopilot } from "../autopilot/index.js";
import { runCycle } from "../selfOperating/loop.js";
import { ecosystemLoop } from "../ecosystem/engine.js";
import { platformEngine } from "../platform/engine.js";
import { realExecution } from "../execution/realExecution.js";
import { saveMemory } from "../memory/index.js";
import { calculateBusinessMetrics } from "../economy/businessMetrics.js";

export async function core(payload){

  const platform = await platformEngine(payload);

  const autopilotResult = await autopilot(payload);

  const executive = policyRouter({
    ...payload,
    tenant: payload.tenant || payload.tenantId
  });

  const execution = await realExecution({
    selectedStrategy: executive.best
  });

  const selfOperating = await runCycle({
    prompt: payload.prompt,
    platform,
    autopilotResult
  });

  const ecosystem = await ecosystemLoop({
    latency:200,
    errorRate:0.01,
    cost:1
  });

  const memorySize = saveMemory({
    prompt: payload.prompt,
    provider: payload.provider,
    executive: executive.best
  });

  return {
    platform,
    autopilot: autopilotResult,
    executive,
    execution,
    selfOperating,
    ecosystem,
    memory:{ size: memorySize },
    timestamp: new Date().toISOString()
  };
}




