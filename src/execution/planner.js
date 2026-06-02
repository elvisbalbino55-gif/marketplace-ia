const CONNECTOR_RISK = {
  internal:0.05,
  crm:0.18,
  email:0.22,
  whatsapp:0.24,
  stripe:0.42,
  shopify:0.38,
  ads:0.55,
  webhook:0.35
};

const CONNECTOR_COST = {
  internal:0,
  crm:40,
  email:25,
  whatsapp:60,
  stripe:120,
  shopify:180,
  ads:600,
  webhook:75
};

function round(value){
  return Number(value.toFixed(4));
}

function governanceMeta(connector, strategy = {}){
  const strategyRisk = Number(strategy.risk || 0);
  const connectorRisk = CONNECTOR_RISK[connector] ?? 0.3;
  const connectorCost = CONNECTOR_COST[connector] ?? 50;

  return {
    risk:round(Math.min(1, connectorRisk + strategyRisk * 0.5)),
    cost:connectorCost,
    requiresApproval:
      connectorRisk + strategyRisk * 0.5 > 0.5 ||
      connectorCost > 1000
  };
}

function baseStep(id, connector, type, payload = {}, strategy = {}){
  const governance = governanceMeta(connector, strategy);

  return {
    id,
    connector,
    type,
    payload,
    governance,
    status:"planned"
  };
}

function strategySteps(strategy = {}){
  const name = strategy.name || "strategy";

  if(strategy.connector === "whatsapp"){
    return [
      baseStep("step-1", "whatsapp", "reactivate_leads", {
        messageTemplate:"revenue_reactivation",
        strategy:name
      }, strategy),
      baseStep("step-2", "crm", "update_lead_stage", {
        stage:"reactivation_started",
        strategy:name
      }, strategy),
      baseStep("step-3", "stripe", "prepare_offer", {
        offerType:"winback",
        strategy:name
      }, strategy),
      baseStep("step-4", "internal", "monitor_roi", {
        metric:"expectedProfit",
        target:strategy.analysis?.simulation?.expectedProfit || strategy.profit || 0
      }, strategy)
    ];
  }

  if(strategy.connector === "crm"){
    return [
      baseStep("step-1", "crm", "update_lead_pipeline", {
        stage:"growth_sequence",
        strategy:name
      }, strategy),
      baseStep("step-2", "email", "send_nurture_sequence", {
        segment:"qualified_leads",
        strategy:name
      }, strategy),
      baseStep("step-3", "stripe", "prepare_offer", {
        offerType:"conversion",
        strategy:name
      }, strategy),
      baseStep("step-4", "internal", "monitor_roi", {
        metric:"expectedProfit",
        target:strategy.analysis?.simulation?.expectedProfit || strategy.profit || 0
      }, strategy)
    ];
  }

  if(strategy.connector === "ads"){
    return [
      baseStep("step-1", "ads", "optimize_campaign", {
        objective:"revenue_growth",
        strategy:name
      }, strategy),
      baseStep("step-2", "crm", "sync_campaign_leads", {
        source:"ads",
        strategy:name
      }, strategy),
      baseStep("step-3", "internal", "risk_control", {
        maxRisk:strategy.risk,
        strategy:name
      }, strategy),
      baseStep("step-4", "internal", "monitor_roi", {
        metric:"expectedProfit",
        target:strategy.analysis?.simulation?.expectedProfit || strategy.profit || 0
      }, strategy)
    ];
  }

  return [
    baseStep("step-1", strategy.connector || "internal", strategy.action || "execute_strategy", {
      strategy:name
    }, strategy),
    baseStep("step-2", "internal", "monitor_roi", {
      metric:"expectedProfit",
      target:strategy.analysis?.simulation?.expectedProfit || strategy.profit || 0
    }, strategy)
  ];
}

export function buildExecutionPlan(strategy = {}){
  const steps = strategySteps(strategy);

  return {
    strategyId:strategy.id || null,
    strategyName:strategy.name || null,
    objective:"revenue_execution",
    mode:"connector_orchestration",
    steps,
    createdAt:new Date().toISOString()
  };
}
