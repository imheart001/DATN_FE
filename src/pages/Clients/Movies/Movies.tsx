import { Link } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";
import { useFetchProductQuery } from "../../../service/films.service";
import FilmShowing from "../../../components/FilmShowing";
import { IFilms } from "../../../interface/model";

const Movies = () => {
  const { data } = useFetchProductQuery() as any;
  console.log(data);

  return (
    <>
      <section
        style={{
          backgroundImage: "url(/bannerMovie.png/)",
          opacity: "0.8",
        }}
        className="relative   bg-cover w-full bg-center bg-no-repeat"
      >
        <Header />

        <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
          <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
            Trải nghiệm thế giới phim ảnh!
          </h2>
          <p className="text-[#FFFFFF] mx-auto px-20 py-10">
            Nơi cảm xúc trở nên sống động, những câu chuyện vận chuyển bạn và
            trí tưởng tượng không có giới hạn. Hãy tham gia cuộc phiêu lưu ngay
            hôm nay và để điều kỳ diệu xuất hiện trên màn ảnh!
          </p>
        </div>
      </section>
      <section className="max-w-5xl  my-10  mx-auto ">
        <div className="movie now playing">
          <h1 className="text-[#FFFFFF] mb-[34px] mt-[66px] mx-auto text-center text-[41px] font-bold">
            Đang chiếu
          </h1>
          <div className="grid grid-cols-4 gap-7">
            {(data as any)?.data.map((film: IFilms, index: number) => (
              <FilmShowing key={index} data={film} />
            ))}
          </div>
          <button className="mx-auto block mb-[67px]">
            <span>
              <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
            </span>
          </button>
        </div>
        <div className="movie upcoming">
          <h1 className="text-[#FFFFFF] mb-[34px] mt-[66px] mx-auto text-center text-[41px] font-bold">
            Sắp chiếu
          </h1>
          <div className="grid grid-cols-4 gap-7">
            <div className="w-[245px] h-[420px]">
              <Link to={"/"}>
                <img srcSet="/upmv1.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Last Voyage of th..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Drama</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv2.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Gran Turismo
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv3.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Strays
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv4.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Catatan Si Boy
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv5.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Blue Beetle
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv6.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Kisah Tanah Jaw..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv7.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Concrete Utopia
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
            <div className="w-[245px] h-[420px]">
              <Link to={"#"}>
                <img srcSet="/upmv8.png/ 1.2x" alt="" className="rounded-2xl" />
                <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                  Puspa Indah Tam..
                </h3>
                <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                  <span>Comedy</span>
                  <span>IMDB 8.6</span>
                  <span>13+</span>
                </div>
              </Link>
            </div>
          </div>
          <button className="mx-auto block mb-[67px]">
            <span>
              <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
            </span>
          </button>
        </div>
      </section>
    </>
  );
};
export default Movies;
