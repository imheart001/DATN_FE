import { Cascader, Dropdown, Menu, Select, message } from "antd";
import { useFetchProductQuery } from "../../service/films.service";

import { useFetchCinemaQuery } from "../../service/brand.service";
import { useEffect, useState } from "react";
import { useFetchShowTimeQuery } from "../../service/show.service";
import "moment/locale/vi";
import * as moment from "moment-timezone";
import { useFetchTimeQuery } from "../../service/time.service";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
interface Film {
  label: React.ReactNode;
  value: string;
  image: string;
}
interface Cinema {
  label: React.ReactNode;
  value: string;
}
const { Option } = Select;
const FindBookQuickly: React.FC = () => {
  const { data: DataFilm } = useFetchProductQuery();
  const { data: DataRap } = useFetchCinemaQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const { data: times } = useFetchTimeQuery();
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // console.log(selectedFilm, selectedCinema, selectedDate, selectedTime);

  const [findDate, setFindDate] = useState([]);
  const handleFilmSelect = (filmId: string) => {
    setSelectedCinema(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedFilm(filmId);
    setFindDate([]);
  };
  const handleTimeSelect = (timeId: string) => {
    // console.log(timeId);

    setSelectedTime(timeId);
  };
  const handleCinemaSelect = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
  };
  const convertToOriginalFormat = (formattedDate: string) => {
    const momentDate = moment(formattedDate, "DD/MM/YYYY - ddd");
    return momentDate.format("YYYY-MM-DD");
  };

  const handleDateSelect = (dateId: string) => {
    const originalFormat = convertToOriginalFormat(dateId);
    // console.log(originalFormat);
    setSelectedDate(originalFormat);
  };
  const filmOptions: Film[] = (DataFilm as any)?.data
    ?.map((film: any) => {
      const isExpired = dayjs(film.end_date).isBefore(dayjs());
      const isExpired2 = dayjs(film.release_date).isAfter(dayjs());

      // release_date
      if (isExpired || isExpired2) {
        return null;
      }

      return {
        label: (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <img
                    src={film.image}
                    className="block mx-auto w-[201px] shadow-lg shadow-cyan-500/50 rounded-2xl h-[295px]"
                    alt={film.name}
                  />
                </Menu.Item>
              </Menu>
            }
            placement="right"
            arrow
          >
            <a onClick={() => handleFilmSelect(film.id)}>{film.name}</a>
          </Dropdown>
        ),
        value: film.id,
        image: film.image,
      };
    })
    .filter(Boolean);
  const cinemaOptions: Cinema[] = (DataRap as any)?.data?.map(
    (cinema: any) => ({
      label: (
        <div className="">
          {selectedFilm && (
            <a onClick={() => handleCinemaSelect(cinema.id)}>{cinema.name}</a>
          )}{" "}
          {!selectedFilm && <div className="">Vui lòng chọn phim</div>}
        </div>
      ),
      value: cinema.id,
    })
  );
  const currentDateTime = moment().utcOffset(420).format("YYYY-MM-DD");
  // console.log(currentDateTime);

  useEffect(() => {
    if (selectedFilm && selectedCinema) {
      // Lọc danh sách ngày chiếu dựa trên phim và rạp được chọn
      const filteredShows = (shows as any)?.data.filter((show: any) => {
        return show.film_id == selectedFilm && show.room_id == selectedCinema;
      });

      // In ra danh sách ngày chiếu đã lọc
      const currentDateShows = filteredShows.filter((show: any) => {
        return moment(show.date).isSameOrAfter(currentDateTime, "day");
      });
      const groupedDates = currentDateShows.reduce(
        (accumulator: any, show: any) => {
          const showDate = show.date;

          // Kiểm tra xem ngày đã tồn tại trong accumulator chưa
          if (!accumulator[showDate]) {
            accumulator[showDate] = [];
          }

          // Thêm show vào ngày tương ứng
          accumulator[showDate].push(show);

          return accumulator;
        },
        {}
      );

      // Chuyển đổi groupedDates thành mảng
      const groupedDatesArray = Object.entries(groupedDates).map(
        ([date, shows]) => ({
          date: moment(date).format("DD/MM/YYYY - ddd"),
          shows,
        })
      );

      setFindDate(groupedDatesArray as any);
    }
  }, [selectedFilm, selectedCinema, shows]);

  const filteredShows = (shows as any)?.data.filter((show: any) => {
    return (
      show.film_id == selectedFilm &&
      show.room_id == selectedCinema &&
      show.date === selectedDate
    );
  });
  // const findTime = findShowsByDate[0].map((show) => show.date === "2023-12-06");

  const currentTime = moment().format("HH:mm");

  // const filteredTimesData = (times?.data || []).filter((time: any) => {
  //   return (
  //     filteredShows.map((show: any) => show.time_id).includes(time.id) &&
  //     moment(time.time, "HH:mm").isSameOrAfter(moment(currentTime, "HH:mm"))
  //   );
  // });
  const filteredTimesData = ((times as any)?.data || []).filter((time: any) => {
    return (
      // Check if the selected date is today
      (selectedDate === currentDateTime &&
        moment(time.time, "HH:mm").isSameOrAfter(
          moment(currentTime, "HH:mm")
        )) ||
      // Check if the selected date is in the future
      (selectedDate !== currentDateTime &&
        filteredShows?.map((show: any) => show.time_id).includes(time.id))
    );
  });
  // console.log(filteredTimesData);

  const findFinalShow = (shows as any)?.data.filter((show: any) => {
    return (
      show.film_id == selectedFilm &&
      show.room_id == selectedCinema &&
      show.date == selectedDate &&
      show.time_id == selectedTime
    );
  });
  const handleLinkBookTicket = () => {
    if (findFinalShow && findFinalShow.length > 0) {
      navigate(`book-ticket/${findFinalShow[0]?.id}`);
    } else {
      // Handle the case when findFinalShow is empty or undefined
      message.warning(
        "Vui lòng chọn đúng và đầy đủ thứ tự Phim, Rạp , Ngày Chiếu, Giờ Chiếu"
      );
    }
  };

  return (
    <>
      {filmOptions && (
        <section>
          <section className="bg-white rounded-lg max-w-5xl space-y-2 mx-auto p-4 border-cyan-500 shadow-xl shadow-cyan-500/50">
            <section>
              <h1 className="text-center block font-bold text-xl text-red-600 border-b-2 border-red-600">
                Đặt vé nhanh ở đây
              </h1>
            </section>
            <section className="grid  grid-cols-5 items-center space-x-4">
              <section>
                <Cascader
                  className="border-none"
                  options={filmOptions}
                  placeholder="Tìm phim..."
                />
              </section>
              <section>
                <Cascader options={cinemaOptions} placeholder="Rạp" />
              </section>
              <section>
                <Select placeholder="Ngày chiếu" className="w-full" allowClear>
                  {selectedFilm !== null &&
                    selectedCinema !== null &&
                    findDate &&
                    findDate?.length === 0 && (
                      <Option value="1">Không có ngày chiếu nào phù hợp</Option>
                    )}
                  {findDate &&
                    findDate.length === 0 &&
                    selectedFilm == null &&
                    selectedCinema == null && (
                      <Option value="2" className="w-[150%]">
                        Vui lòng Chọn Phim và Rạp Trước
                      </Option>
                    )}
                  {findDate &&
                    findDate.length === 0 &&
                    selectedFilm !== null &&
                    selectedCinema == null && (
                      <Option value="2" className="w-[150%]">
                        Vui lòng Chọn Rạp Trước
                      </Option>
                    )}
                  {findDate &&
                    findDate.map((item: any) => {
                      return (
                        <>
                          <Option value={item?.date}>
                            {" "}
                            <a onClick={() => handleDateSelect(item?.date)}>
                              {item?.date}
                            </a>
                          </Option>
                        </>
                      );
                    })}
                  {/* <Option>female</Option>
                  <Option value="other">other</Option> */}
                </Select>
              </section>
              <section>
                {/* <Cascader placeholder="Suất chiếu" /> */}
                <Select
                  placeholder="Suất chiếu"
                  className="w-full"
                  allowClear
                  onChange={() => setSelectedTime(null)}
                >
                  {/* <Option>Không có giờ chiếu nào</Option> */}

                  {filteredTimesData?.map((time: any) => {
                    return (
                      <>
                        <Option value={time?.id}>
                          {" "}
                          <a onClick={() => handleTimeSelect(time.id)}>
                            {time?.time}
                          </a>
                        </Option>
                      </>
                    );
                  })}

                  {/* <Option value="other">other</Option> */}
                </Select>
              </section>
              <section>
                <button
                  onClick={handleLinkBookTicket}
                  className="hover:bg-[#EAE8E4] rounded-md my-2 border-cyan-500 shadow-xl shadow-cyan-500/50 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                >
                  Mua Vé Ngay
                </button>
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default FindBookQuickly;
