import { configDotenv } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./data/source";
import { userRouter } from "./routes/userRoute";
import cors from "cors";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); // Allows reading cookies
app.use("/api/user", userRouter);
app.use(
  cors({
    origin: "*",
    credentials: true, // Allow sending cookies
  })
);
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

// PostgreSQL connection with TypeORM
(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();
