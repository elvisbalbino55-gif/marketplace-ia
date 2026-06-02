export function aiRouter(prompt = "") {
  const size = prompt.length;

  const hasCode = /function|const|let|class/.test(prompt);
  const hasAnalysis = /analisar|otimizar|melhorar|debug/i.test(prompt);

  if (hasCode || size > 200) {
    return "openai";
  }

  if (hasAnalysis || size > 80) {
    return "anthropic";
  }

  return "gemini";
}