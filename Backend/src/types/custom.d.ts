import { Request } from "express";
import { User } from "../entities/userEntities"; // Adjust the path based on your project structure

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
