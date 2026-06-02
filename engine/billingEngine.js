export function calculateBilling(config){

  const revenue =
    config.price;

  const cost =
    config.cost;

  const profit =
    revenue - cost;

  const margin =
    (
      profit / revenue
    ) * 100;

  return {

    revenue,

    cost,

    profit,

    margin:
      margin.toFixed(2)

  };

}
