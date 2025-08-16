"use client";

import dynamic from "next/dynamic";

const AnimationLottieInner = dynamic(() => import("./animation-lottie-inner"), {
  ssr: false,
});

const AnimationLottie = (props) => {
  return <AnimationLottieInner {...props} />;
};

export default AnimationLottie;
