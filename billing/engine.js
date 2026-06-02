
const ledger = [];

export function registerBilling({ tenantId, usage }) {
  const cost = usage.cost || 0;
  const revenue = cost * 3;
  const margin = revenue - cost;

  ledger.push({
    tenantId,
    cost,
    revenue,
    margin,
    timestamp: new Date()
  });

  return { cost, revenue, margin };
}

export function getTenantStats(tenantId) {
  const data = ledger.filter(x => x.tenantId === tenantId);

  return {
    tenantId,
    requests: data.length,
    cost: data.reduce((a,b)=>a+b.cost,0),
    revenue: data.reduce((a,b)=>a+b.revenue,0),
    margin: data.reduce((a,b)=>a+b.margin,0)
  };
}

export function getSystemStats() {
  return {
    requests: ledger.length,
    cost: ledger.reduce((a,b)=>a+b.cost,0),
    revenue: ledger.reduce((a,b)=>a+b.revenue,0),
    margin: ledger.reduce((a,b)=>a+b.margin,0)
  };
}

export function getLeaderboard() {
  const map = {};

  for(const l of ledger){
    if(!map[l.tenantId]){
      map[l.tenantId] = { tenantId:l.tenantId, cost:0, revenue:0, margin:0 };
    }

    map[l.tenantId].cost += l.cost;
    map[l.tenantId].revenue += l.revenue;
    map[l.tenantId].margin += l.margin;
  }

  return Object.values(map).sort((a,b)=>b.margin-a.margin);
}
