import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImage, publishBlog } from "../controllers/blog.controller.js";
import { multerMiddleware } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

//
router.post(
  "/blog/uploadImage",
  authMiddleware,
  multerMiddleware.single("image"),
  uploadImage
);

router.post("/blog/create-blog", authMiddleware, publishBlog)

export default router;
