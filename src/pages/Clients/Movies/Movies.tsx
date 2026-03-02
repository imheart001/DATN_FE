import Header from "../../../Layout/LayoutUser/Header";
import { useFetchProductQuery } from "../../../service/films.service";
import FilmShowing from "../../../components/FilmShowing";
import { IFilms } from "../../../interface/model";
import { compareDates, compareReleaseDate } from "../../../utils";
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
      featureMovieDate.setDate(currentDate.getDate() + 10);
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
          <div>
            <div>
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px]"
              >
                <option value="">Tìm kiếm</option>
                <option value="JM">John Mayer</option>
                <option value="SRV">Stevie Ray Vaughn</option>
                <option value="JH">Jimi Hendrix</option>
                <option value="BBK">B.B King</option>
                <option value="AK">Albert King</option>
                <option value="BG">Buddy Guy</option>
                <option value="EC">Eric Clapton</option>
              </select>
            </div>
          </div>
          <div>
            <select
              name="HeadlineAct"
              id="HeadlineAct"
              className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px] ml-[50px]"
            >
              <option value="">Rạp</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div>
            <select
              name="HeadlineAct"
              id="HeadlineAct"
              className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px] ml-[100px]"
            >
              <option value="">Giờ chiếu</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div>
            <select
              name="HeadlineAct"
              id="HeadlineAct"
              className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px] ml-[150px]"
            >
              <option value="">Ngày xem</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </select>
          </div>
          <div> <a
              className="inline-block rounded bg-indigo-600 px-12 py-4 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 ml-[210px] mt-2"
              href="/login"
            >
              Mua Vé
            </a>
          </div>
        </div>
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
