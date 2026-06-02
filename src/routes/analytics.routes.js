import express from 'express';

import { prisma }
from '../database/prisma.js';

import { auth }
from '../middleware/auth.js';

const router = express.Router();

router.get(
'/overview',
auth,
async(req,res)=>{

  const users =
    await prisma.user.count();

  const requests =
    await prisma.usageLog.count();

  const logs =
    await prisma.usageLog.findMany();

  let revenue = 0;
  let cost = 0;
  let profit = 0;

  logs.forEach(log=>{

    revenue += log.revenue;
    cost += log.cost;
    profit += log.profit;

  });

  res.json({

    users,

    requests,

    revenue,

    cost,

    profit

  });

});

export default router;
