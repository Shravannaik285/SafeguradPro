import express from 'express';

import { getEquipments,addEquipment,updateEquipment } from '../controllers/equipmentController.js'

import authMiddleware from "../middleware/authMiddleware.js"

const router=express.Router();

router.get("/",authMiddleware,getEquipments,addEquipment);

router.post("/",authMiddleware,addEquipment);

router.patch("/:id",authMiddleware,updateEquipment);

export default router;
