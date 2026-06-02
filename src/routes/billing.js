import express from 'express';
import * as billingController from '../controllers/billingController.js';
import { authMiddleware } from '../middleware/auth.js';
import { apiLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.use(authMiddleware);
router.use(apiLimiter);

/**
 * POST /api/billing/subscription
 * Cria nova subscription
 */
router.post('/subscription', billingController.createSubscription);

/**
 * GET /api/billing/subscription
 * Obtém subscription atual
 */
router.get('/subscription', billingController.getSubscription);

/**
 * POST /api/billing/invoice
 * Cria nova fatura
 */
router.post('/invoice', billingController.createInvoice);

/**
 * GET /api/billing/invoices
 * Lista faturas do tenant
 */
router.get('/invoices', billingController.getInvoices);

/**
 * POST /api/billing/invoice/:invoiceId/pay
 * Marca fatura como paga
 */
router.post('/invoice/:invoiceId/pay', billingController.payInvoice);

/**
 * POST /api/billing/calculate-cost
 * Calcula custo de uma operação
 */
router.post('/calculate-cost', billingController.calculateCost);

export default router;