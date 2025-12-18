import { Router } from "express";
import { generateVideoControllerBase64 } from "../controller/video.controller.js";

const router=Router()

router.route("/").post(generateVideoControllerBase64)