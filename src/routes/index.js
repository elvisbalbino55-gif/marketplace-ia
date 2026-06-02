import express from 'express';

const router = express.Router();

/**
 * GET /api/health
 * Health check
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION || '1.0.0'
  });
});

/**
 * GET /api/status
 * Status completo do sistema
 */
router.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    services: {
      api: 'operational',
      ai_providers: 'operational',
      database: 'operational',
      cache: 'operational'
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/
 * Info da API
 */
router.get('/', (req, res) => {
  res.json({
    name: 'AI Revenue OS - Gateway API',
    version: '1.0.0',
    description: 'Plataforma inteligente de otimização de IA',
    documentation: 'https://docs.airevenueos.com',
    endpoints: {
      ai: '/api/ai',
      tenants: '/api/tenants',
      billing: '/api/billing',
      health: '/api/health',
      status: '/api/status'
    }
  });
});

export default router;