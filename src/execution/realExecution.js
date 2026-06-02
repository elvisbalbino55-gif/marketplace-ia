import { executeConnector }
from "./connectors.js";

import { buildExecutionPlan }
from "./planner.js";

import { saveExecutionTrace }
from "../memory/index.js";

import { controlLayer }
from "../control/index.js";

export async function realExecution(plan){

  const strategy =
    plan?.selectedStrategy || plan;

  if(!strategy){
    return {
      status:"skipped",
      reason:"no_strategy_selected"
    };
  }

  const executionPlan =
    buildExecutionPlan(strategy);

  const strategyRef = {
    id:strategy.id,
    name:strategy.name,
    score:strategy.score,
    risk:strategy.risk,
    confidence:strategy.confidence,
    expectedProfit:
      strategy.analysis?.simulation?.expectedProfit ||
      strategy.profit ||
      0
  };

  const results = [];

  for(const step of executionPlan.steps){
    const guardedAction = {
      connector:step.connector,
      type:step.type,
      payload:step.payload,
      strategy:strategyRef,
      risk:step.governance?.risk || 0,
      cost:step.governance?.cost || 0
    };

    const control =
      controlLayer(guardedAction);

    if(control.blocked || control.status === "pending_approval"){
      results.push({
        ...step,
        status:control.status || "blocked",
        governance:{
          ...step.governance,
          decision:control
        },
        result:null
      });

      continue;
    }

    const result =
      await executeConnector(guardedAction);

    results.push({
      ...step,
      status:result.status,
      governance:{
        ...step.governance,
        decision:control
      },
      result
    });
  }

  const executionTrace = {
    type:"execution_trace",
    selectedStrategyId:strategy.id,
    selectedStrategy:strategy.name,
    status:"planned_and_dispatched",
    steps:results.map((step)=>({
      id:step.id,
      connector:step.connector,
      type:step.type,
      status:step.status,
      governance:step.governance
    }))
  };

  saveExecutionTrace(executionTrace);

  const summary = {
    totalSteps:results.length,
    completedSteps:
      results.filter((step)=>[
        "internal_executed",
        "crm_updated",
        "email_sent",
        "webhook_triggered",
        "whatsapp_ready",
        "stripe_ready",
        "shopify_ready",
        "ads_ready"
      ].includes(step.status)).length,
    blockedSteps:
      results.filter((step)=>[
        "connector_not_supported",
        "blocked"
      ].includes(step.status)).length,
    pendingApprovalSteps:
      results.filter((step)=>step.status === "pending_approval").length,
    connectors:
      [...new Set(results.map((step)=>step.connector))]
  };

  return {
    status:"planned_and_dispatched",
    selectedStrategyId:strategy.id,
    selectedStrategy:strategy.name,
    plan:executionPlan,
    results,
    summary,
    trace:executionTrace
  };
}
