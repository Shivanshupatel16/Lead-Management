import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import { bad } from "./utils/apiResponse.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // frontend origin
  credentials: true                 // if you send cookies/auth headers
}));

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  return bad(res, err.message || "Something went wrong", 500);
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on :${PORT}`));
});
