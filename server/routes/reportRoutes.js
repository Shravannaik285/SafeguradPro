import express from "express";
import upload from '../middleware/uploadMiddleware.js';
import { analyzeReport } from '../controllers/reportController.js';

const router=express.Router();

router.post("/analyze",upload.single('image'),analyzeReport);

export default router;



