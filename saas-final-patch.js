import fs from "fs";

function dir(p){ fs.mkdirSync(p,{recursive:true}); }
function write(p,c){ fs.writeFileSync(p,c); }

console.log("🚀 APLICANDO SAAS FINAL PATCH...");

/* =========================
   BILLING PRO (LEDGER REAL)
========================= */
dir("billing");

write("billing/engine.js", `
const ledger = [];

export function registerBilling({ tenantId, usage }) {
  const cost = usage.cost || 0;
  const revenue = cost * 3;
  const margin = revenue - cost;

  ledger.push({
    tenantId,
    cost,
    revenue,
    margin,
    timestamp: new Date()
  });

  return { cost, revenue, margin };
}

export function getTenantStats(tenantId) {
  const data = ledger.filter(x => x.tenantId === tenantId);

  return {
    tenantId,
    requests: data.length,
    cost: data.reduce((a,b)=>a+b.cost,0),
    revenue: data.reduce((a,b)=>a+b.revenue,0),
    margin: data.reduce((a,b)=>a+b.margin,0)
  };
}

export function getSystemStats() {
  return {
    requests: ledger.length,
    cost: ledger.reduce((a,b)=>a+b.cost,0),
    revenue: ledger.reduce((a,b)=>a+b.revenue,0),
    margin: ledger.reduce((a,b)=>a+b.margin,0)
  };
}

export function getLeaderboard() {
  const map = {};

  for(const l of ledger){
    if(!map[l.tenantId]){
      map[l.tenantId] = { tenantId:l.tenantId, cost:0, revenue:0, margin:0 };
    }

    map[l.tenantId].cost += l.cost;
    map[l.tenantId].revenue += l.revenue;
    map[l.tenantId].margin += l.margin;
  }

  return Object.values(map).sort((a,b)=>b.margin-a.margin);
}
`);

/* =========================
   DASHBOARD BACKEND
========================= */
dir("dashboard");

write("dashboard/api.js", `
import { getSystemStats, getLeaderboard } from "../billing/engine.js";

export function getDashboardData() {
  return {
    system: getSystemStats(),
    leaderboard: getLeaderboard()
  };
}
`);

/* =========================
   FRONTEND SIMPLES (HTML)
========================= */
write("dashboard/index.html", `
<!DOCTYPE html>
<html>
<head>
  <title>AI REVENUE DASHBOARD</title>
  <style>
    body { font-family: Arial; background:#0f0f0f; color:white; padding:20px; }
    .card { background:#1c1c1c; padding:15px; margin:10px 0; border-radius:10px; }
    h1 { color:#00ffcc; }
  </style>
</head>
<body>

<h1>🚀 AI REVENUE DASHBOARD</h1>

<div class="card" id="system"></div>
<div class="card" id="leaders"></div>

<script>
fetch('/api/dashboard')
.then(r=>r.json())
.then(data=>{
  document.getElementById('system').innerHTML =
    "<h3>SYSTEM</h3><pre>"+JSON.stringify(data.system,null,2)+"</pre>";

  document.getElementById('leaders').innerHTML =
    "<h3>LEADERBOARD</h3><pre>"+JSON.stringify(data.leaderboard,null,2)+"</pre>";
});
</script>

</body>
</html>
`);

/* =========================
   ROUTER PATCH (INTEGRAÇÃO FINAL)
========================= */
dir("ai-router");

write("ai-router/router.js", `
import { registerBilling } from "../billing/engine.js";

export async function routeRequest({ prompt, tenantId }) {

  const cost = Math.random() * 0.02;

  const usage = {
    cost,
    tokens: Math.floor(Math.random()*500+100),
    latency: Math.random()*200
  };

  registerBilling({ tenantId, usage });

  return {
    output: "AI RESPONSE: " + prompt,
    usage
  };
}
`);

console.log("✅ SAAS FINAL PATCH APLICADO COM SUCESSO");