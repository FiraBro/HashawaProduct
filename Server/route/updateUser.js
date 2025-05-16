import express from "express";
import {
  updateMe,
  uploadPhoto,
  userPhotoResize,
  Protect,
} from "../controller/authController.js";
const userRouter = express.Router();

userRouter.patch("/updateMe", Protect, uploadPhoto, userPhotoResize, updateMe);
export default userRouter;
