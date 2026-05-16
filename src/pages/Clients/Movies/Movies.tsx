import Header from "../../../Layout/LayoutUser/Header";
import { useFetchProductQuery } from "../../../service/films.service";
import FilmShowing from "../../../components/FilmShowing";
import { IFilms } from "../../../interface/model";
import { compareDates, compareReleaseDate, formatDate } from "../../../utils";

import { useAppSelector } from "../../../store/hooks";

const Movies = () => {
  const { data } = useFetchProductQuery() as any;

  const movieReleases = data?.data.filter((item: any) => {
    const result = compareDates(item.release_date, item.end_date);
    return result;
  });

  const futureMovies = data?.data
    .filter((item: any) => {
      const result = compareReleaseDate(item.release_date);
      return result;
    })
    .filter((item1: any) => {
      const currentDate = new Date();
      const featureMovieDate = new Date();
      const releaseDate = new Date(item1.release_date);
      featureMovieDate.setDate(currentDate.getDate() + 300);
      if (featureMovieDate > releaseDate) {
        return item1;
      }
    });

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
            {movieReleases &&
              movieReleases.map((film: IFilms, index: number) => (
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
            {futureMovies &&
              futureMovies.map((film: IFilms, index: number) => (
                <FilmShowing key={index} data={film} />
              ))}
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
