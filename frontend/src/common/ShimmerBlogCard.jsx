import React from "react";
import { ShimmerDiv } from "shimmer-effects-react";
const ShimmerBlogCard = ({ loading }) => {
  return (
    <>
      <div className="p-4 rounded-md w-full space-y-4">
        {/* 👇 This part is your shimmer header row */}
        <div className="flex gap-2">
          <ShimmerDiv
            mode="light"
            className="w-6 h-6 rounded-full"
            loading={loading}
          />
          <ShimmerDiv mode="light" className="w-24" loading={loading} />
          <ShimmerDiv mode="light" className="w-24" loading={loading} />
        </div>

        <div className="flex justify-between ">
          <ShimmerDiv
            mode="light"
            className="w-4/5 h-24 rounded-md"
            loading={loading}
          />
          <ShimmerDiv
            mode="light"
            className="w-28 h-24 ml-4 hidden sm:block"
            loading={loading}
          />
        </div>

        <div className="flex gap-5">
          <ShimmerDiv
            mode="light"
            className="w-12 h-6 rounded-2xl"
            loading={loading}
          />
          <ShimmerDiv
            mode="light"
            className="w-6 h-6 rounded-full"
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ShimmerBlogCard;
