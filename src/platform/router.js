export function platformRouter(request){

const text = (request.prompt || "").toLowerCase();

return {
intent: text.includes("vender") ? "business" : "general",
risk: text.includes("delete") ? 0.9 : 0.2,
priority: text.length > 200 ? "high" : "normal"
};
}