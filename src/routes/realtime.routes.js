import express from "express";
import { getRealtime } from "../controllers/realtime.controller.js";

const router=express.Router();

router.get("/",getRealtime);

export default router;
