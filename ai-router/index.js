
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
