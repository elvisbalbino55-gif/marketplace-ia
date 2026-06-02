export function resolveProvider(prompt){

  const p = prompt.toLowerCase();

  if(
    p.includes('backend') ||
    p.includes('api') ||
    p.includes('código')
  ){
    return 'gpt4';
  }

  if(
    p.includes('mercado') ||
    p.includes('pesquisa') ||
    p.includes('tendência')
  ){
    return 'claude';
  }

  return 'gemini_flash';

}
