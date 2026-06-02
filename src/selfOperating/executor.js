export async function execute(decision){

return {
status: "executed",
action: decision,
result: Math.random() > 0.2
};
}