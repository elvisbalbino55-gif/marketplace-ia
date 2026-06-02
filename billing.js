const plans = {
  free: { multiplier: 2 },
  pro: { multiplier: 3 },
  enterprise: { multiplier: 5 }
};

export function calculateRevenue(cost, plan = "free") {
  return cost * (plans[plan]?.multiplier || 2);
}