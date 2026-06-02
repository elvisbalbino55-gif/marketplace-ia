import express from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import aiRoutes from './routes/ai.js';
import tenantRoutes from './routes/tenants.js';
import billingRoutes from './routes/billing.js';
import indexRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ===== MIDDLEWARE =====
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(logger);

// ===== CORS =====
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ===== ROTAS =====
app.use('/api', indexRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/billing', billingRoutes);

// ===== ROTA 404 =====
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`\n\n╔════════════════════════════════════════╗`);
  console.log(`║  🚀 AI REVENUE OS - Gateway API       ║`);
  console.log(`║  ✅ Servidor rodando em porta ${PORT}      ║`);
  console.log(`║  🌍 http://localhost:${PORT}              ║`);
  console.log(`║  📊 Mode: ${process.env.NODE_ENV || 'development'}           ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
  
  console.log('📚 Endpoints disponíveis:');
  console.log('  🔵 GET    /api');
  console.log('  🔵 GET    /api/health');
  console.log('  🔵 GET    /api/status');
  console.log('  🟢 POST   /api/ai/analyze');
  console.log('  🟢 POST   /api/ai/evaluate-strategy');
  console.log('  🟢 POST   /api/ai/optimize');
  console.log('  🔵 GET    /api/ai/stats');
  console.log('  🟢 POST   /api/tenants');
  console.log('  🔵 GET    /api/tenants/:tenantId');
  console.log('  🟠 PUT    /api/tenants/:tenantId');
  console.log('  🟢 POST   /api/billing/subscription');
  console.log('  🟢 POST   /api/billing/invoice');
  console.log('  🔵 GET    /api/billing/invoices');
  console.log('\n');
});

export default app;