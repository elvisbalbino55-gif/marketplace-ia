import { db } from '../coreEngine/db.js';

export function analytics(){

  let revenue = 0;
  let cost = 0;
  let profit = 0;

  db.logs.forEach(log=>{

    revenue += log.revenue;
    cost += log.cost;
    profit += log.profit;

  });

  return {

    totalRequests:db.logs.length,

    totalRevenue:revenue,

    totalCost:cost,

    totalProfit:profit,

    activeTenants:db.tenants.length

  };

}

