import fs from "fs";

function ensureDir(path) {
  fs.mkdirSync(path, { recursive: true });
}

function write(path, content) {
  fs.writeFileSync(path, content);
}

/* 🔥 GARANTE ESTRUTURA */
ensureDir("ai-router/providers");

/* =========================
   INDEX
========================= */
write("ai-router/index.js", `
import { routeRequest } from "./router.js";

export async function aiRouter(req, res) {
  try {
    const { prompt, tenantId, mode } = req.body;

    const result = await routeRequest({
      prompt,
      tenantId,
      mode: mode || "balanced"
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "AI_ROUTER_FAILURE",
      message: err.message
    });
  }
}
`);

/* =========================
   ROUTER
========================= */
write("ai-router/router.js", `
import { callOpenAI } from "./providers/openai.js";
import { callGemini } from "./providers/gemini.js";

export async function routeRequest({ prompt, tenantId, mode }) {
  let provider = "openai";

  if (mode === "cheap") provider = "gemini";

  let response;

  try {
    response =
      provider === "openai"
        ? await callOpenAI(prompt)
        : await callGemini(prompt);
  } catch (e) {
    provider = "gemini_fallback";
    response = await callGemini(prompt);
  }

  return {
    id: Date.now().toString(),
    provider,
    output: response.text,
    usage: {
      tokens: response.tokens
    },
    tenantId,
    timestamp: new Date()
  };
}
`);

/* =========================
   OPENAI MOCK
========================= */
write("ai-router/providers/openai.js", `
export async function callOpenAI(prompt) {
  return {
    text: "OPENAI_MOCK: " + prompt,
    tokens: Math.floor(Math.random() * 400 + 100)
  };
}
`);

/* =========================
   GEMINI MOCK
========================= */
write("ai-router/providers/gemini.js", `
export async function callGemini(prompt) {
  return {
    text: "GEMINI_MOCK: " + prompt,
    tokens: Math.floor(Math.random() * 300 + 80)
  };
}
`);

console.log("✅ AI ROUTER CRIADO COM SUCESSO");