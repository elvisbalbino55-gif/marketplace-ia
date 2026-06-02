function number(value, fallback = 0){
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function round(value){
  return Number(value.toFixed(2));
}

export function generateScenarios(strategy = {}){
  const revenue = number(strategy.revenue ?? strategy.expectedRevenue);
  const cost = number(strategy.cost ?? strategy.estimatedCost);
  const risk = number(strategy.risk, 0.3);

  return {
    optimistic: {
      revenue: round(revenue * 1.35),
      cost: round(cost * 0.95),
      profit: round(revenue * 1.35 - cost * 0.95),
      risk: Math.max(0, Number((risk * 0.75).toFixed(2)))
    },
    realistic: {
      revenue: round(revenue),
      cost: round(cost),
      profit: round(revenue - cost),
      risk: Number(risk.toFixed(2))
    },
    pessimistic: {
      revenue: round(revenue * 0.65),
      cost: round(cost * 1.15),
      profit: round(revenue * 0.65 - cost * 1.15),
      risk: Math.min(1, Number((risk * 1.4).toFixed(2)))
    }
  };
}
