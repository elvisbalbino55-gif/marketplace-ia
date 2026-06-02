
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
