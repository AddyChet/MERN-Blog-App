import { useContext, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import { FilterPagination } from "../common/FilterPagination";

export const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const location = useLocation();
  const [blogs, setBlogs] = useState(null); // what we render now

  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const { user } = useContext(AuthContext);
  const [pageState, setPageState] = useState("home");
  const [loadingCategory, setLoadingCategory] = useState(true);
  console.log(pageState);
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

  const fetchLatestBlogs = async (page = 1) => {
    const latestRes = await axiosInstance.post("/blog/latest-blog", { page });

    const formattedData = await FilterPagination({
      state: blogs,
      data: latestRes?.data?.blogs,
      page,
      counteRoute: "/blog/all-latest-blogs-count",
      pageState: "home", // ✅ important
    });

    setBlogs(formattedData);
  };

  const fetchTrendingBlogs = async () => {
    const trendingRes = await axiosInstance.get("/blog/trending-blog");
    const trending = trendingRes?.data?.blogs || [];
    setTrendingBlogs(trending);
  };

  useEffect(() => {
    const path = location.pathname;

    const fetchData = async (page = 1) => {
      try {
        // If user is on /search/:query path and blogs haven't been fetched yet
        if (path.startsWith("/search/")) {
          const query = decodeURIComponent(path.split("/search/")[1]);
          console.log(query);
          if (query && !blogsFetched) {
            await fetchBlogByCategory(query);
            setBlogsFetched(true);
          }
        } else {
          // If on homepage or no data fetched, fetch latest blogs
          if (pageState === "home" && (blogs === null || !blogsFetched)) {
            await fetchLatestBlogs(page);
            setBlogsFetched(true);
          }

          // Always try to fetch trending blogs if not already fetched
          if (trendingBlogs === null) {
            await fetchTrendingBlogs();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCategory(false);
      }
    };

    if (user) {
      fetchData();
    }

    if (!user) {
      setBlogs(null);
      setTrendingBlogs(null);
      setBlogsFetched(false);
    }
  }, [user, pageState, blogsFetched, location.pathname]);

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
      setBlogs(null);
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

  const fetchBlogByCategory = async (tag, page = 1) => {
    try {
      const res = await axiosInstance.post("/blog/search-blogs", { page, tag });
      const filteredData = await FilterPagination({
        state: blogs,
        data: res?.data?.blogs,
        page,
        counteRoute: "/blog/search-blogs-count",
        dataToSend: { tag },
        pageState: tag,
      });

      setBlogs(filteredData);
    } catch (error) {
      toast.error("Could not fetch category blogs");
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
        setPageState,
        fetchBlogByCategory,
        loadingCategory,
        fetchLatestBlogs,
        setBlogsFetched,
        blogsFetched,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
