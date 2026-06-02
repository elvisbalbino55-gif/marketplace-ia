import express from "express";
import { getProjection } from "../controllers/projection.controller.js";

const router=express.Router();

router.get("/",getProjection);

export default router;
