import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { z } from "zod";
import Blog from "../models/blog.model.js";
import { nanoid } from "nanoid";
import User from "../models/user.model.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, msg: "Image required" });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Optional cleanup
    // await fs.promises.unlink(req.file.path);

    return res.status(201).json({
      success: true,
      msg: "Image uploaded",
      image: { url, publicId },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const publishBlog = async (req, res) => {
  try {
    let { title, des, banner, content, tags, authorId, draft } = req.body;
    const userId = req.userId;

    // Always validate title
    const titleSchema = z
      .string()
      .min(1, { message: "Title is required" })
      .max(100, { message: "Title must be under 100 characters" });
    const titleResult = titleSchema.safeParse(title);

    if (!titleResult.success) {
      return res
        .status(403)
        .json({ error: [titleResult.error.errors[0].message] });
    }

    // If it's not a draft, validate the rest
    if (!draft) {
      const restSchema = z.object({
        des: z
          .string()
          .min(1, { message: "Description is required" })
          .max(200, { message: "200 characters only" }),
        banner: z.string().url({ message: "Banner must be a valid URL" }),
        content: z
          .array(z.any())
          .min(1, { message: "Blog Content cannot be empty" }),
        tags: z
          .array(z.string().min(1, { message: "Tag cannot be empty" }))
          .max(10, { message: "You can only add up to 10 tags" }),
      });

      const restResult = restSchema.safeParse({ des, banner, content, tags });

      if (!restResult.success) {
        const errorMessages = restResult.error.errors.map((err) => err.message);
        return res.status(403).json({ error: errorMessages });
      }
    }

    tags = tags.map((t) => t.toLowerCase());

    const blog_id =
      title
        .replace(/[^A-Za-z0-9]/g, "-")
        .trim()
        .toLowerCase() + nanoid();

    const blogData = {
      title,
      des,
      banner,
      content,
      tags,
      author: userId,
      blog_id,
      draft: Boolean(draft),
    };

    const createdBlog = await Blog.create(blogData);

    const incrementVal = draft ? 0 : 1;

    await User.findByIdAndUpdate(userId, {
      $inc: { "account_info.total_posts": incrementVal },
      $push: { blogs: createdBlog._id },
    });

    res.status(200).json({ id: createdBlog.blog_id });
  } catch (err) {
    console.error("Upload Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const latestBlog = async (req, res) => {
  try {
    const { page } = req.body;
    const maxLimit = 5;
    const blog = await Blog.find({ draft: false })
      .populate("author", "firstName lastName profile_pic -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit);

    return res.status(200).json({ blogs: blog });
  } catch (error) {
    console.error("latestBlog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const allLatestBlogs = async (req, res) => {
  try {
    const count = await Blog.countDocuments({ draft: false });
    return res.status(200).json({ totalDocs: count });
  } catch (error) {
    console.error("allLatestBlogs Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const trendingBlog = async (req, res) => {
  try {
    const maxLimit = 5;
    const blog = await Blog.find({ draft: false })
      .populate("author", "firstName lastName profile_pic -_id")
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title publishedAt -_id")
      .limit(maxLimit);

    return res.status(200).json({ blogs: blog });
  } catch (error) {
    console.error("latestBlog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const filterBlog = async (req, res) => {
  try {
    const maxLimit = 5;
    const { tag, page} = req.body;

    const blog = await Blog.find({ tags: tag, draft: false })
      .populate("author", "firstName lastName profile_pic -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit);

    return res.status(200).json({ blogs: blog });
  } catch (error) {
    console.error("filterBlog Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const filterBlogsCount = async (req, res) => {
  try {
    const {tag} = req.body;
    let findQuery = {tags : tag, draft : false};
    const count = await Blog.countDocuments(findQuery);
    return res.status(200).json({ totalDocs: count });
  } catch (error) {
    console.error("filterBlogsCount Error:", error);
    res.status(500).json({ error: error.message });
  }
};
