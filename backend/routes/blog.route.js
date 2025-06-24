import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImage, publishBlog,latestBlog, trendingBlog, filterBlog, allLatestBlogs } from "../controllers/blog.controller.js";
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
router.post("/blog/latest-blog",authMiddleware, latestBlog )
router.get("/blog/trending-blog", trendingBlog )
router.post("/blog/search-blogs", authMiddleware, filterBlog )
router.post("/blog/all-latest-blogs-count", authMiddleware, allLatestBlogs)

export default router;
