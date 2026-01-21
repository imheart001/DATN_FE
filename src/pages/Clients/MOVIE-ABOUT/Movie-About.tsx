import React from "react";

import { Link } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";
const Movie_About = () => {
  return (
    <div className=" text-center bg-primary">
      <section className=" text-secondary p-4 relative bg-[url(/HeadermvAB.png/)] bg-cover w-full bg-center bg-no-repeat">
        <Header />

        <h1 className="font-bold text-5xl leading-[73.2px]  text-white mt-[200px]">
          Oppenheimer
        </h1>
        <div className="flex justify-center text-[#8E8E8E] items-center ">
          <div className="flex space-x-5">
            <p className=" h-[21px] font-poppins font-normal text-base leading-5">
              Kịch
            </p>
            <p className=" h-[21px] font-poppins font-normal text-base leading-5">
              IMDB 8.6
            </p>
            <p className=" h-[21px] font-poppins font-normal text-base leading-5">
              13+
            </p>
          </div>
        </div>

        <p className="text-center text-white mt-[16px]">
          Câu chuyện về nhà khoa học người Mỹ, J. Robert Oppenheimer,
          <br /> và vai trò của ông trong việc phát triển bom nguyên tử.
        </p>

        <div className="flex justify-center  mt-[50px]">
          <Link
            to={"/book-ticket"}
            className="px-10 rounded-3xl bg-red-600  py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none  active:bg-red-500 sm:w-auto"
          >
            Đặt vé
          </Link>
          <Link to={"#"}>
            <div className="px-6 hover:bg-tertiary  border-tertiary text-white border p-2 rounded-[48px] ml-4 text-gray">
              Trailer
            </div>
          </Link>
        </div>
      </section>
      <body>
        <div className="items-center  mt-[200px] ">
          <h1 className="text-4xl font-bold text-white mb-[50px]">Tóm tắt</h1>
          <p className="text-center text-[#8E8E8E] mt-[20px] mb-[100px]">
            Câu chuyện về nhà khoa học người Mỹ, J. Robert Oppenheimer,
            <br /> và vai trò của ông trong việc phát triển bom nguyên tử.
          </p>
        </div>

        <div className="flex justify-center items-center  mt-[50px] ">
          <div>
            <h3 className="text-2xl font-bold text-white">Thể loại</h3>
            <p className="text-center text-[#8E8E8E] mt-[20px]">Kịch</p>
          </div>
          <div className=" ml-[50px]">
            <h3 className="text-2xl font-bold text-white">Khoảng thời gian</h3>
            <p className="text-center text-[#8E8E8E] mt-[20px]">3 giờ</p>
          </div>
          <div className=" ml-[50px]">
            <h3 className="text-2xl font-bold text-white">Giới hạn tuổi tác</h3>
            <p className="text-center text-[#8E8E8E] mt-[20px]">13+</p>
          </div>
          <div className=" ml-[50px]">
            <h3 className="text-2xl font-bold text-white">Đạo diện</h3>
            <p className="text-center text-[#8E8E8E] mt-[20px]">Christoper Nolan</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mt-[50px]">
          Dàn diễn viên
        </h1>

        <div className="flex justify-center items-center  mt-[15px]">
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob1.png/"}
              alt="Image 1"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Cillian Murphy
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">J. Robert Oppenheimer</p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob2.png/"}
              alt="Image 2"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Florence Pugh
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">Jean Tatlock</p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob3.png/"}
              alt="Image 3"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Robert Downey Jr.
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">Lewis Strauss</p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob4.png/"}
              alt="Image 4"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Rami Malek
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">David L. Hill</p>
          </div>
        </div>
        <p className="underline mt-[30px] text-secondary text-[#8E8E8E]">Xem thêm</p>
      </body>
    </div>
  );
};

export default Movie_About;
