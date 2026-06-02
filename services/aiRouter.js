export function selectProvider(prompt){

  const text =
    prompt.toLowerCase();

  // CODE
  if(
    text.includes("backend") ||
    text.includes("node") ||
    text.includes("api") ||
    text.includes("sql") ||
    text.includes("react")
  ){

    return {

      provider:"OpenAI",

      model:"gpt-4o",

      cost:0.80,

      price:2.50

    };

  }

  // RESEARCH
  if(
    text.includes("pesquisa") ||
    text.includes("mercado") ||
    text.includes("analytics") ||
    text.includes("relatório")
  ){

    return {

      provider:"Claude",

      model:"claude-sonnet",

      cost:0.45,

      price:1.90

    };

  }

  // CREATIVE
  if(
    text.includes("criativo") ||
    text.includes("marketing") ||
    text.includes("design")
  ){

    return {

      provider:"Gemini",

      model:"gemini-pro",

      cost:0.30,

      price:1.50

    };

  }

  // LOW COST
  return {

    provider:"DeepSeek",

    model:"deepseek-chat",

    cost:0.15,

    price:1.20

  };

}
