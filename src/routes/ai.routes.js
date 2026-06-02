import express from 'express';

import { prisma }
from '../database/prisma.js';

import { auth }
from '../middleware/auth.js';

import { limiter }
from '../middleware/limiter.js';

import { logger }
from '../logs/logger.js';

import { getCache,setCache }
from '../cache/cache.js';

import { selectProvider }
from '../services/router.js';

import { billing }
from '../services/billing.js';

import { openaiProvider }
from '../providers/openai.js';

import { geminiProvider }
from '../providers/gemini.js';

import { claudeProvider }
from '../providers/claude.js';

const router = express.Router();

router.post(
'/run',
auth,
limiter,
async(req,res)=>{

  const start = Date.now();

  const {prompt} = req.body;

  const cached =
    getCache(prompt);

  if(cached){

    return res.json({

      success:true,

      cache:true,

      data:cached

    });

  }

  const provider =
    selectProvider(prompt);

  let response;

  try{

    if(provider==='openai'){

      response =
        await openaiProvider(prompt);

    }
    else if(provider==='claude'){

      response =
        await claudeProvider(prompt);

    }
    else{

      response =
        await geminiProvider(prompt);

    }

  }catch(err){

    response =
      await geminiProvider(prompt);

  }

  const bill =
    billing(provider);

  const latency =
    Date.now() - start;

  const user =
    await prisma.user.findUnique({

      where:{
        email:req.user.email
      }

    });

  await prisma.user.update({

    where:{
      id:user.id
    },

    data:{
      used:user.used + 1
    }

  });

  await prisma.usageLog.create({

    data:{

      userId:user.id,

      provider,

      prompt,

      cost:bill.cost,

      revenue:bill.revenue,

      profit:bill.profit,

      latency

    }

  });

  const result = {

    ai:response,

    billing:bill,

    latency

  };

  setCache(prompt,result);

  logger(
    'AI_REQUEST',
    result
  );

  res.json({

    success:true,

    cache:false,

    result

  });

});

export default router;
