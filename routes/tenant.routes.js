import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{
  res.json([{id:1,name:'Tenant V4 Real'}]);
});

router.get('/logs',(req,res)=>{
  res.json([{id:1,action:'AI RUN LOG V4'}]);
});

export default router;
