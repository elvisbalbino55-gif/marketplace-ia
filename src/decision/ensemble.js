import { openai } from "../orchestrator/providers/openai.js";
import { claude } from "../orchestrator/providers/claude.js";
import { gemini } from "../orchestrator/providers/gemini.js";

export async function runEnsemble(prompt){

const providers = [openai, claude, gemini];

const results = await Promise.all(
providers.map(async (p) => {
const start = Date.now();
const res = await p.run({ prompt });

return {
provider: p.name,
text: res.data,
latency: Date.now() - start,
cost: Math.random() * 0.02,
quality: Math.random() // placeholder (depois vira real scoring)
};
})
);

return results;
}