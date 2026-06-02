
export async function callGemini(prompt){
  return {
    text:"GEMINI: "+prompt,
    tokens:Math.floor(Math.random()*300+80)
  };
}
