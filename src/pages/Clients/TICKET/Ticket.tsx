import React, { useEffect, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import moment from "moment-timezone";
import { Button, Modal, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchShowTimeQuery } from "../../../service/show.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import type { TabsProps } from "antd";
import { updateToken } from "../../../components/CinemaSlice/authSlice";
import { useFetchChairsQuery } from "../../../service/chairs.service";
import { useGetALLCateDetailByIdQuery } from "../../../service/catedetail.service";

const Ticket: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const { data: films, isLoading: filmsLoading } = useFetchProductQuery();
  const { data: shows, isLoading: showsLoading } = useFetchShowTimeQuery();
  const { data: cinemas, isLoading: cinemasLoading } = useFetchCinemaQuery();
  const { data: roomsBrand, isLoading: roomsLoading } =
    useFetchMovieRoomQuery();
  const [initialSeatCount, setInitialSeatCount] = useState(70); // Số ghế ban đầu
  // Số ghế đã đặt

  const { data: chairs } = useFetchChairsQuery();
  const { data: times, isLoading: timeLoading } = useFetchTimeQuery();
  const selectedCinema = useSelector((state: any) => state.selectedCinema);

  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  const currentDateTime = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const isToday2 = new Date(currentDateTime);
  const currentDateTime2 = moment();
  const navigate = useNavigate();
  interface FilmShow {
    date: string;
    times: any[];
  }
  const [filmShows2, setFilmShows2] = useState<FilmShow[]>([]);
  const user = useSelector((state: any) => state.auth?.token);
  console.log(user);

  const handleTimeSelection = (timeId: any) => {
    if (user) {
      // Đã đăng nhập, chuyển đến trang đặt vé
      navigate(`/book-ticket/${timeId}`);
    } else {
      // Chưa đăng nhập, chuyển đến trang đăng nhập
      navigate("/login");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutDuration = 1000 * 15 * 60;

    const timeoutId = setTimeout(() => {
      dispatch(updateToken(null));
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  const showModal = (filmId: any) => {
    setSelectedFilmId(filmId);
    setIsModalOpen(true);
    const showsForSelectedFilm = ((shows as any)?.data || []).filter(
      (show: any) => {
        return show.film_id == filmId;
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

    // Kiểm tra trước khi cập nhật filmShows2
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

  const selectedCinemaInfo = (cinemas as any)?.data.find(
    (cinema: any) => cinema.id == selectedCinema
  );

  const getRealTime = (timeId: any) => {
    const timeInfo = (times as any)?.data.find(
      (time: any) => time.id == timeId
    );
    return timeInfo ? timeInfo.time : ""; // Lấy thời gian từ thông tin thời gian
  };
  const validShows = (shows as any)?.data.filter((show: any) => {
    const room = (roomsBrand as any)?.data.find(
      (room: any) => room.id == show.room_id
    );
    return room && room.id_cinema == selectedCinema;
  });

  const daysToDisplay = [isToday2];
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(isToday2);
    nextDate.setDate(isToday2.getDate() + i);
    daysToDisplay.push(nextDate);
  }

  const items: TabsProps["items"] = daysToDisplay.map((date, index) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const show = filmShows2.find((show) => show.date === formattedDate);
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
          {show && show.times.length > 0 ? (
            <div className="grid grid-cols-5 ">
              {show.times.map((time: any, timeIndex: number) => {
                // Lấy thông tin thời gian
                const showTime = getRealTime(time.time_id);

                // Lọc ra các ghế đã đặt cho suất chiếu này
                const reservedChairs = (chairs as any)?.data.filter(
                  (chair: any) => time.id === chair.id_time_detail
                );
                const groupedChairs = reservedChairs.reduce(
                  (result: any, chair: any) => {
                    if (!result[chair.id_time_detail]) {
                      result[chair.id_time_detail] = [];
                    }
                    result[chair.id_time_detail].push(chair.name);
                    return result;
                  },
                  {}
                );

                // Chuyển đổi thành mảng cuối cùng
                const finalResult = Object.keys(groupedChairs).map((key) => ({
                  [key]: groupedChairs[key].join(", "),
                }));

                // finalResult bây giờ chứa thông tin gộp theo id_time_detail ở dạng mảng
                console.log(finalResult);
                const allNames = [];

                // Lặp qua mảng finalResult để lấy tất cả phần tử 'name'
                finalResult.forEach((group) => {
                  const keys = Object.keys(group);
                  keys.forEach((key) => {
                    const names = group[key].split(", ");
                    allNames.push(...names);
                  });
                });

                // Tính tổng số phần tử 'name'
                const totalNameCount = allNames.length;
                // Tính số ghế trống còn lại
                const remainingSeats = initialSeatCount - totalNameCount;

                return (
                  <div key={timeIndex} className="my-1 text-center">
                    <Button onClick={() => handleTimeSelection(time.id)}>
                      {showTime}
                    </Button>
                    <div className="">{remainingSeats} ghế trống</div>
                  </div>
                );
              })}
            </div>
          ) : (
            "Chưa cập nhật suất chiếu của ngày này"
          )}
        </div>
      ),
    };
  });

  // Kiểm tra xem tất cả dữ liệu đã được tải xong hay chưa
  const isAllDataLoaded =
    cinemasLoading &&
    timeLoading &&
    roomsLoading &&
    filmsLoading &&
    showsLoading &&
    !user;

  if (isAllDataLoaded) {
    return (
      // Hiển thị thông báo hoặc biểu tượng tải trong khi dữ liệu đang được tải
      <div>Loading...</div>
    );
  }

  // Tất cả dữ liệu đã được tải xong, hiển thị trang web
  return (
    <>
      <>
        <section
          style={{
            backgroundImage: "url(/banner-ticket.jpg/)",
            opacity: "0.8",
          }}
          className="relative   bg-cover w-full bg-center bg-no-repeat"
        >
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
          <div className=" my-[100px] flex justify-center items-center ">
            <span className="text-[#8E8E8E] mr-[20px] ">
              Tôi muốn xem một bộ phim ở
            </span>
            <select
              className="rounded-[40px] px-6 py-2  text-white hover: bg-red-600 "
              name=""
              id=""
            >
              <option className=" " value="">
                Hà Nội
              </option>
              <option className="" value="">
                Đà Nẵng
              </option>
              <option className="" value="">
                Thành Phố Hồ Chí Minh
              </option>
            </select>
          </div>
          <div className="book-ticket">
            <h2 className="font-bold mb-[34px] text-center text-[40px] text-[#FFFFFF]">
              Đặt phim
            </h2>
            <div className="grid grid-cols-4 gap-10">
              {(films as any)?.data.map((film: any) => {
                const filmShows = validShows
                  ? validShows.filter((show: any) => show.film_id === film.id)
                  : [];

                const cateall = useGetALLCateDetailByIdQuery(`${film.id}`);

                return (
                  <div className="w-[245px] h-[560px]" key={film.id}>
                    <img
                      srcSet={film.image}
                      alt=""
                      className="rounded-2xl w-[228px] h-[340px]"
                    />
                    <div className="h-[100px]">
                      <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                        {film.name.length > 18
                          ? `${film.name.slice(0, 17)}...`
                          : film.name}
                      </h3>
                      <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                        <span>{(cateall as any)?.error?.data}</span>
                        <span>IMDB 8.6</span>
                        <span>13+</span>
                      </div>
                    </div>

                    {filmShows.length > 0 ? (
                      <button
                        className="text-[#FFFFFF]  hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]"
                        onClick={() => {
                          showModal(film.id);
                        }}
                      >
                        Mua vé
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <button className="mx-auto block mt-[150px]">
              <span>
                <u className="text-[17px] text-[#8E8E8E] ">Xem thêm</u>
              </span>
            </button>
          </div>
          <div className="book-cinema ">
            <h2 className="font-bold mb-[34px]  text-center mt-[66px] text-[40px] text-[#FFFFFF]">
              Chọn Rạp Chiếu
            </h2>
            <div className="cinemas md:grid md:grid-cols-2 md:gap-14">
              <div className="cinema w-[517px] h-[469px]">
                <img src="/book-cinema1.png/" alt="" />
                <div className="justify-between items-center mt-[10px] mb-5 flex">
                  <span className="text-[26px] font-bold text-[#FFFFFF]">
                    Poins Mall
                  </span>
                  <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
                </div>
              </div>
              <div className="cinema w-[517px] h-[469px]">
                <img src="/book-cinem2.png/" alt="" />
                <div className="justify-between items-center mt-[10px] mb-5 flex">
                  <span className="text-[26px] font-bold text-[#FFFFFF]">
                    Poins Mall
                  </span>
                  <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
                </div>
              </div>
              <div className="cinema w-[517px] h-[469px]">
                <img src="/book-cinema3.png/" alt="" />
                <div className="justify-between items-center mt-[10px] mb-5 flex">
                  <span className="text-[26px] font-bold text-[#FFFFFF]">
                    Poins Mall
                  </span>
                  <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
                </div>
              </div>
              <div className="cinema w-[517px] h-[469px]">
                <img src="/book-cinema4.png/" alt="" />
                <div className="justify-between items-center mt-[10px] mb-5 flex">
                  <span className="text-[26px] font-bold text-[#FFFFFF]">
                    Poins Mall
                  </span>
                  <span className="text-[17px] text-[#8E8E8E]">3 km away</span>
                </div>
              </div>
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
              Rạp {selectedCinemaInfo.name}
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
