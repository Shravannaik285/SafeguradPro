import reportRoutes from "./routes/reportRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import "dotenv/config";
import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";


const app=express();


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

connectDB();

app.use("/api/reports",reportRoutes);
app.use("/api/equipment",equipmentRoutes);
app.use("/api/inspections",inspectionRoutes);

app.listen(5000,()=>{
    console.log("Your server has stated running on port 5000")
})
