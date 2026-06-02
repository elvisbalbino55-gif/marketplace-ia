import aiService from '../services/aiService.js';
import strategyService from '../services/strategyService.js';

export async function analyze(req, res, next) {
  try {
    const { prompt, strategy = 'balanced', provider } = req.body;
    const { tenantId } = req.user;

    const result = await aiService.analyze(prompt, {
      strategy,
      provider,
      tenantId
    });

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function evaluateStrategy(req, res, next) {
  try {
    const { strategy, context } = req.body;
    const { tenantId } = req.user;

    const evaluation = await strategyService.evaluateStrategy(strategy, {
      ...context,
      tenantId
    });

    res.json({
      success: true,
      data: evaluation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function optimizeForPolicy(req, res, next) {
  try {
    const { strategies, policy = 'balanced' } = req.body;
    const { tenantId } = req.user;

    const result = await strategyService.optimizeForPolicy(strategies, policy);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function getStats(req, res, next) {
  try {
    const stats = aiService.getStats();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCache(req, res, next) {
  try {
    aiService.clearCache();

    res.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}