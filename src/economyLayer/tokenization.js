export function tokenizeIntelligence(strategy){

return {
tokenId: "intel_" + Math.random().toString(36).substring(2),
type: "strategy_asset",
value: strategy.valueScore,
usageRights: "licensed",
marketValue: strategy.valueScore * 1000
};
}