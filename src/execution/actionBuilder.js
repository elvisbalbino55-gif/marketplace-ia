export function buildAction(decision){

const { strategy } = decision;

return {
type: "business_action",
actions: [
{ system: "crm", payload: "update_customer_segment" },
{ system: "email", payload: "send_campaign" },
{ system: "webhook", payload: "trigger_flow" }
],
confidence: decision.analysis?.valueScore || 0.5
};
}