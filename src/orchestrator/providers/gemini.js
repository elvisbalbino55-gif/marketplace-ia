export const gemini = {
name: "gemini",
async run({ prompt }){
return { data: "[GEMINI MOCK] " + prompt };
}
};