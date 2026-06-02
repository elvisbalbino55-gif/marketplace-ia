import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const SECRET = process.env.MASTER_KEY;

router.post('/login', (req,res)=>{
  const {email} = req.body;

  const token = jwt.sign({email}, SECRET, {expiresIn:'1d'});

  res.json({
    token,
    user:{email}
  });
});

export default router;
