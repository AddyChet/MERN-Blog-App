import React from "react";
import { ShimmerButton, ShimmerDiv } from "shimmer-effects-react";

const ShimmerForCategories = ({loading}) => {
  return (
    <div className="flex">
      <div className="">
        <ShimmerButton mode="light" loading={loading} className="p-3 rounded-full px-6"/> 
      </div>
    </div>
  )
}

export default ShimmerForCategories
