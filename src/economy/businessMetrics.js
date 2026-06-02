export function calculateBusinessMetrics(history){

  const revenue =
    history.reduce(
      (a,b)=>a+Number(b.revenue||0),
      0
    );

  const cost =
    history.reduce(
      (a,b)=>a+Number(b.cost||0),
      0
    );

  const profit =
    revenue - cost;

  const margin =
    revenue > 0
      ? Number(
          ((profit/revenue)*100)
          .toFixed(2)
        )
      : 0;

  return {
    revenue,
    cost,
    profit,
    margin
  };
}
