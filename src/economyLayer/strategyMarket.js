const strategies = [];

export function publishStrategy(strategy){

strategies.push({
...strategy,
id: Math.random().toString(36).substring(2),
rating: Math.random()
});

return strategies[strategies.length - 1];
}

export function getStrategies(){
return strategies;
}