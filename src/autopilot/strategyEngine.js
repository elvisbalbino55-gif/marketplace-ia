import { openai } from "../orchestrator/providers/openai.js";
import { claude } from "../orchestrator/providers/claude.js";
import { gemini } from "../orchestrator/providers/gemini.js";

export async function generateStrategies(problem){

const [a,b,c] = await Promise.all([
openai.run({ prompt: "estratégia: " + JSON.stringify(problem) }),
claude.run({ prompt: "estratégia: " + JSON.stringify(problem) }),
gemini.run({ prompt: "estratégia: " + JSON.stringify(problem) })
]);

return {
openai: a.data,
claude: b.data,
gemini: c.data
};
}