import billingService from '../services/billingService.js';
import tenantService from '../services/tenantService.js';

export function createSubscription(req, res, next) {
  try {
    const { plan = 'professional' } = req.body;
    const { tenantId } = req.user;

    const subscription = billingService.createSubscription(tenantId, plan);

    res.status(201).json({
      success: true,
      data: subscription,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function getSubscription(req, res, next) {
  try {
    const { tenantId } = req.user;
    const subscription = billingService.getSubscription(tenantId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({
      success: true,
      data: subscription,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function createInvoice(req, res, next) {
  try {
    const { amount, items } = req.body;
    const { tenantId } = req.user;

    const invoice = billingService.createInvoice(tenantId, { amount, items });

    res.status(201).json({
      success: true,
      data: invoice,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function getInvoices(req, res, next) {
  try {
    const { tenantId } = req.user;
    const invoices = billingService.getInvoices(tenantId);

    res.json({
      success: true,
      data: invoices,
      count: invoices.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function payInvoice(req, res, next) {
  try {
    const { invoiceId } = req.params;
    const { paymentMethod, paymentId } = req.body;

    const invoice = billingService.payInvoice(invoiceId, {
      method: paymentMethod,
      paymentId
    });

    res.json({
      success: true,
      data: invoice,
      message: 'Invoice paid successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function calculateCost(req, res, next) {
  try {
    const { provider, tokens } = req.body;
    const cost = billingService.calculateCost(provider, tokens);

    res.json({
      success: true,
      data: {
        provider,
        tokens,
        cost,
        formatted: `$${cost.toFixed(4)}`
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}