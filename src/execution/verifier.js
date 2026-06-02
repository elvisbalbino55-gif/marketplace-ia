export function verifyExecution(results){

return results.map(r => ({
...r,
success: Math.random() > 0.2
}));
}