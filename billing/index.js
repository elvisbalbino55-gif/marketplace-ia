
export function calculateBilling(usage){
  return {
    cost: usage.cost,
    revenue: usage.cost * 3,
    margin: usage.cost * 2
  };
}
