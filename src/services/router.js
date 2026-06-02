export function selectProvider(prompt){

  const p = prompt.toLowerCase();

  // tarefas pesadas ? OpenAI (mais caro, mais forte)
  if(
    p.includes("código") ||
    p.includes("api") ||
    p.includes("backend") ||
    p.includes("arquitetura")
  ){
    return "openai";
  }

  // tarefas de pesquisa ? Claude (equilibrado)
  if(
    p.includes("pesquisa") ||
    p.includes("mercado") ||
    p.includes("análise")
  ){
    return "claude";
  }

  // padrão barato ? Gemini
  return "gemini";
}

// =========================
// COST OPTIMIZER (NOVA CAMADA)
// =========================
export function getCostModel(provider){

  const map = {
    openai: { cost: 1.2, revenue: 3.0, speed: "fast", quality: "high" },
    claude: { cost: 0.8, revenue: 2.2, speed: "medium", quality: "high" },
    gemini: { cost: 0.4, revenue: 1.5, speed: "fast", quality: "medium" }
  };

  return map[provider] || map.gemini;
}
