import { FaArrowTrendUp } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { EditorContext } from "../context/EditorContext";
import { useContext, useMemo, useState } from "react";
import TrendingBlogCard from "./TrendingBlogCard";
import AnimationWrapper from "../common/AnimationWrapper";
import DisplayNone from "../common/DisplayNone";
import ShimmerTrendingPage from "../common/ShimmerTrendingPage";
import ShimmerForCategories from "../common/ShimmerForCategories";
import { ShimmerDiv } from "shimmer-effects-react";

const SideBar = () => {
  const {
    setBlogs,
    pageState,
    setPageState,
    trendingBlogs,
    fetchBlogByCategory,
    loadingCategory,
    fetchLatestBlogs,
  } = useContext(EditorContext);

  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    "programming",
    "hollywood",
    "film-making",
    "social media",
    "cooking",
    "tech",
    "finances",
    "travel",
  ];

  const handleCategoryFilter = async (category) => {
    if (pageState === category) {
      setPageState("home");
      setActiveCategory(null);
      setBlogs(null);
      return;
    }

    setActiveCategory(category);
    setPageState(category);

    await fetchBlogByCategory(category); // this will call setBlogs with new category data
  };

  const memoizedTrendingSection = useMemo(() => {
    if (!trendingBlogs || trendingBlogs.length === 0) {
      return <DisplayNone message={"No Trending Blogs"} />;
    }

    return trendingBlogs.map((blog, i) => (
      <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
        <TrendingBlogCard blog={blog} index={i} isSidebar={true} />
      </AnimationWrapper>
    ));
  }, [trendingBlogs]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-medium text-xl border-b border-gray-200 pb-3 mb-5">
            {loadingCategory ? (
              <ShimmerDiv
                mode="light"
                className="h-8 w-3/4 rounded-md"
                loading={loadingCategory}
              />
            ) : (
              "Stories from all interests"
            )}
          </h1>

          <div className="flex gap-3 flex-wrap">
            {loadingCategory
              ? [...Array(8)].map((_, i) => (
                  <ShimmerForCategories key={i} loading={loadingCategory} />
                ))
              : categories.map((category, i) => (
                  <button
                    onClick={() => handleCategoryFilter(category)}
                    className={`p-3 rounded-full px-6 capitalize text-xs cursor-pointer hover:scale-105 transition duration-200 ${
                      activeCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    key={i}
                  >
                    {category}
                  </button>
                ))}
          </div>
        </div>

        <div>
          <h1 className="font-medium text-xl mb-8 flex gap-2 items-center">
            Trending <FaArrowTrendUp className="text-gray-400" />
          </h1>

          {loadingCategory ? (
            <ShimmerTrendingPage loading={loadingCategory} />
          ) : (
            memoizedTrendingSection
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
