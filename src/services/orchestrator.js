export function orchestrate(prompt){

  const p =
    prompt.toLowerCase();

  if(
    p.includes("api") ||
    p.includes("backend") ||
    p.includes("node")
  ){
    return "OpenAI";
  }

  if(
    p.includes("mercado") ||
    p.includes("pesquisa") ||
    p.includes("análise")
  ){
    return "Claude";
  }

  return "Gemini";

}
