import { useState } from "react";
import SideBar from "./SideBar";
import NavigationInline from "../common/NavigationInline";
import AnimationWrapper from "../common/AnimationWrapper";
import { BsHeart } from "react-icons/bs";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import BlogCard from "./BlogCard";
import TrendingBlogCard from "./TrendingBlogCard";
import { Link } from "react-router";

const Body = () => {
  const { pageState } = useContext(EditorContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { blogs, trendingBlogs } = useContext(EditorContext);
  const con = pageState === "home" ? [pageState, "trending"] : [pageState];

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <AnimationWrapper>
      <div className="w-4/5 mx-auto">
        {/* Navigation */}
        <div className="flex w-full border-b border-gray-200">
          {con.map((e, i) => (
            <NavigationInline
              key={i}
              text={e}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* Main content and sidebar */}
        <div className="flex gap-5">
          <div className="flex-1">
            {con[activeIndex] === pageState ? (
              pageState === "home" ? (
                blogs === null ? (
                  <div>loading....</div>
                ) : (
                  blogs.map((blog, i) => (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <BlogCard index={i} blog={blog} />
                    </AnimationWrapper>
                  ))
                )
              ) : (
                <div className="flex flex-col justify-center items-center h-40 text-gray-400">
                  No content for “{pageState}”
                  <span>
                    Click to go back to{" "}
                    <button
                      className="text-gray-700 cursor-pointer"
                      onClick={handleReload}
                    >
                      Home
                    </button>
                  </span>
                </div>
              )
            ) : con[activeIndex] === "trending" && pageState === "home" ? (
              trendingBlogs === null ? (
                <div>loading....</div>
              ) : (
                trendingBlogs.map((blog, i) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <TrendingBlogCard blog={blog} index={i} />
                  </AnimationWrapper>
                ))
              )
            ) : null}
          </div>

          {/* sidebar */}
          <div className="min-w-[40%] lg:min-w-[340px] max-w-min border-l border-gray-200 pl-8 pt-3 hidden lg:block">
            <SideBar />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Body;
