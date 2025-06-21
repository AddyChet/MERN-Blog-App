import { FaArrowTrendUp } from "react-icons/fa6";
import { EditorContext } from "../context/EditorContext";
import { useContext } from "react";
import TrendingBlogCard from "./TrendingBlogCard";

const SideBar = () => {
  const {setBlogsFetched, pageState, setPageState, trendingBlogs} = useContext(EditorContext)
  console.log(trendingBlogs)
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

const handleCategoryFilter = (category) => {
  if (pageState === category) return; // ❌ prevent unnecessary state change

  if (category === "home") {
    setBlogsFetched(false); // ✅ allow fresh fetch when going *back* to home
  }

  setPageState(category);
};



  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-medium text-xl border-b border-gray-200 pb-3 mb-5">
            Stories from all interests
          </h1>

          <div className="flex gap-3 flex-wrap">
            {categories.map((category, i) => (
              <button
                onClick={() => handleCategoryFilter(category)}
                className="p-3 bg-gray-200 rounded-full px-6 capitalize text-xs"
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

          {trendingBlogs?.map((blog, i)=> (
            <TrendingBlogCard blog={blog} index={i}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
