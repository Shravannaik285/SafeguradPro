import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import equipmentRoutes from "./routes/equipmentRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

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