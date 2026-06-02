export function platformCore(input){
return {
status: "GLOBAL_PLATFORM_ACTIVE",
input,
timestamp: Date.now()
};
}