import { useMemo, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { Button, Modal, Tabs, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  useAVG_FilmsQuery,
  useFetchProductQuery,
} from "../../../service/films.service";
import {
  useFetchShowTimeQuery,
  useGetShowbyIdCinemaQuery,
} from "../../../service/show.service";

import { useSelector } from "react-redux";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import type { TabsProps } from "antd";
import Marquee from "react-fast-marquee";
import { Alert } from "antd";
import * as moment from "moment-timezone";
import { useGetAllCateDetailByFilmQuery } from "../../../service/catedetail.service";
import { useGetChairEmpTyQuery } from "../../../service/chairs.service";
import Loading from "../../../components/isLoading/Loading";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import dayjs from "dayjs";

const Ticket: React.FC = () => {
  const { data: films, isLoading: filmsLoading } = useFetchProductQuery();
  const { data: shows, isLoading: showsLoading } = useFetchShowTimeQuery();
  const { data: cinemas, isLoading: cinemasLoading } = useFetchCinemaQuery();
  const { data: rooms } = useFetchMovieRoomQuery();
  const { data: avg_films } = useAVG_FilmsQuery();
  const hiddenRoom = (rooms as any)?.data?.filter(
    (item: any) => item.status === 1
  );
  console.log(hiddenRoom);

  const { data: times } = useFetchTimeQuery();

  const { data: cateAllDetail } = useGetAllCateDetailByFilmQuery();

  const { data: dataChairEmpTy } = useGetChairEmpTyQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [filmShows2, setFilmShows2] = useState<FilmShow[]>([]);
  const user = useSelector((state: any) => state.auth?.token);
  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const calculateAge = (birthDate: string) => {
    const today = moment();
    const birthMoment = moment(birthDate);
    const age = today.diff(birthMoment, "years");
    return age;
  };

  // Tính tuổi từ ngày sinh của người dùng
  const userAge = calculateAge(IfUser?.date_of_birth);

  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const { data: dataShowbyIdCinema } =
    useGetShowbyIdCinemaQuery(selectedCinema);

  const currentDateTime = moment()
    .utcOffset(420)
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const isToday2 = new Date(currentDateTime);
  const currentDateTime2 = moment().utcOffset(420);
  const navigate = useNavigate();

  interface FilmShow {
    date: string;
    times: any[];
  }

  const handleTimeSelection = (timeId: any) => {
    if (user) {
      // Đã đăng nhập, chuyển đến trang đặt vé
      navigate(`/book-ticket/${timeId}`);
    } else {
      message.warning("Bạn chưa đăng nhập!");
      navigate("/login");
    }
  };

  const showModal = (filmId: any) => {
    setSelectedFilmId(filmId);
    setIsModalOpen(true);
    const showsForSelectedFilm = ((shows as any)?.data || []).filter(
      (show: any) => {
        return show.film_id === filmId;
      }
    );

    // Bước 1: Gộp suất chiếu cùng ngày
    const uniqueShows = [] as any[];
    showsForSelectedFilm.forEach((show: any) => {
      const existingShow = uniqueShows.find((s) => s.date === show.date);
      if (existingShow) {
        existingShow.times.push(show);
      } else {
        uniqueShows.push({
          date: show.date,
          times: [show],
        });
      }
    });

    if (JSON.stringify(uniqueShows) !== JSON.stringify(filmShows2)) {
      setFilmShows2(uniqueShows as any);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const today = new Date();

  const month = today.getMonth() + 1; // Lấy tháng (0-11, cần cộng thêm 1)

  const selectedCinemaInfo = useMemo(() => {
    return (
      (cinemas as any)?.data?.find(
        (cinema: any) => cinema.id == selectedCinema
      ) ?? null
    );
  }, [cinemas, selectedCinema]);

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

  const items: TabsProps["items"] = daysToDisplay?.map((date, index) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const show = filmShows2.find((show) => show.date === formattedDate);
    const isToday = formattedDate === isToday2.toISOString().slice(0, 10);

    // const time_detailbyCinema = show?.times.filter(s=>s.row)
    const roomByCinema = (rooms as any)?.data?.filter(
      (room: any) => room.id_cinema == selectedCinema
    );
    const roomIds = roomByCinema?.map((s: any) => s.id);

    const filteredShowTimes = show?.times?.filter((time: any) =>
      roomIds?.includes(time.room_id)
    );

    const dayOfWeek = (today.getDay() + index) % 7;
    const dayNumber = date.getUTCDate();

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
      show.times.sort((a, b) => {
        const timeA = getRealTime(a.time_id);
        const timeB = getRealTime(b.time_id);
        return timeA.localeCompare(timeB);
      });
      show.times = show.times.filter((time) => {
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
              {(filteredShowTimes || [])?.map(
                (time: any, timeIndex: number) => {
                  // hiddenRoom
                  // Lấy thông tin thời gian
                  if (time.status !== 1) {
                    return null;
                  }

                  // console.log(showTime);
                  if (
                    dataChairEmpTy &&
                    time.status === 1 &&
                    hiddenRoom.some((room: any) => room.id === time.room_id)
                  ) {
                    const showTime = getRealTime(time.time_id);
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
                }
              )}
            </div>
          ) : (
            "Chưa cập nhật suất chiếu của ngày này"
          )}
        </div>
      ),
    };
  });

  if (filmsLoading && showsLoading && cinemasLoading) {
    return <Loading />;
  }

  return (
    <>
      <>
        <section className="relative bg-[url('/banner-ticket.jpg/')]  opacity-80 bg-cover w-full bg-center bg-no-repeat">
          <Header />

          <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
            <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
              Đặt vé chưa bao giờ dễ dàng đến thế!
            </h2>
            <p className="text-[#FFFFFF] mx-auto px-20 py-10">
              Mở khóa liền mạch thế giới phim ảnh! Đặt vé xem phim CGV một cách
              dễ dàng thông qua trang web thân thiện với người dùng của chúng
              tôi. Hành trình điện ảnh của bạn chỉ cách đó vài cú nhấp chuột!
            </p>
            <div className="flex justify-center  mt-[50px]">
              <Link
                to={"#"}
                className="px-10 rounded-3xl bg-red-600  py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none  active:bg-red-500 sm:w-auto"
              >
                Đặt vé theo phim
              </Link>
              <Link to={"#"}>
                <div className="px-6 hover:bg-tertiary  border-tertiary text-white border p-2 rounded-[48px] ml-4 text-gray">
                  Đặt vé tại rạp
                </div>
              </Link>
            </div>
          </div>
        </section>
        <div className="boby mx-auto max-w-5xl mb-20 ">
          <div className="book-ticket">
            <h2 className="font-bold mb-[34px] text-center text-[40px] text-[#FFFFFF]">
              Đặt phim
            </h2>
            <Alert
              banner
              message={
                <Marquee pauseOnHover gradient={false}>
                  Nút mua vé sẽ chỉ hiển thị nếu bạn đủ tuổi xem phim đó !!
                </Marquee>
              }
              className="my-10 rounded-md"
            />
            <div className="grid grid-cols-4 gap-10">
              {(films as any)?.data?.map((film: any) => {
                if (cateAllDetail && dataShowbyIdCinema) {
                  const cate = cateAllDetail.find(
                    (item: any) => item.id === film.id
                  );
                  const avg_film = (avg_films as any)?.filmRatings.find(
                    (item: any) => item.film_id === film.id
                  );
                  const showbyCinema = dataShowbyIdCinema.find(
                    (show: any) => show.film_id === film.id
                  );
                  const isExpired = dayjs(film.end_date).isBefore(dayjs());
                  const isExpired2 = dayjs(film.release_date).isAfter(dayjs());

                  // release_date
                  if (isExpired) {
                    return null;
                  }
                  if (isExpired2) {
                    return null;
                  }
                  return (
                    <div className="relative">
                      <div
                        className="w-[245px] relative h-[560px]"
                        key={film.id}
                      >
                        <img
                          srcSet={film.image}
                          alt=""
                          className="rounded-2xl w-[228px] h-[340px]"
                        />
                        <div className="absolute bg-black m-2 text-white rounded-xl p-1 px-2 left-0 font-bold  top-0">
                          {film?.limit_age}+
                        </div>
                        <div className="h-[100px] ">
                          <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                            {film?.name?.length > 18
                              ? `${film?.name.slice(0, 15)}...`
                              : film?.name}
                          </h3>
                          <div className="space-x-5 w-[200px] flex items-center text-[#8E8E8E] text-[11px]">
                            <span>{cate?.category_names}</span>
                            <span className="flex items-center space-x-2">
                              <span>{avg_film?.star} </span>
                              {avg_film?.star ? (
                                <svg
                                  className="h-5 w-5"
                                  fill="#FADB14"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ) : (
                                ""
                              )}
                            </span>
                            <span>{film?.limit_age}+</span>
                          </div>
                        </div>

                        {showbyCinema &&
                          IfUser &&
                          userAge >= parseInt(film.limit_age, 10) && (
                            <button
                              className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]"
                              onClick={() => {
                                showModal(film.id);
                              }}
                            >
                              Mua vé
                            </button>
                          )}
                        {showbyCinema && !IfUser && (
                          <button
                            className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]"
                            onClick={() => {
                              showModal(film.id);
                            }}
                          >
                            Mua vé
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <button className="mx-auto block mt-[150px]">
              <span>
                <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
              </span>
            </button>
          </div>
        </div>
        <Modal
          title="Lịch Chiếu Phim"
          open={isModalOpen}
          onOk={handleOk}
          okButtonProps={{
            style: { backgroundColor: "#007bff", color: "white" },
          }}
          onCancel={handleCancel}
        >
          {selectedFilmId !== null && (
            <p className="text-center text-2xl">
              Rạp {(selectedCinemaInfo as any)?.name}
            </p>
          )}
          <h2 className="font-semibold">2D PHỤ ĐỀ</h2>
          <Tabs defaultActiveKey="1" items={items} />

          <hr></hr>
        </Modal>
        ;
      </>
    </>
  );
};

export default Ticket;
