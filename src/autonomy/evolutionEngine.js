const population = [];

export function evolve(entity){

const mutated = {
...entity,
mutation: Math.random(),
fitness: Math.random()
};

population.push(mutated);

return mutated;
}

export function getPopulation(){
return population;
}