const executions = [];

export function trackExecution(data){
executions.push({
...data,
timestamp: Date.now()
});
}

export function getExecutions(){
return executions;
}