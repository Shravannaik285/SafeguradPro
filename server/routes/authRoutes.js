import express from 'express';
import addEquipment from '../middleware/authMiddleware.js'
const app=express.Router()
route.get("/",addEquipment)

export default router;