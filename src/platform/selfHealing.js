export function selfHeal(systemState){

const issues = [];

if(systemState.latency > 1000) issues.push("latency");
if(systemState.errorRate > 0.1) issues.push("errors");

return {
status: issues.length ? "healing" : "stable",
actions: issues.map(i => "fix_" + i)
};
}