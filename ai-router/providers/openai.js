
export async function callOpenAI(prompt){
  return {
    text:"OPENAI: "+prompt,
    tokens:Math.floor(Math.random()*400+100)
  };
}
