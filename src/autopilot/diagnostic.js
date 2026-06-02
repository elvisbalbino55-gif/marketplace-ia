export function diagnostic(input){

const text = typeof input === "string"
  ? input.toLowerCase()
  : (input?.prompt || "").toLowerCase();

return {
industry: detectIndustry(text),
goal: detectGoal(text),
problemType: detectProblem(text)
};
}

function detectIndustry(text){
if(text.includes("saas")) return "software";
if(text.includes("sales")) return "sales";
return "general";
}

function detectGoal(text){
if(text.includes("crescer")) return "growth";
if(text.includes("reduzir")) return "optimization";
return "unknown";
}

function detectProblem(text){
if(text.includes("custo")) return "cost";
if(text.includes("conversion")) return "conversion";
return "generic";
}

