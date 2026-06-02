const { chargeUser } = require("../services/billing.service");

async function handleRequest(req, res) {
  try {
    const { prompt } = req.body;

    const cost = 1; // 1 crédito por request

    await chargeUser(req.user.id, cost);

    // simulação de provider (depois conecta OpenAI / outros)
    const response = {
      result: `Processado: ${prompt}`,
      provider: "mock-ai",
      latency: 120,
      credits: cost
    };

    return res.json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = { handleRequest };