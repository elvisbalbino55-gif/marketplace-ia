import express from 'express';
import * as tenantController from '../controllers/tenantController.js';
import { authMiddleware } from '../middleware/auth.js';
import { apiLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.use(apiLimiter);

/**
 * POST /api/tenants
 * Cria novo tenant
 */
router.post('/', tenantController.createTenant);

/**
 * GET /api/tenants/:tenantId
 * Obtém informações do tenant
 */
router.get('/:tenantId', authMiddleware, tenantController.getTenant);

/**
 * PUT /api/tenants/:tenantId
 * Atualiza tenant
 */
router.put('/:tenantId', authMiddleware, tenantController.updateTenant);

/**
 * GET /api/tenants
 * Lista todos os tenants
 */
router.get('/', authMiddleware, tenantController.listTenants);

export default router;