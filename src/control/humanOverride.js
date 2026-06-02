export function override(systemState, correction){

return {
status: "overridden",
previous: systemState,
correction,
applied: true
};
}