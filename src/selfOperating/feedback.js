export function feedback(execution){

return {
success: execution.result,
impact: Math.random(),
timestamp: Date.now()
};
}