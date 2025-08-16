// animation-lottie-inner.jsx
import Lottie from "lottie-react";

const AnimationLottieInner = ({ animationPath, width }) => {
    return (
        <Lottie
            loop={true}
            autoplay={true}
            animationData={animationPath}
            style={{ width: width || '95%' }}
        />
    );
};

export default AnimationLottieInner;
