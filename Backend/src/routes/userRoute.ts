import { Router } from "express";
import {
  forgotPasswordController,
  getUserProfileController,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetUserPasswordController,
  uploadImageCloudinaryToDB,
  verifyEmailUserController,
} from "../controllers/userController";
import { authGuard, isVerified } from "../middlewares/authMiddleware";
import { uploadSinglePhoto } from "../config/multerConfig";

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailUserController);
userRouter.post("/sign-in", loginUserController);
userRouter.post("/logout", logoutUserController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/reset-password", resetUserPasswordController);
userRouter.get("/get-profile", authGuard, getUserProfileController);
userRouter.post(
  "/upload-profile",
  authGuard,
  isVerified,
  uploadSinglePhoto,
  uploadImageCloudinaryToDB
);
export { userRouter };
