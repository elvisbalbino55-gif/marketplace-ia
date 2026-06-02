export function economicModel(decision){

const impact = Math.random();
const cost = Math.random() * 0.5;
const risk = Math.random() * 0.4;

return {
impact,
cost,
risk,
score: impact - cost - risk
};
}