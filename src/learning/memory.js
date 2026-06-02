const memory = new Map();

export function saveMemory(tenantId, data){
const current = memory.get(tenantId) || {
patterns: [],
performance: {}
};

current.patterns.push(data);

memory.set(tenantId, current);
}

export function getMemory(tenantId){
return memory.get(tenantId) || null;
}