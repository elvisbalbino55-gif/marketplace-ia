import { openai } from "./providers/openai.js";
import { claude } from "./providers/claude.js";
import { gemini } from "./providers/gemini.js";

export function routeRequest(request){
const text = (request.prompt || "").toLowerCase();

if(text.includes("código") || text.includes("api") || text.includes("backend")){
return { provider: claude, estimatedCost: 0.012 };
}

if(text.includes("resumo") || text.length < 250){
return { provider: gemini, estimatedCost: 0.004 };
}

return { provider: openai, estimatedCost: 0.01 };
}