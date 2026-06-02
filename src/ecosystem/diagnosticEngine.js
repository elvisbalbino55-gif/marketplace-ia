export async function diagnose(issue){

const diagnosis = {

latencyAnomaly: "modelo sobrecarregado",
costSpike: "uso excessivo de IA cara",
errorRate: "falha de fallback entre modelos",
qualityDrop: "modelo subótimo selecionado"
};

return diagnosis[issue] || "unknown issue";
}