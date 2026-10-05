import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import equipmentRoutes from "./routes/equipmentRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.static("public"));

connectDB();

app.use("/api/reports", reportRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/inspections", inspectionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});