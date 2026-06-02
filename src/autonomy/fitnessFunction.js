export function fitness(strategy){

return (
strategy.revenue * 0.5 +
strategy.success * 0.3 -
strategy.cost * 0.2
);
}