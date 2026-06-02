import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-api-key", "Authorization"]
}));

app.use(express.json());

// MOCK ROUTE (teste imediato)
app.post("/v1/search-and-code", (req, res) => {
  const { prompt } = req.body;

  return res.json({
    result: `Processado: ${prompt}`,
    provider: "mock-esm",
    latency: 120,
    credits: 1
  });
});

export default app;