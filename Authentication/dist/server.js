import { configDotenv } from "dotenv";
import express from "express";
import { AppDataSource } from "./data/source";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// PostgreSQL connection with TypeORM
(async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
})();
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Node.js!");
});
