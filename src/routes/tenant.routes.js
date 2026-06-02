import express from 'express';

import { auth } from '../middleware/auth.js';
import { db } from '../coreEngine/db.js';

const router = express.Router();

router.get('/me', auth, (req,res)=>{

  const tenant = db.tenants.find(
    t=>t.tenantId===req.user.tenantId
  );

  res.json(tenant);

});

router.get('/logs', auth, (req,res)=>{

  const logs = db.logs.filter(
    l=>l.tenantId===req.user.tenantId
  );

  res.json(logs);

});

export default router;

