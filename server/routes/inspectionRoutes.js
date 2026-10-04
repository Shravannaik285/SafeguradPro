import express from 'express';
import {createInspection,getInspections} from '../controllers/inspectionController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router=express.Router();

router.get("/",authMiddleware,getInspections);
router.post("/",authMiddleware,createInspection);

export default router;
