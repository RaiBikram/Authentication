import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data/source";
import { User } from "../entities/userEntities";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.cookie || req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Extract token from cookie or authorization header
    const token = authHeader.includes("Bearer")
      ? authHeader.split(" ")[1]
      : authHeader.split("=")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
      return;
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Fetch user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(403).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in authGuard",
    });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role === "admin") {
      return next();
    }

    res.status(403).json({
      success: false,
      message: "Not Authorized! Admins Only.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in isAdmin",
    });
  }
};

export const isNormal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role === "user") {
      return next();
    } else {
      res.status(400).json({
        success: false,
        message: "Not Authorized ! User only.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in isUser",
    });
  }
};


export const isVerified = async(
  req:Request,
  res:Response,
  next:NextFunction
):Promise<void>=>{
  try {
    if(req.user?.isVerified){
      return next();
    }else{
      res.status(400).json({
        success: false,
        message: "User Not verified.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in isVerified",
    });
  }
}