import React from "react";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const LoadMoreData = ({ state }) => {
  const { fetchLatestBlogs } = useContext(EditorContext);
  const handleFetchData = async () => await fetchLatestBlogs(state.page + 1);
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
