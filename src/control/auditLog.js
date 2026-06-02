const logs = [];

export function audit(entry){

logs.push({
...entry,
timestamp: Date.now(),
hash: Math.random().toString(36).substring(2)
});

return true;
}

export function getLogs(){
return logs;
}