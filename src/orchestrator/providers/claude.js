export const claude = {
name: "claude",
async run({ prompt }){
return { data: "[CLAUDE MOCK] " + prompt };
}
};