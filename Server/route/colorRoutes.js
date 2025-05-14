import express from "express";
import {
  getColorOptions,
  createColorOption,
} from "../controller/colorController.js";

const router = express.Router();

router.route("/").get(getColorOptions).post(createColorOption);
export default router;
