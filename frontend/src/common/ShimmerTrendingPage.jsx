import { ShimmerDiv } from "shimmer-effects-react";
const ShimmerBlogCard = ({ loading }) => {
  return (
    <>
      <div className="rounded-md w-full space-y-4">
        {/* 👇 This part is your shimmer header row */}
        <div className="flex gap-3">
          <div>
            <ShimmerDiv
              mode="light"
              className="w-24 h-24 rounded-md"
              loading={loading}
            />
          </div>

          <div className="">
            <div className="flex gap-2 mb-3">
              {" "}
              <ShimmerDiv
                mode="light"
                className="w-24 h-4 rounded-md"
                loading={loading}
              />
              <ShimmerDiv
                mode="light"
                className="w-24 h-4 rounded-md"
                loading={loading}
              />
            </div>

                          <ShimmerDiv
                mode="light"
                className="w-full h-16 rounded-md"
                loading={loading}
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShimmerBlogCard;
