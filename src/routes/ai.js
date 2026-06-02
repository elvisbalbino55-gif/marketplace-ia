import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);
router.use(aiLimiter);

/**
 * POST /api/ai/analyze
 * Analisa um prompt com estratégia inteligente
 */
router.post('/analyze', aiController.analyze);

/**
 * POST /api/ai/evaluate-strategy
 * Avalia impacto econômico de uma estratégia
 */
router.post('/evaluate-strategy', aiController.evaluateStrategy);

/**
 * POST /api/ai/optimize
 * Otimiza estratégias baseado em política
 */
router.post('/optimize', aiController.optimizeForPolicy);

/**
 * GET /api/ai/stats
 * Retorna estatísticas de uso
 */
router.get('/stats', aiController.getStats);

/**
 * POST /api/ai/clear-cache
 * Limpa cache de análises
 */
router.post('/clear-cache', aiController.clearCache);

export default router;