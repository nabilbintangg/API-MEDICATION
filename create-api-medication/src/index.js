import express from "express";
import dotenv from "dotenv";
import medicationRoutes from "./routes/medicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
