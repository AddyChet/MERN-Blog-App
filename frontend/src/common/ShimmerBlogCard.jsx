import React from "react";
import ShimmerWrapper from "./ShimmerWrapper";

const ShimmerBlogCard = () => {
  return (
    <div className="p-4 rounded-md w-full space-y-4">
      {/* Header Row */}
      <div className="flex gap-2">
        <ShimmerWrapper className="w-6 h-6 rounded-full" />
        <ShimmerWrapper className="w-24" />
        <ShimmerWrapper className="w-24" />
      </div>

      {/* Main Blog Area */}
      <div className="flex justify-between">
        <ShimmerWrapper className="w-4/5 h-24 rounded-md" />
        <ShimmerWrapper className="w-28 h-24 ml-4 hidden sm:block" />
      </div>

      {/* Footer Row */}
      <div className="flex gap-5">
        <ShimmerWrapper className="w-12 h-6 rounded-2xl" />
        <ShimmerWrapper className="w-6 h-6 rounded-full" />
      </div>
    </div>
  );
};

export default ShimmerBlogCard;
