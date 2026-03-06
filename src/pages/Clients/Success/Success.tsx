import { Row, Col } from "antd";

const Success = () => {
  return (
    <body className="bg-black mx-auto ">
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="flex  items-center">
          <h1 className="text-2xl font-bold mx-auto">
            Quý khách đã mua vé xem phim thành công qua ứng dụng ví điện tử
            VNpay, vui lòng kiểm tra đặt vé dưới đây
          </h1>
        </div>
      </header>
      <div className="bg-gray-800 text-white  shadow-lg">
        <div className="">
          <img className="mx-auto" src="banner-ticket.jpg" alt="" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl text-white mt-6">Địa Đàng Sụp Đổ(T16)</h1>
        <span className="text-xl text-cyan-400 mt-4">BHD Star Discovery</span>
        <p className="text-xl text-white mt-2 ">
          Tầng 8.TMM Discovery-302 Cầu Giấy , Hà Nội
        </p>
      </div>
      <div className="text-center border  max-w-5xl mx-auto mt-6">
        <Row>
          <Col className="text-2xl text-white mt-8" span={18} push={6}>
            Phòng Chiếu(HALL): <br />
            <p className="font-bold mt-2">Screen 1</p>
            Ghế(SEAT): <br />
            <p className="font-bold mt-2">H05</p>
            Thời gian thanh toán (Payment Time): <br />
            <p className="font-bold">03/09/2023 | 20:30:00</p>
            <p className="mt-2">Tổng Tiền: 95.000đ</p>
            <p className="mt-2">Số tiền thanh toán:</p>
            <p className="text-red-500"> 95.000đ</p>
          </Col>
          <Col className="text-2xl text-white mt-24 " span={6} pull={18}>
            Mã Vé(RESERVATION) <br />
            <p className="text-red-500 font-bold mt-2">WTT2CLN</p>
            Suất Chiếu(SESSION) <br />
            <p className="font-bold mt-2">03/09/2023 | 20:30:00</p>
          </Col>
        </Row>
        <div className="flex justify-end">
          <a href="#" className="bg-gray-500 text-white py-2 px-4 rounded">
            In vé
          </a>
        </div>
      </div>

      <footer className="text-white py-4 mt-8 ">
        <div className="ml-[180px]">
          <p className="text-2xl font-bold">Lưu ý và note:</p>
          <span className="mt-4">
            Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát,
            quận Hoàng Mai, thành phố Hà Nội
          </span>
        </div>
      </footer>
    </body>
  );
};

export default Success;
