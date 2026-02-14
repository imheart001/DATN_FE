import React from "react";
import { PacmanLoader } from "react-spinners";
import Header from "../../Layout/LayoutUser/Header";

const Loading = () => {
  return (
    <div className="text-5xl max-w-6xl text-white flex mx-auto space-x-10 text-center">
      <h2>Đang Load </h2>
      <PacmanLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
