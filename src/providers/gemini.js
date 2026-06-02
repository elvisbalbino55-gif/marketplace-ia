export async function geminiProvider(prompt){

  return {

    provider:'Gemini',

    output:
      'GEMINI RESPONSE: ' + prompt

  };

}
