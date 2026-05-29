import "../../../index.css";
import Header from "../../../Layout/LayoutUser/Header";
const TicketBookingDetails = () => {
  return (
    <div className="text-white">
      <Header />

      <section className="flex items-center justify-center col-span-1 mt-5">
        <div className="bg-[#140808] space-y-2 rounded-lg px-4 py-10 shadow-lg ">
          <img
            src="https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f10%2f384512522%2D860973838723843%2D7797595519513200784%2Dn%2Dcopy%2D103620%2D101023%2D46.jpg"
            alt=""
            className="block mx-auto w-[257.5px] shadow-lg  rounded-2xl h-[407px]"
          />
          <div className="w-full text-center space-y-2">
            <h2 className="text-3xl font-bold  sm:text-4xl mt-4">
              {" "}
              Spider-Man: No Way Home
            </h2>

            <p className="mt-1.5 text-lg font-medium ">MÃ VÉ: 1</p>
            <p className="mt-1.5 text-lg font-medium ">
              {" "}
              Phòng Chiếu: Cinema 1
            </p>
            <p className="mt-1.5 text-lg font-medium ">Rạp Chiếu: Screen 1</p>
            <p className="mt-1.5 text-lg font-medium "> Ghế: A1, A5</p>
            <p className="mt-1.5 text-lg font-medium ">
              Ngày chiếu: 22-10-2023
            </p>
            <p className="mt-1.5 text-lg font-medium ">
              {" "}
              Thời gian chiếu: 10:00 AM
            </p>
            <p className="mt-1.5 text-lg font-medium ">Đồ ăn: Coca cola</p>
            <p className="mt-1.5 text-lg font-medium ">
              {" "}
              Thời gian thanh toán: 22-10-2023 08:12 AM
            </p>
            <p className="mt-1.5 text-lg font-medium ">
              {" "}
              Tổng tiền: 150.000 VNĐ
            </p>
          </div>
          <form className="mt-5 ">
            <button className="block w-500 mx-auto rounded border border-[#EE2E24] bg-[#EE2E24] p-4 text-sm font-medium transition hover:scale-105">
              123 Main st
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default TicketBookingDetails;
