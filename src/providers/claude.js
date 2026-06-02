export async function claudeProvider(prompt){

  return {

    provider:'Claude',

    output:
      'CLAUDE RESPONSE: ' + prompt

  };

}
