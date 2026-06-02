import { mockProvider } from "../providers/mock.js";

export async function modelRouter({ prompt, mode }) {
  const start = Date.now();

  // por enquanto só MOCK (estável)
  const result = await mockProvider(prompt);

  const end = Date.now();

  return {
    text: result.text,
    provider: result.provider,
    cost: result.cost,
    latency: end - start
  };
}