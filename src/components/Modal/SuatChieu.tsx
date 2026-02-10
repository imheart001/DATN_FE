import React, { useState } from "react";

import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
const ModalSuatChieu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Lịch Chiếu Phim"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <hr></hr>
        <p className="text-center text-2xl">Rạp beta Thanh Xuân</p>
        <div className="mt-2">
          <Link to={"#"}>
            <span className="text-xl ">17/10-T3</span>
          </Link>
          <Link to={"#"}>
            <span className="text-xl ml-6">20/10-T6</span>
          </Link>
          <Link to={"#"}>
            <span className="text-xl ml-8">21/10-T7</span>
          </Link>
          <hr />
        </div>
        <div className="mt-2">
          <span>2D Phụ Đề</span>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-2">
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
          <div>
            <Button className="">9:00</Button> <br></br>
            <p className="mt-2">122 ghế ngồi</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSuatChieu;
