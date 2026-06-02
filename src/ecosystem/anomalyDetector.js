export function detectAnomalies(observation){

const issues = [];

for(const key in observation){
if(observation[key]) issues.push(key);
}

return {
hasIssues: issues.length > 0,
issues
};
}