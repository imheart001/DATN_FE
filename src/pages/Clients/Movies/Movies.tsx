import Header from "../../../Layout/LayoutUser/Header";
import { useFetchProductQuery } from "../../../service/films.service";
import FilmShowing from "../../../components/FilmShowing";
import { IFilms } from "../../../interface/model";
import { compareDates, compareReleaseDate, formatDate } from "../../../utils";
import { Button, Form, Select } from "antd";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { useFetchShowTimeQuery } from "../../../service/show.service";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
const Movies = () => {
  const { data } = useFetchProductQuery() as any;
  console.log("🚀 ~ file: Movies.tsx:13 ~ Movies ~ data:", data)
  const { data: dataCinemas } = useFetchCinemaQuery() as any;
  const { data: dataTimes } = useFetchShowTimeQuery() as any;
  console.log("🚀 ~ file: Movies.tsx:16 ~ Movies ~ dataTimes:", dataTimes)
  const navigate = useNavigate();

  const movieReleases = data?.data.filter((item: any) => {
    const result = compareDates(item.release_date, item.end_date);
    return result;
  });

  const user = useAppSelector((state: any) => state.auth?.token);

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

  const onFinishForm = (value: any) => {
    if (user) {
      // Đã đăng nhập, chuyển đến trang đặt vé
      const arraysFilm = dataTimes?.data?.filter((dateTime: any) => dateTime.film_id === value.nameMovie)
      console.log("🚀 ~ file: Movies.tsx:45 ~ onFinishForm ~ arraysFilm:", arraysFilm)
      navigate(`/book-ticket/${arraysFilm[0].id}`);
    } else {
      // Chưa đăng nhập, chuyển đến trang đăng nhập
      navigate("/login");
    }
  };

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
        <Form
          className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8"
          onFinish={onFinishForm}
        >
          <div>
            <div>
              <Form.Item name="nameMovie">
                <Select placeholder="chọn tên phim">
                  {data &&
                    data?.data &&
                    data?.data.map((item: any) => (
                      <Select.Option value={item.id} key={item.id}>
                        {" "}
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
                {/* <select className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px]"> */}
                {/* {data &&
                    data?.data &&
                    data?.data.map((item: any) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))} */}
                {/* </select> */}
              </Form.Item>
            </div>
          </div>
          <div>
            {/* <select
              name="cinema"
              id="HeadlineAct"
              className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px] ml-[50px]"
            >
              {dataCinemas &&
                dataCinemas?.data.map((cinema: any) => (
                  <option value={cinema.id} key={cinema.id}>
                    {cinema.name}
                  </option>
                ))}
            </select> */}
            <Form.Item name="cinema">
              <Select placeholder="chọn rạp phim">
                {dataCinemas &&
                  dataCinemas?.data &&
                  dataCinemas?.data.map((cinema: any) => (
                    <Select.Option value={cinema.id} key={cinema.id}>
                      {cinema.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
          {/* <div>
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
          </div> */}
          <div>
            {/* <select
              name="time"
              id="HeadlineAct"
              className="mt-2 w-[250px] rounded-lg border-gray-300 text-gray-700 sm:text-sm h-[50px] ml-[150px]"
            >
              {dataTimes &&
                dataTimes?.data.map((dateItem: any) => (
                  <option value={dateItem.id} key={dateItem.id}>
                    {dateItem.date}
                  </option>
                ))}
            </select> */}
            <Form.Item name="time">
              <Select placeholder="chọn ngày phát hành phim">
                {dataTimes &&
                  dataTimes?.data &&
                  dataTimes?.data.map((dateItem: any) => (
                    <Select.Option value={dateItem.id} key={dateItem.id}>
                      {dateItem.date}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
          <Button
            htmlType="submit"
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 "
          >
             Mua Vé
          </Button>
        </Form>
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
