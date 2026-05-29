import { useState, useEffect } from "react";
import { ClimbingBoxLoader, PropagateLoader } from "react-spinners";

const ChoosePop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Đăng ký sự kiện lăn chuột
    window.addEventListener("scroll", handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <ClimbingBoxLoader color="#36d7b7" />
      <h1 className="text-[#36d7b7] leading-loose">
        Đợi Chúng Mình Chút nhé !!
      </h1>
      <PropagateLoader
        color="#36d7b7"
        cssOverride={{}}
        loading
        size={15}
        speedMultiplier={1}
      />
    </div>
  );
};

export default ChoosePop;
