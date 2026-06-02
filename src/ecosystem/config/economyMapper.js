export function mapEconomy(value, region){

const rates = {
BR: 1,
US: 5,
EU: 5.5
};

return value * (rates[region] || 1);
}