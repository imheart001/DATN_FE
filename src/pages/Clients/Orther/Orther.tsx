import Header from "../../../Layout/LayoutUser/Header";

const Orther = () => {
  return (
    <div className="bg-zinc-900">
      <section className="relative bg-[url(https://www.pumzithefilm.com/wp-content/uploads/2023/08/film2.jpg)] bg-cover w-full bg-center bg-no-repeat">
        <Header />
        <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
          <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
            Chúng tôi nghe thấy bạn!
          </h2>
          <p className="text-[#FFFFFF] mx-auto px-20 py-10">
            Sự hài lòng của bạn, Ưu tiên của chúng tôi: Dịch vụ khách hàng cho
            trải nghiệm rạp chiếu phim của bạn
          </p>
        </div>
      </section>
      <div className="">
        <div className="w-[950px] mx-auto py-[50px] text-center ">
          <p className="text-white font-bold text-[40px]">
            Trang Web Của Chúng Tôi
          </p>
          <p className="text-[#8E8E8E]">
            CGV Việt Nam hội nhập, hài hòa và góp phần tạo nên khái niệm độc đáo
            về việc chuyển đổi cụm rạp chiếu phim truyền thống thành tổ hợp văn
            hóa “Cultureplex”, nơi khán giả không chỉ đến để thưởng thức điện
            ảnh đa dạng thông qua các công nghệ tiên tiến như SCREENX, IMAX,
            STARIUM, 4DX, Dolby Atmos, mà còn để thưởng thức ẩm thực hoàn toàn
            mới và khác biệt với các trải nghiệm dịch vụ chất lượng nhất tại Cụm
            Rạp Chiếu Phim CGV Cinemas.
          </p>
          <iframe className="text-center mx-auto"   
            width="1470"
            height="600"
            src="https://www.youtube.com/embed/HyuykY4fOxA" 
            title="Embedded Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button className="rounded-[40px] font-[500] text-white bg-[#EE2E24] w-[125px] h-[45px] mt-[25px] ">
            Đọc Thêm
          </button>
        </div>
        <div className="w-[950px] mx-auto py-[50px] text-center ">
          <p className="text-white font-bold text-[40px]">
            Trang Web Của Chúng Tôi
          </p>
          <p className="text-[#8E8E8E]">
            PT. Graha Layar Prima, Tbk, còn được gọi là Rạp chiếu phim CJ CGV
            (trước đây gọi là Blitz Megaplex), là chuỗi rạp chiếu phim nổi tiếng
            ở Indonesia, được thành lập lần đầu tiên vào năm 2004. Nó vận hành
            rạp chiếu đầu tiên tại Paris Van Java, Bandung vào năm 2006.
          </p>
          <button className="rounded-[40px] font-[500] text-white bg-[#EE2E24] w-[125px] h-[45px] mt-[25px] ">
            Đọc Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orther;
