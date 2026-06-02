import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { prisma }
from '../database/prisma.js';

const router = express.Router();

router.post('/register',async(req,res)=>{

  const {email,password} = req.body;

  const exists =
    await prisma.user.findUnique({
      where:{email}
    });

  if(exists){

    return res.status(400).json({
      error:'USER EXISTS'
    });

  }

  const user =
    await prisma.user.create({

      data:{

        email,

        password:
          bcrypt.hashSync(password,10),

        apiKey:
          'ak_' +
          uuid().replaceAll('-','')

      }

    });

  res.json({

    success:true,

    apiKey:user.apiKey

  });

});

router.post('/login',async(req,res)=>{

  const {email,password} = req.body;

  const user =
    await prisma.user.findUnique({
      where:{email}
    });

  if(!user){

    return res.status(401).json({
      error:'INVALID USER'
    });

  }

  const valid =
    bcrypt.compareSync(
      password,
      user.password
    );

  if(!valid){

    return res.status(401).json({
      error:'INVALID PASSWORD'
    });

  }

  const token = jwt.sign({

    id:user.id,
    email:user.email

  },
  process.env.MASTER_KEY,
  {
    expiresIn:'1d'
  });

  res.json({

    success:true,

    token,

    apiKey:user.apiKey,

    quota:user.quota,

    used:user.used

  });

});

export default router;
