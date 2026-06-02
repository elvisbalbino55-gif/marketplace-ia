export function orchestrateAI(prompt){

  let provider =
    "OpenAI";

  let model =
    "gpt-4o";

  let latency =
    1200;

  let cost =
    1.0;

  if(
    prompt.toLowerCase().includes("codigo")
  ){

    provider =
      "OpenAI";

    model =
      "gpt-4o";

    latency =
      900;

    cost =
      1.2;

  }

  else if(
    prompt.toLowerCase().includes("pesquisa")
  ){

    provider =
      "Claude";

    model =
      "claude-sonnet";

    latency =
      1500;

    cost =
      1.0;

  }

  else if(
    prompt.toLowerCase().includes("marketing")
  ){

    provider =
      "Gemini";

    model =
      "gemini-2.5";

    latency =
      1100;

    cost =
      0.9;

  }

  else{

    provider =
      "DeepSeek";

    model =
      "deepseek-v3";

    latency =
      700;

    cost =
      0.4;

  }

  return {

    provider,

    model,

    latency,

    cost,

    revenue:1.5,

    profit:
      1.5 - cost,

    margin:
      Math.round(
        (
          (1.5 - cost)
          / 1.5
        ) * 100
      )

  };

}
