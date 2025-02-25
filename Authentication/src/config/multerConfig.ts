import path from "path";
import multer, { StorageEngine } from "multer";
import { Request } from "express";
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
export const uploadSinglePhoto = upload.single("profilePicture");

// If the user uploads a file named "profilePic.png", file.fieldname alone might result in "profilePic", losing the .png extension.
