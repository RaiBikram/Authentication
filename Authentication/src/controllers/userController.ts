import { Request, Response } from "express";
import { User } from "../entities/userEntities";
import { AppDataSource } from "../data/source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookiesOptions } from "../utils/coookiesOptions";
import { MoreThan } from "typeorm";
import { cloudinary } from "../config/cloudnaryConfig";
import crypto from "crypto"
import fs from "fs";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  userProfileUploadWelcome,
} from "../nodeMailer/sendMail";
//@register user
//@new user
//@/api/user/register
export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, name, profilePicture, role } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 6 digit
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const newUser:User = userRepository.create({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
      profilePicture: profilePicture || null,
      role: role || "user",
    });

    await userRepository.save(newUser);
    sendVerificationEmail(newUser.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      verificationToken: verificationToken, // TODO user email
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
// @verify email
//@register user
//@api/user/verify-email
export const verifyEmailUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { code } = req.body;
    console.log(code);
    if (!code) {
      res.status(400).json({
        success: false,
        message: "Missing Verification code",
      });
      return;
    }
    const getRepository = AppDataSource.getRepository(User);
    const user = await getRepository.findOne({
      where: {
        verificationToken: code,
        verificationTokenExpiresAt: MoreThan(new Date()),
      },
    });
    console.log(user);
    if (!user) {
      res.status(401).json({
        success: false,
        messsage: "invalid token ",
      });
      return;
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await getRepository.save(user);
    sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "User successfully veried",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while trying to verified user",
    });
    return;
  }
};

//@register user
//@verified and non
//@api/user/sign-in
export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Required all fields",
      });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user || typeof user.password !== "string") {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    );
    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid credentials. Please try again.",
      });
    }

    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.status(200).cookie("token", token, cookiesOptions).json({
      success: true,
      message: "Successfully logged in",
      token: token,
      email: user?.email,
      role: user?.role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while trying to login:",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
//@get user profile
//@logged in user
//@/api/user/get-profile
export const getUserProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getRepository = AppDataSource.getRepository(User);
    const user = await getRepository.findOne({
      where: { id: req.user?.id },
      select: [
        "id",
        "role",
        "isVerified",
        "email",
        "name",
        "profilePicture",
        "verificationToken",
      ],
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//@logged in user
//@login user
//@api/user/logout
export const logoutUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).clearCookie("token", cookiesOptions).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }
};
//@forgot password
//@verified user
//@/api/user/forgot
export const forgotPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Missing user credentials.",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User is not registered!",
      });
      return;
    }
    // const resetToken = crypto.randomBytes(20).toString("hex"); // TODO share link
    // Generate reset token (6-digit OTP)
    const resetToken = Math.floor(100000 + Math.random() * 900000);
    user!.resetPasswordToken = resetToken;
    user!.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await userRepository.save(user!);
    sendPasswordResetEmail(user.email, resetToken);
    res.status(200).json({
      success: true,
      message: "Reset token generated successfully.",
      email: user?.email,
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

//@reset password
//@verified and non
//@api/user/reset-password
export const resetUserPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resetToken, password } = req.body;
    if (!resetToken) {
      res.status(400).json({
        success: false,
        message: "Reset Token missing",
      });
    }
    if (!password) {
      res.status(400).json({
        success: false,
        message: "Password missing",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: MoreThan(new Date()),
      },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
      return;
    }
    const isOldPassword = await bcrypt.compare(password, user!.password);

    if (isOldPassword) {
      res.status(400).json({ success: false, message: "Use new password" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user!.password = hashedPassword;
    user!.resetPasswordToken = null;
    user!.resetPasswordExpiresAt = null;

    await userRepository.save(user!);
    sendResetSuccessEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "New password set successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while trying to reset password",
    });
  }
};

//@upload user profile
//@verified user
//@api/user/update-profile
export const uploadImageCloudinaryToDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded!",
      });
      return;
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile",
    });
    const getRepository = AppDataSource.getRepository(User);
    const user = await getRepository.findOne({ where: { id: req.user?.id } });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Unauthorize",
      });
      return;
    }
    // Save image URL in database
    user!.profilePicture = result.secure_url;
    await getRepository.save(user!);
    // Delete local file after upload
    try {
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error("Error deleting local file:", error);
    }

    userProfileUploadWelcome(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully!",
      profilePicture: user!.profilePicture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while trying to upload image",
    });
    return;
  }
};
