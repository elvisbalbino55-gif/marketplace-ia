import { unifiedCore } from "../s../core/index.js";
import fs from "fs";
import { authTenant, charge } from "../middleware/tenant.js";

const HISTORY_FILE = "./history.json";

function load(){
  return JSON.parse(fs.readFileSync(HISTORY_FILE));
}

function save(data){
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data,null,2));
}

// =========================
// EXEC ENGINE (SaaS CORE)
// =========================
export async function execute(req,res){

  const { prompt, provider="gemini" } = req.body;

  const costModel = {
    openai:{cost:1,revenue:2.5},
    gemini:{cost:0.4,revenue:1.5},
    claude:{cost:0.9,revenue:2.1}
  };

  const billing = costModel[provider] || costModel.gemini;

  const result = charge(req,billing.cost,billing.revenue);

  const history = load();

const coreResult =
  await unifiedCore({
    prompt,
    provider,
    tenant:req.tenant.apiKey,
    tenantId:req.tenant.apiKey
  });

  const entry = {
    id: Date.now(),
    tenant: req.tenant.apiKey,
    provider,
    prompt,
    latency: 200,
    cost: result.cost,
    revenue: result.revenue,
    profit: result.profit,
    coreResult, time: new Date().toISOString()
  };

  history.unshift(entry);
  save(history);

  res.json({
    success:true,
    tenant:req.tenant.name,
    usage:req.tenant.used,
    quota:req.tenant.quota,
    data:entry
  });
}

// =========================
// DASHBOARD (TENANT VIEW)
// =========================
export function dashboard(req,res){

  const history = load().filter(h=>h.tenant===req.tenant.apiKey);

  let revenue=0;
  let cost=0;

  history.forEach(h=>{
    revenue += h.revenue;
    cost += h.cost;
  });

  res.json({
    tenant:req.tenant.name,
    requests:history.length,
    revenue,
    cost,
    profit:revenue-cost
  });
}





