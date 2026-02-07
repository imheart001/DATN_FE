import React, { useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { Button, Modal } from 'antd';
import { Link } from "react-router-dom";

const Ticket: React.FC = () => {
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
    <>
      <section
        style={{
          backgroundImage: "url(/banner-ticket.jpg/)",
          opacity: "0.8",
        }}
        className="relative   bg-cover w-full bg-center bg-no-repeat"
      >
        <Header />

        <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
          <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
            Đặt vé chưa bao giờ dễ dàng đến thế!
          </h2>
          <p className="text-[#FFFFFF] mx-auto px-20 py-10">
            Mở khóa liền mạch thế giới phim ảnh! Đặt vé xem phim CGV một cách dễ
            dàng thông qua trang web thân thiện với người dùng của chúng tôi.
            Hành trình điện ảnh của bạn chỉ cách đó vài cú nhấp chuột!
          </p>
          <div className="flex justify-center  mt-[50px]">
            <Link
              to={"#"}
              className="px-10 rounded-3xl bg-red-600  py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none  active:bg-red-500 sm:w-auto"
            >
              Đặt vé theo phim
            </Link>
            <Link to={"#"}>
              <div className="px-6 hover:bg-tertiary  border-tertiary text-white border p-2 rounded-[48px] ml-4 text-gray">
                Đặt vé tại rạp
              </div>
            </Link>
          </div>
        </div>
      </section>
      <div className="boby mx-auto max-w-5xl mb-20 ">
        <div className=" my-[100px] flex justify-center items-center ">
          <span className="text-[#8E8E8E] mr-[20px] ">
            Tôi muốn xem một bộ phim ở
          </span>
          <select
            className="rounded-[40px] px-6 py-2  text-white hover: bg-red-600 "
            name=""
            id=""
          >
            <option className=" " value="">
              Hà Nội
            </option>
            <option className="" value="">
              Đà Nẵng
            </option>
            <option className="" value="">
              Thành Phố Hồ Chí Minh
            </option>
          </select>
        </div>
        <div className="book-ticket">
          <h2 className="font-bold mb-[34px] text-center text-[40px] text-[#FFFFFF]">
            Đặt phim
          </h2>
          <div className="grid grid-cols-4 gap-10">
            <div className="w-[245px] h-[488px]">

              <img srcSet="/mv1.png/ " alt="" className="rounded-2xl" />
              <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                Oppenheimer
              </h3>
              <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                <span>Drama</span>
                <span>IMDB 8.6</span>
                <span>13+</span>
              </div>
              <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">

                <Button type="primary" onClick={showModal}>
                  Mua vé
                </Button>
                <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                  </div>
                </Modal>
              </button>

            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv2.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Oppenheimer
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv3.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Mission: Impossi..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv4.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  The Moon
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv5.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Meg 2: The Trench
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv6.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Teenage Mutant..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv7.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Smugglers
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/mv8.png/ " alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Detective Conan:..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
                <button className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                  <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                        <Button className="" >9:00</Button> <br></br>
                        <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
                </button>
              </Link>
            </div>
          </div>
          <button className="mx-auto block mt-[150px]">
            <span>
              <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
            </span>
          </button>
        </div>
        <div className="book-cinema ">
          <h2 className="font-bold mb-[34px]  text-center mt-[66px] text-[40px] text-[#FFFFFF]">
            Chọn Rạp Chiếu
          </h2>
          <div className="cinemas md:grid md:grid-cols-2 md:gap-14">
            <div className="cinema w-[517px] h-[469px]">
              <img src="/book-cinema1.png/" alt="" />
              <div className="justify-between items-center mt-[10px] mb-5 flex">
                <span className="text-[26px] font-bold text-[#FFFFFF]">
                  Poins Mall
                </span>
                <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
              </div>
              <button className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                <Button type="primary" onClick={showModal}>
                  Mua vé
                </Button>
                <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                  </div>
                </Modal>
              </button>
            </div>
            <div className="cinema w-[517px] h-[469px]">
              <img src="/book-cinem2.png/" alt="" />
              <div className="justify-between items-center mt-[10px] mb-5 flex">
                <span className="text-[26px] font-bold text-[#FFFFFF]">
                  Poins Mall
                </span>
                <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
              </div>
              <button className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                <Button type="primary" onClick={showModal}>
                  Mua vé
                </Button>
                <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                  </div>
                </Modal>
              </button>
            </div>
            <div className="cinema w-[517px] h-[469px]">
              <img src="/book-cinema3.png/" alt="" />
              <div className="justify-between items-center mt-[10px] mb-5 flex">
                <span className="text-[26px] font-bold text-[#FFFFFF]">
                  Poins Mall
                </span>
                <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
              </div>
              <button className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              <Button type="primary" onClick={showModal}>
                    Mua vé
                  </Button>
                  <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                      <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                      </div>
                    </div>
                  </Modal>
              </button>
            </div>
            <div className="cinema w-[517px] h-[469px]">
              <img src="/book-cinema4.png/" alt="" />
              <div className="justify-between items-center mt-[10px] mb-5 flex">
                <span className="text-[26px] font-bold text-[#FFFFFF]">
                  Poins Mall
                </span>
                <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
              </div>
              <button className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
                <Button type="primary" onClick={showModal}>
                  Mua vé
                </Button>
                <Modal title="Lịch Chiếu Phim" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                    <div>
                      <Button className="" >9:00</Button> <br></br>
                      <p className="mt-2">122 ghế ngồi</p>
                    </div>
                  </div>
                </Modal>
              </button>
            </div>
          </div>
          <button className="mx-auto block mt-[150px]">
            <span>
              <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Ticket;
