export async function openaiProvider(prompt){

  return {

    provider:'OpenAI',

    output:
      'OPENAI RESPONSE: ' + prompt

  };

}
