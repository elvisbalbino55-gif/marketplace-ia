export function exchange(buyer, seller, strategy){

return {
transactionId: Math.random().toString(36).substring(2),
buyer,
seller,
asset: strategy,
status: "completed",
value: strategy.valueScore * 100
};
}