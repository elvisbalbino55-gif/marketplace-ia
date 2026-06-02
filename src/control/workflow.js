export function approvalWorkflow(action){

return {
status: "pending_approval",
action,
reason: "risk or cost threshold exceeded"
};
}