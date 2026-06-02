import tenantService from '../services/tenantService.js';
import billingService from '../services/billingService.js';

export function createTenant(req, res, next) {
  try {
    const { name, email, plan = 'professional', config } = req.body;

    const tenant = tenantService.create({
      name,
      email,
      plan,
      config
    });

    // Criar subscription automaticamente
    const subscription = billingService.createSubscription(tenant.id, plan);

    res.status(201).json({
      success: true,
      data: { tenant, subscription },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function getTenant(req, res, next) {
  try {
    const { tenantId } = req.user;
    const tenant = tenantService.get(tenantId);

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const subscription = billingService.getSubscription(tenantId);

    res.json({
      success: true,
      data: { tenant, subscription },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function updateTenant(req, res, next) {
  try {
    const { tenantId } = req.user;
    const data = req.body;

    const updated = tenantService.update(tenantId, data);

    res.json({
      success: true,
      data: updated,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export function listTenants(req, res, next) {
  try {
    const tenants = tenantService.list();

    res.json({
      success: true,
      data: tenants,
      count: tenants.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}