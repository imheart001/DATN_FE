import { Cascader, Dropdown, Menu } from "antd";
import { useFetchProductQuery } from "../../service/films.service";

import { useFetchCinemaQuery } from "../../service/brand.service";
import { useEffect, useState } from "react";
import { useFetchShowTimeQuery } from "../../service/show.service";

interface Film {
  label: React.ReactNode;
  value: string;
  image: string;
}
interface Cinema {
  label: React.ReactNode;
  value: string;
}
const FindBookQuickly: React.FC = () => {
  const { data: DataFilm } = useFetchProductQuery();
  const { data: DataRap } = useFetchCinemaQuery();
  const { data: shows } = useFetchShowTimeQuery();

  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  const handleFilmSelect = (filmId: string) => {
    setSelectedFilm(filmId);
  };

  const handleCinemaSelect = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
  };

  const filmOptions: Film[] = (DataFilm as any)?.data.map((film: any) => ({
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
  }));
  const cinemaOptions: Cinema[] = (DataRap as any)?.data.map((cinema: any) => ({
    label: (
      <div className="">
        {selectedFilm && cinema.name}{" "}
        {!selectedFilm && <div className="">Vui lòng chọn phim</div>}
      </div>
    ),
    value: cinema.id,
  }));
  const filS: any[] = [];
  useEffect(() => {
    if (selectedFilm && selectedCinema) {
      // Lọc danh sách ngày chiếu dựa trên phim và rạp được chọn
      const filteredShows = (shows as any)?.data.filter((show: any) => {
        return (
          show.film_id === parseInt(selectedFilm) &&
          show.room_id === parseInt(selectedCinema)
        );
      });

      // In ra danh sách ngày chiếu đã lọc
      filS.push(filteredShows);
    }
  }, [selectedFilm, selectedCinema, shows]);

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
                <Cascader placeholder="Ngày xem" />
              </section>
              <section>
                <Cascader placeholder="Suất chiếu" />
              </section>
              <section>
                <button className="hover:bg-[#EAE8E4] rounded-md my-2 border-cyan-500 shadow-xl shadow-cyan-500/50 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]">
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
