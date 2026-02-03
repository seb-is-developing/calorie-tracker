import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import bodyStatsRoutes from "./routes/bodyStats.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", bodyStatsRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

export default app;
