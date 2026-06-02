export const PLANS = {
free: {
limit: 100,
price: 0
},
pro: {
limit: 10000,
price: 29
},
enterprise: {
limit: 100000,
price: 199
}
};

export function getPlan(name){
return PLANS[name] || PLANS.free;
}