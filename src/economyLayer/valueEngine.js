export function calculateValue(strategy){

const value =
(strategy.successRate * 0.5) +
(strategy.impact * 0.3) +
((1 - strategy.risk) * 0.2);

return {
...strategy,
valueScore: parseFloat(value.toFixed(2))
};
}