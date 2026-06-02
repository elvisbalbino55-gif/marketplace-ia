export async function orchestrateRequest({ prompt }) {

  const type =
    prompt.length < 50 ? "simple" :
    prompt.length < 150 ? "medium" : "complex";

  const cost =
    type === "simple" ? 1 :
    type === "medium" ? 3 : 5;

  let provider = "mock";

  if (type === "complex") provider = "openai";
  else if (type === "medium") provider = "claude";

  return {
    result: `[${provider}] ${prompt}`,
    cost,
    provider,
    type
  };
}