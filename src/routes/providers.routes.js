import express from "express";
import { getProviders } from "../controllers/providers.controller.js";

const router=express.Router();

router.get("/",getProviders);

export default router;
