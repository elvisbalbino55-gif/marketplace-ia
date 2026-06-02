import fs from "fs";

function ensure(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  fs.writeFileSync(path, content);
}

console.log("🚀 APLICANDO PATCH SAAS CORE...");

/* =========================
   ESTRUTURA BASE
========================= */
ensure("ai-router/providers");
ensure("billing");
ensure("dashboard");

/* =========================
   ROUTER V2 (SUBSTITUIÇÃO)
========================= */
write("ai-router/router.js", `
import { callOpenAI } from "./providers/openai.js";
import { callGemini } from "./providers/gemini.js";

const providers = {
  openai: { quality: 0.95, cost: 0.8, latency: 0.7 },
  gemini: { quality: 0.75, cost: 0.3, latency: 0.85 }
};

function score(p) {
  return p.quality * 0.5 + p.cost * 0.3 + p.latency * 0.2;
}

function pick(mode="balanced") {
  const list = Object.entries(providers).map(([k,v])=>{
    let p={...v};

    if(mode==="cheap") p.cost+=0.3;
    if(mode==="premium") p.quality+=0.3;

    return {name:k, score:score(p)};
  });

  list.sort((a,b)=>b.score-a.score);
  return list[0].name;
}

async function run(prompt, provider){
  try{
    if(provider==="openai") return await callOpenAI(prompt);
    return await callGemini(prompt);
  }catch(e){
    return await callGemini(prompt);
  }
}

export async function routeRequest({prompt, tenantId, mode}){
  const provider = pick(mode);
  const start = Date.now();
  const res = await run(prompt, provider);
  const latency = Date.now()-start;

  const cost = (res.tokens||0) * (provider==="openai"?0.00002:0.00001);

  return {
    id: Date.now().toString(),
    provider,
    output: res.text,
    usage:{tokens:res.tokens,cost,latency},
    tenantId,
    timestamp:new Date()
  };
}
`);

/* =========================
   BILLING ENGINE (BASE)
========================= */
write("billing/index.js", `
export function calculateBilling(usage){
  return {
    cost: usage.cost,
    revenue: usage.cost * 3,
    margin: usage.cost * 2
  };
}
`);

/* =========================
   DASHBOARD DATA LAYER
========================= */
write("dashboard/metrics.js", `
export function buildMetrics(logs){
  const total = logs.length;

  const cost = logs.reduce((a,b)=>a+(b.usage?.cost||0),0);

  return {
    requests: total,
    totalCost: cost,
    avgCost: total ? cost/total : 0
  };
}
`);

/* =========================
   PROVIDERS FIX
========================= */
write("ai-router/providers/openai.js", `
export async function callOpenAI(prompt){
  return {
    text:"OPENAI: "+prompt,
    tokens:Math.floor(Math.random()*400+100)
  };
}
`);

write("ai-router/providers/gemini.js", `
export async function callGemini(prompt){
  return {
    text:"GEMINI: "+prompt,
    tokens:Math.floor(Math.random()*300+80)
  };
}
`);

console.log("✅ PATCH SAAS CORE APLICADO COM SUCESSO");