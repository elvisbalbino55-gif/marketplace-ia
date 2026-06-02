const usageDB = new Map();

export function trackUsage(tenantId, data){
const current = usageDB.get(tenantId) || {
requests:0,
cost:0,
latency:0
};

current.requests += 1;
current.cost += data.cost || 0;
current.latency += data.latency || 0;

usageDB.set(tenantId,current);

return current;
}

export function getUsage(tenantId){
return usageDB.get(tenantId) || null;
}