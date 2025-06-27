import React from "react";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const LoadMoreData = ({ state, pageState }) => {
  // console.log(state, state.pageState) //here pageState is programming
  const { fetchLatestBlogs, fetchBlogByCategory} =
    useContext(EditorContext);

    // console.log(pageState) //here page state is home
  const handleFetchData = async () => {
    pageState === "home"
      ? await fetchLatestBlogs(state.page + 1)
      : await fetchBlogByCategory(pageState, state.page + 1);
  };
  if (state !== null && state.totalDocs > state.results.length) {
    return (
      <button
        onClick={handleFetchData}
        className="text-gray-700 p-2 px-3 hover:bg-gray-700/30 rounded-md flex items-center gap-2"
      >
        Load More
      </button>
    );
  }
};

export default LoadMoreData;
