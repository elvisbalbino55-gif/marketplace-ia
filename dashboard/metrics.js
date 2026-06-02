
export function buildMetrics(logs){
  const total = logs.length;

  const cost = logs.reduce((a,b)=>a+(b.usage?.cost||0),0);

  return {
    requests: total,
    totalCost: cost,
    avgCost: total ? cost/total : 0
  };
}
