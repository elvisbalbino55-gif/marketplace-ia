export const analytics = {

  totalRequests:0,

  totalRevenue:0,

  totalCost:0,

  totalProfit:0,

  providers:{}

};

export function trackRequest(provider,billing){

  analytics.totalRequests++;

  analytics.totalRevenue +=
    billing.revenue;

  analytics.totalCost +=
    billing.cost;

  analytics.totalProfit +=
    billing.profit;

  if(
    !analytics.providers[provider]
  ){

    analytics.providers[provider] = {

      requests:0,

      revenue:0

    };

  }

  analytics.providers[
    provider
  ].requests++;

  analytics.providers[
    provider
  ].revenue +=
    billing.revenue;

}
