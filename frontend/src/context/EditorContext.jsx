import { useContext, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [blogs, setBlogs] = useState(null)
  const [trendingBlogs, setTrendingBlogs] = useState(null)
  const { user } = useContext(AuthContext);
  const [pageState, setPageState] = useState("home")

  const blogStructure = {
    title: "",
    banner: null,
    content: [],
    tags: [],
    des: "",
    author: {},
  };

  const [blogState, setBlogState] = useState(blogStructure);
  const [blogsFetched, setBlogsFetched] = useState(false);


useEffect(() => {
  const fetchData = async () => {
    try {
      const [latestRes, trendingRes] = await Promise.all([
        axiosInstance.get("/blog/latest-blog"),
        axiosInstance.get("/blog/trending-blog")
      ]);

      const latest = latestRes?.data?.blogs || [];
      const trending = trendingRes?.data?.blogs || [];

      setBlogs(latest);
      setTrendingBlogs(trending);
      setBlogsFetched(true); // ✅ prevent redundant fetches
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching blogs.");
    }
  };

  if (pageState === "home" && !blogsFetched) {
    fetchData();
  }
  console.log("hello")
}, [pageState, blogsFetched]);



  const uploadBanner = async (image) => {
    const formData = new FormData();
    formData.set("image", image);

    const toastId = toast.loading("Uploading image...");

    try {
      const res = await axiosInstance.post("/blog/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = res.data?.image?.url;

      if (imageUrl) {
        setBlogState((prev) => ({ ...prev, banner: imageUrl }));
        toast.update(toastId, {
          render: "Image uploaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.update(toastId, {
          render: "Upload failed: No image URL returned",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Image upload failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      console.error("Upload error:", error);
    }
  };

  const publishBlog = async (obj) => {
    const toastId = toast.loading("Publishing...");
    try {
      const res = await axiosInstance.post("/blog/create-blog", obj);
      if (res.status === 200 || res.status === 201) {
        toast.update(toastId, {
          render: "Blog Published! ✌🏻",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.update(toastId, {
          render: "Upload failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      setBlogState(blogStructure);

      // ✅ Force re-fetch blogs
      setBlogsFetched(false);  
    } catch (error) {
      if (error.response?.data?.error) {
        error.response.data.error.map((e) => toast.error(e));
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const publishDraft = async (obj) => {
    const toastId = toast.loading("Saving...");
    try {
      const res = await axiosInstance.post("/blog/create-blog", obj);
      if (res.status === 200 || res.status === 201) {
        toast.update(toastId, {
          render: "Draft Saved! ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.update(toastId, {
          render: "Error: Draft was not saved! ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      setBlogState(blogStructure);
    } catch (error) {
      if (error.response?.data?.error) {
        error.response.data.error.map((e) => toast.error(e));
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <EditorContext.Provider
      value={{
        editorState,
        setEditorState,
        setBlogState,
        blogState,
        textEditor,
        setTextEditor,
        uploadBanner,
        publishBlog,
        publishDraft,
        blogs,
        trendingBlogs,
        setBlogs,
        pageState,
        setPageState
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
