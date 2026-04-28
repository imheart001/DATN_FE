import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";
import { useGetProductByIdQuery } from "../../../service/films.service";
import { IFilms } from "../../../interface/model";
import type { TabsProps } from "antd";
import {
  useFetchShowTimeQuery,
  useGetShowbyIdCinemaQuery,
} from "../../../service/show.service";
import { useSelector } from "react-redux";
import * as moment from "moment-timezone";
import { Button, Tabs, message } from "antd";
import { useFetchTimeQuery } from "../../../service/time.service";
import { useEffect, useState } from "react";
import { useGetChairEmpTyQuery } from "../../../service/chairs.service";
// import MovieTrailer from "../MovieTrailer/MovieTrailer";
const Movie_About = () => {
  const { id } = useParams();
  const { data: film, error, isLoading } = useGetProductByIdQuery(`${id}`);
  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const { data: dataShowbyIdCinema } =
    useGetShowbyIdCinemaQuery(selectedCinema);
  const { data: shows } = useFetchShowTimeQuery();
  console.log(shows);

  console.log(dataShowbyIdCinema);
  const showByFilm = dataShowbyIdCinema?.filter(
    (show: any) => show.film_id == id
  );
  console.log(showByFilm);

  const { data: dataChairEmpTy } = useGetChairEmpTyQuery();
  const [filmShows2, setFilmShows2] = useState<FilmShow[]>([]);
  const currentDateTime = moment()
    .utcOffset(420)
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const isToday2 = new Date(currentDateTime);
  const { data: times } = useFetchTimeQuery();
  interface FilmShow {
    date: string;
    times: any[];
  }
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth?.token);
  const showInfo: FilmShow[] = [];
  showByFilm?.forEach((showItem: any) => {
    const matchingShow = (shows as any)?.data?.find(
      (s: any) => s.id === showItem.show
    );

    if (matchingShow) {
      // Extract date and time information
      const showDate = moment(matchingShow.date).format("YYYY-MM-DD");
      const showTimeInfo = {
        id: matchingShow.id,
        date: showDate,
        time_id: matchingShow.time_id,
        film_id: matchingShow.film_id,
        room_id: matchingShow.room_id,
        created_at: matchingShow.created_at,
        updated_at: matchingShow.updated_at,
        deleted_at: matchingShow.deleted_at,
      };

      // Check if the date already exists in showInfo
      const existingDateIndex = showInfo.findIndex(
        (info) => info.date === showDate
      );

      if (existingDateIndex !== -1) {
        // Date already exists, add the time info to the existing date
        showInfo[existingDateIndex].times.push(showTimeInfo);
      } else {
        // Date doesn't exist, create a new entry in showInfo
        showInfo.push({
          date: showDate,
          times: [showTimeInfo],
        });
      }
    }
  });
  useEffect(() => {
    setFilmShows2(showInfo);
  }, []);

  const handleTimeSelection = (timeId: any) => {
    if (user) {
      // Đã đăng nhập, chuyển đến trang đặt vé
      navigate(`/book-ticket/${timeId}`);
    } else {
      message.warning("Bạn chưa đăng nhập!");
      navigate("/login");
    }
  };

  const getRealTime = (timeId: any) => {
    const timeInfo = (times as any)?.data.find(
      (time: any) => time.id == timeId
    );
    return timeInfo ? timeInfo.time : ""; // Lấy thời gian từ thông tin thời gian
  };

  const daysToDisplay = [isToday2];
  for (let i = 1; i <= 4; i++) {
    const nextDate = new Date(isToday2);
    nextDate.setDate(isToday2.getDate() + i);
    daysToDisplay.push(nextDate);
  }
  console.log(filmShows2);

  const today = new Date();
  const month = today.getMonth() + 1; //
  const currentDateTime2 = moment().utcOffset(420);
  const items: TabsProps["items"] = daysToDisplay?.map((date, index) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const show = filmShows2.find((show: any) => show.date === formattedDate);
    const isToday = formattedDate === isToday2.toISOString().slice(0, 10);

    const dayOfWeek = (today.getDay() + index) % 7;
    const dayNumber = date.getDate();
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayOfWeekLabel = daysOfWeek[dayOfWeek];
    const label = isToday
      ? "Hôm nay"
      : `${dayNumber}/${month}-${dayOfWeekLabel}`;

    // Sort the show times based on the time value
    if (show) {
      show.times.sort((a: any, b: any) => {
        const timeA = getRealTime(a.time_id);
        const timeB = getRealTime(b.time_id);
        return timeA.localeCompare(timeB);
      });
      show.times = show.times.filter((time: any) => {
        const showTime = getRealTime(time.time_id);
        const showDateTime = moment(
          show.date + "T" + showTime + "Z",
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        );
        return showDateTime.isAfter(currentDateTime2);
      });
    }
    let remainingShowIds: number[] = [];

    if (show) {
      // Bước 2 và 3: Lặp qua mảng show.times và thu thập ID của suất chiếu còn lại
      show.times.forEach((time: any) => {
        const showTime = getRealTime(time.time_id);
        const showDateTime = moment(
          show.date + "T" + showTime + "Z",
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        );

        if (showDateTime.isAfter(currentDateTime2)) {
          remainingShowIds.push(time.id);
        }
      });
    }

    return {
      key: formattedDate,
      label,
      children: (
        <div>
          {show && show?.times?.length > 0 ? (
            <div className="grid grid-cols-5 ">
              {show?.times?.map((time: any, timeIndex: number) => {
                // Lấy thông tin thời gian
                const showTime = getRealTime(time.time_id);

                if (dataChairEmpTy) {
                  const chairEmpty = dataChairEmpTy?.find(
                    (item: any) => item.id === time.id
                  );
                  return (
                    <div key={timeIndex} className="my-1 text-center">
                      <Button onClick={() => handleTimeSelection(time.id)}>
                        {showTime}
                      </Button>
                      <div className="">
                        {chairEmpty?.empty_chair} ghế trống
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            "Chưa cập nhật suất chiếu của ngày này"
          )}
        </div>
      ),
    };
  });
  console.log(showInfo);
  return (
    <div className="">
      <div className=" text-center bg-primary">
        {/* <section className=" text-secondary p-4 relative bg-[url(/HeadermvAB.png/)] bg-cover w-full bg-center bg-no-repeat"> */}
        <section
          className={`text-secondary p-4 h-screen relative bg-cover w-full bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${(film as any)?.data?.poster})` }}
        >
          <Header />
        </section>
        <body>
          <div className="items-center  mt-[70px] ">
            <h1 className="text-4xl font-bold text-white mb-[20px]">Tóm tắt</h1>
            <section>
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="relative  h-200 overflow-hidden rounded-lg sm:h-200 lg:order-last lg:h-full">
                    <img
                      alt="Party"
                      srcSet={(film as any)?.data.image}
                      className="bg-white  p-4 w-[70%]"
                    />
                  </div>

                  <div className="lg:py-24 flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl mt-4">
                      {(film as any)?.data.name}
                    </h2>

                    <p className="text-center text-white my-4">
                      THỜI LƯỢNG: {(film as any)?.data.time}
                    </p>

                    <p className="text-center text-white my-4">
                      NGÀY KHỞI CHIẾU :{" "}
                      {new Date(
                        (film as any)?.data.release_date
                      ).toLocaleDateString("en-GB")}
                    </p>

                    <p className="text-center text-white my-4">
                      MÔ TẢ: {(film as any)?.data.description}
                    </p>

                    {/* <div className="col-md-16 tab-style-1 margin-bottom-35">
                      <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                          16/10/2023
                        </button>

                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                          16/10/2023
                        </button>

                        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                          16/10/2023
                        </button>
                      </span>
                    </div> */}

                    <div className="flex justify-center mt-8">
                      <Link
                        to={"/book-ticket"}
                        className="px-10 rounded-3xl bg-red-600 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none active:bg-red-500 sm:w-auto"
                      >
                        Đặt vé
                      </Link>
                      <Link to={"#"}>
                        <div className="px-6 hover:bg-tertiary border-tertiary text-white border p-2 rounded-[48px] ml-4 text-gray">
                          Trailer
                        </div>
                      </Link>
                    </div>
                    <Tabs
                      className="bg-white pb-10 my-10 w-full px-4 rounded-lg"
                      defaultActiveKey="1"
                      items={items}
                    />
                  </div>
                </div>
              </div>
            </section>
            <h1 className="text-4xl font-bold text-white mb-[20px]">
              Movie Trailer
            </h1>
            <div className="mx-auto justify-center flex bg-[#3C3E4D] pt-20 p-10">
              <iframe
                className="w-[80%] h-screen"
                allowFullScreen
                src={`https://www.youtube.com/embed/${
                  (film as any)?.data.trailer
                }`}
                title=" Official Trailer "
                allow="autoplay"
              ></iframe>
            </div>
          </div>

          <p className="underline mt-[30px] text-secondary text-[#8E8E8E]">
            Xem thêm
          </p>
        </body>
      </div>
    </div>
  );
};

export default Movie_About;
