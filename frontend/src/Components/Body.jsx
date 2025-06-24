import { useState } from "react";
import SideBar from "./SideBar";
import NavigationInline from "../common/NavigationInline";
import AnimationWrapper from "../common/AnimationWrapper";
import ShimmerBlogCard from "../common/ShimmerBlogCard";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import BlogCard from "./BlogCard";
import TrendingBlogCard from "./TrendingBlogCard";

import { ImSpinner8 } from "react-icons/im";
import LoadMoreData from "../common/LoadMoreData";

const Body = () => {
  const { pageState } = useContext(EditorContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { blogs, trendingBlogs} = useContext(EditorContext);
  const con = pageState === "home" ? [pageState, "trending"] : [pageState];

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
              blogs === null ? (
                <div>
                  {[...Array(5)].map((_, i) => (
                    <ShimmerBlogCard key={i} loading={true} />
                  ))}
                </div>
              ) : blogs.results.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No blogs for “{pageState}”
                </div>
              ) : (
                <>
                  {blogs.results?.map((blog, i) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <BlogCard index={i} blog={blog} />
                  </AnimationWrapper>
                  
                ))}
                <LoadMoreData state={blogs} /> 
                </>

              )
              
            ) : con[activeIndex] === "trending" && pageState === "home" ? (
              trendingBlogs === null ? (
                <div className="flex justify-center mt-10">
                  <ImSpinner8 size={30} className="animate-spin" />
                </div>
              ) : (
                // <DisplayNone message={"No Trending Blogs"}/>
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
