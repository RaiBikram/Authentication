import "reflect-metadata";
import { configDotenv } from "dotenv";
import { DataSource, Transaction } from "typeorm";
import { User } from "../entities/userEntities";
configDotenv();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,// Use PostgreSQL default port
    username: process.env.PostgreSQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true, // Set to false in production
    logging: true,
    entities: [
      User, 
      // Transactions,
      // Banker
    ],
  });