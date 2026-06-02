import express from 'express';

import { auth } from '../middleware/auth.js';
import { db } from '../coreEngine/db.js';

const router = express.Router();

router.get('/overview', auth, (req,res)=>{

  const tenantLogs = db.logs.filter(
    l=>l.tenantId===req.user.tenantId
  );

  let revenue = 0;
  let cost = 0;
  let profit = 0;

  tenantLogs.forEach(log=>{
    revenue += log.price;
    cost += log.cost;
    profit += log.profit;
  });

  res.json({
    requests:tenantLogs.length,
    revenue,
    cost,
    profit,
    margin: revenue > 0
      ? ((profit / revenue) * 100).toFixed(2) + '%'
      : '0%'
  });

});

export default router;

