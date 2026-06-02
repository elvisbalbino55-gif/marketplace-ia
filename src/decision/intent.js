export function detectIntent(prompt){
const text = (prompt || "").toLowerCase();

if(text.includes("reduzir") || text.includes("otimizar")){
return "optimization";
}

if(text.includes("criar") || text.includes("gerar")){
return "creation";
}

if(text.includes("analisar") || text.includes("dados")){
return "analysis";
}

if(text.includes("estratégia") || text.includes("negócio")){
return "strategy";
}

return "general";
}