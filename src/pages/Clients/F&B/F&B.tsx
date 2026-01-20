import { Link } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";

const F_B = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: "url(/bannerFB.png/)",
          opacity: 0.8,
        }}
        className="relative   bg-cover w-full bg-center bg-no-repeat"
      >
        <Header />

        <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
          <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
            Nâng cao trải nghiệm xem phim của bạn với lựa chọn đồ ăn và đồ uống
            của chúng tôi!
          </h2>
          <p className="text-[#FFFFFF] mx-auto px-20 py-10">
            Đặt món trên website CGV và tận hưởng những phút giây xem phim với
            những miếng cắn ngon.
          </p>
          <Link
            to={"#"}
            className="px-10 rounded-3xl bg-red-600  py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none  active:bg-red-500 sm:w-auto"
          >
            Gọi món
          </Link>
        </div>
      </section>
      <div className="popcorn mx-auto max-w-5xl mb-20">
        <div className="space-x-[10px] text-center mt-[100px] mb-[60px]">
          <Link
            className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-3xl     py-3 px-5 focus:outline-none focus:bg-[#EE2E24] hover:bg-[##EE2E24]"
            to={"#"}
          >
            All
          </Link>
          <Link
            className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-3xl     py-3 px-5 focus:outline-none focus:bg-[#EE2E24] hover:bg-[##EE2E24]"
            to={"#"}
          >
            Food
          </Link>
          <Link
            className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-3xl     py-3 px-5 focus:outline-none focus:bg-[#EE2E24] hover:bg-[##EE2E24]"
            to={"#"}
          >
            Combo
          </Link>
          <Link
            className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-3xl     py-3 px-5 focus:outline-none focus:bg-[#EE2E24] hover:bg-[##EE2E24]"
            to={"#"}
          >
            Popcorn
          </Link>
          <Link
            className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-3xl     py-3 px-5 focus:outline-none focus:bg-[#EE2E24] hover:bg-[##EE2E24]"
            to={"#"}
          >
            Beverage
          </Link>
        </div>
        <div className="menu grid grid-cols-4 gap-7">
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop1.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Combo Solo
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop2.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Combo Duo
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>

          <div className="pop w-[246px] h-[384px]">
            <img src="/pop3.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Caramel Popcorn
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>

          <div className="pop w-[246px] h-[384px]">
            <img src="/pop4.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Salty Popcorn
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop5.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Mix Popcorn
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop6.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              CGV Sampler
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop7.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              French Fries
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
          <div className="pop w-[246px] h-[384px]">
            <img src="/pop8.png/" alt="" />
            <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
              Fried Fishball
            </h3>
            <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
              Rp.58,000
            </span>
            <button className="text-[#FFFFFF] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]">
              Đặt món
            </button>
          </div>
        </div>
        <button className="mx-auto mt-20 block mb-[67px]">
          <span>
            <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
          </span>
        </button>
      </div>
    </>
  );
};
export default F_B;
