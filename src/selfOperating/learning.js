const memory = [];

export function learn(feedback){

memory.push(feedback);

return {
memorySize: memory.length,
last: feedback
};
}