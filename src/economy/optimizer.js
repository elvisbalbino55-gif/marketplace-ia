export function optimizeCostDecision(providers){

  const ranked = providers
    .map(p => ({
      name: p.name,
      score: (p.revenue / (p.cost + 0.0001)) * (1 - (p.risk || 0))
    }))
    .sort((a,b)=>b.score-a.score);

  return {
    best: ranked[0],
    ranking: ranked
  };
}
