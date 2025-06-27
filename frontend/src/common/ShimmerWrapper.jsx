import { ShimmerDiv } from "shimmer-effects-react";

const ShimmerWrapper = ({ className }) => {
  return <ShimmerDiv className={className} loading={true} mode="light" />;
};

export default ShimmerWrapper;
