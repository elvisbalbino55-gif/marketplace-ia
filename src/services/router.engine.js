export function routePrompt(prompt){

 const p=(prompt||"").toLowerCase();

 if(
   p.includes("api") ||
   p.includes("backend") ||
   p.includes("node") ||
   p.includes("javascript") ||
   p.includes("código")
 ){
   return "OpenAI";
 }

 if(
   p.includes("pesquisa") ||
   p.includes("mercado") ||
   p.includes("estratégia") ||
   p.includes("negócio")
 ){
   return "Claude";
 }

 return "Gemini";

}
