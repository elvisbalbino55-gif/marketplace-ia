const logs = [];

export function logRequest(data){
logs.push({
time: new Date().toISOString(),
...data
});
}

export function getLogs(){
return logs.slice(-100);
}