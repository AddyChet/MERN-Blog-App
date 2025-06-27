import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationInline from "../common/NavigationInline";
import { EditorContext } from "../context/EditorContext";
import { ImSpinner8 } from "react-icons/im";
import AnimationWrapper from "../common/AnimationWrapper";

import BlogCard from "./BlogCard";
import LoadMoreData from "../common/LoadMoreData";

const SearchPage = () => {
  const { query } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const { blogs, pageState, setPageState } = useContext(EditorContext);
  const con = [`Search results for ${query}`, "Accounts Matched"];
  useEffect(() => {
    setPageState(query);
  }, [query]);
  return (
    <section className="min-h-[calc(100vh-80px)] w-4/5 mx-auto">
      <div className="flex flex-col w-full ">
        <div className="flex border-b border-gray-200">
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

        <div className="flex gap-5">
          <div className="flex-1">
            {activeIndex === 0 ? (
              blogs === null ? (
                <div className="flex justify-center  mt-10">
                  <ImSpinner8 size={30} className="animate-spin" />
                </div>
              ) : blogs?.results?.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No blogs for “{query}”
                </div>
              ) : (
                <>
                  {blogs?.results?.map((blog, i) => (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <BlogCard index={i} blog={blog} />
                    </AnimationWrapper>
                  ))}
                  <LoadMoreData state={blogs} pageState={pageState} />
                </>
              )
            ) : (
              <div>No Users matched</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
