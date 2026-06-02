export async function callProvider(provider, prompt) {
  const costs = {
    gemini: 0.004,
    anthropic: 0.009,
    openai: 0.015
  };

  // simula latência real
  await new Promise(r => setTimeout(r, 200));

  return {
    provider,
    response: `[${provider.toUpperCase()}] resposta para: ${prompt}`,
    cost: costs[provider] || 0.01
  };
}