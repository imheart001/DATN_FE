


const CSKH = () => {
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
      <div className="bg-gray-800 text-white py-4 shadow-lg">
        <div className="">
          <img className="mx-auto" src="banner-ticket.jpg" alt="" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-gray-200 w-full max-w-5xl p-6 md:p-12">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Thông tin vé xem phim
          </h1>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Mã vé</p>
            <p className="text-lg font-medium text-gray-900 mb-2">WTT2CLN</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Phim</p>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Địa đàng sụp đổ
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Rạp</p>
            <p className="text-lg font-medium text-gray-900 mb-2">
              BHD Star Discovery
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Suất chiếu</p>
            <p className="text-lg font-medium text-gray-900 mb-2">
              20:30, 03/09/2023
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Ghế</p>
            <p className="text-lg font-medium text-gray-900 mb-2">H05</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Giá vé</p>
            <p className="text-lg font-medium text-gray-900 mb-2">95.000₫</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Tổng Tiền</p>
            <p className="text-lg font-medium text-gray-900 mb-2">95.000₫</p>
          </div>
          <div className="flex justify-end">
            <a href="#" className="bg-gray-500 text-white py-2 px-4 rounded"
              >In vé</a   >
          </div>
        </div>
      </div>

      <footer className="text-white py-4">
        <div className="ml-[180px]">
          <p className="text-2xl font-bold">Lưu ý và note:</p> 
          <span className="mt-4"
            >Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát,
            quận Hoàng Mai, thành phố Hà Nội</span>

        </div>
      </footer>

    </body>
   
  );
};

export default CSKH;
