import { registerBilling } from "../billing/engine.js";

export async function routeRequest({ prompt, tenant }) {

  const cost = Math.random() * 0.02;

  const usage = {
    cost,
    tokens: Math.floor(Math.random() * 500 + 100),
    latency: Math.random() * 200
  };

  registerBilling({
    tenantId: tenant.id,
    usage
  });

  return {
    output: "AI RESPONSE: " + prompt,
    tenant: tenant.name,
    usage
  };
}