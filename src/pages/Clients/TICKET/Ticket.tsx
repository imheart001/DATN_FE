import React, { useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { Button, Modal, Tabs } from "antd";
import { Link } from "react-router-dom";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchShowTimeQuery } from "../../../service/show.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { useSelector } from "react-redux";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import type { TabsProps } from "antd";
const Ticket: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const { data: films } = useFetchProductQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const { data: cinemas } = useFetchCinemaQuery();
  const { data: roomsBrand } = useFetchMovieRoomQuery();
  const { data: times } = useFetchTimeQuery();
  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const [filmShows2, setFilmShows2] = useState([]); // Bước 1
  const onChange = (key: string) => {
    console.log(key);
  };

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

    setFilmShows2(uniqueShows as any);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const today = new Date();

  // Mảng chứa tên các ngày trong tuần
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const dayOfWeek = daysOfWeek[today.getDay()]; // Lấy tên thứ
  const day = today.getDate(); // Lấy ngày (1-31)
  const month = today.getMonth() + 1; // Lấy tháng (0-11, cần cộng thêm 1)
  const year = today.getFullYear(); // Lấy năm (4 chữ số)

  const fullDate = `${dayOfWeek}, ${day}/${month}/${year}`;
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
  const items: TabsProps["items"] = filmShows2.map((show: any) => {
    return {
      key: show.date,
      label: `Ngày ${show.date}`,
      children: (
        <div>
          {show.times.map((time: any, timeIndex: number) => (
            <div key={timeIndex}>
              <Link to={`/book-ticket/${time.id}`} className="ml-4">
                {getRealTime(time.time_id)}
              </Link>
            </div>
          ))}
        </div>
      ),
    };
  });
  return (
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
            Mở khóa liền mạch thế giới phim ảnh! Đặt vé xem phim CGV một cách dễ
            dàng thông qua trang web thân thiện với người dùng của chúng tôi.
            Hành trình điện ảnh của bạn chỉ cách đó vài cú nhấp chuột!
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
            {(films as any)?.data.map((film: any, index: any) => {
              const filmShows = validShows
                ? validShows.filter((show: any) => show.film_id === film.id)
                : [];

              return (
                <div className="w-[245px] h-[560px]" key={film.id}>
                  <img
                    srcSet={film.image}
                    alt=""
                    className="rounded-2xl w-[228px] h-[340px]"
                  />
                  <div className="h-[100px]">
                    <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
                      {film.name}
                    </h3>
                    <div className="space-x-5 text-[#8E8E8E] text-[11px]">
                      <span>Drama</span>
                      <span>IMDB 8.6</span>
                      <span>13+</span>
                    </div>
                  </div>

                  {filmShows.length > 0 ? (
                    <button
                      className="text-[#FFFFFF] mt-[20px] hover:opacity-75  rounded-lg py-3 w-full bg-[#EE2E24]"
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
        onCancel={handleCancel}
      >
        {selectedFilmId !== null && (
          <p className="text-center text-2xl">Rạp {selectedCinemaInfo.name}</p>
        )}
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <hr></hr>
      </Modal>
      ;
    </>
  );
};

export default Ticket;
