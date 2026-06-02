export function calculateBilling(
  cost
){

  const revenue =
    1.5;

  const profit =
    revenue - cost;

  const margin =
    Math.round(
      (
        profit / revenue
      ) * 100
    );

  return {

    revenue,

    cost,

    profit,

    margin

  };

}
