import React, { useState, useEffect } from "react";

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
    <div className="h-screen">
      <div className="box" style={{ top: `${scrollPosition}px` }}>
        AAAA
      </div>
    </div>
  );
};

export default ChoosePop;
