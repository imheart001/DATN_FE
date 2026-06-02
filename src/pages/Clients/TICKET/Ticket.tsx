import { useEffect, useMemo, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { Alert, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  useAVG_FilmsQuery,
  useFetchProductQuery,
} from "../../../service/films.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import Marquee from "react-fast-marquee";
import { useGetAllCateDetailByFilmQuery } from "../../../service/catedetail.service";
import Loading from "../../../components/isLoading/Loading";
import dayjs from "dayjs";
import { useAppSelector } from "../../../store/hooks";
import { useBookingShowtimes } from "../../../hooks/useBookingShowtimes";
import BookingShowtimePicker from "../../../components/Clients/Booking/BookingShowtimePicker";
import {
  extractLimitAge,
  formatShowtimeLabel,
  getNextShowtime,
  sortFilmsByBookingPriority,
} from "../../../utils/booking-showtimes";

const INITIAL_VISIBLE_FILMS = 8;
const VISIBLE_FILMS_STEP = 4;

const Ticket: React.FC = () => {
  const navigate = useNavigate();
  const { data: films, isLoading: filmsLoading } = useFetchProductQuery();
  const { data: cinemas, isLoading: cinemasLoading } = useFetchCinemaQuery();
  const { data: avgFilms } = useAVG_FilmsQuery();
  const { data: cateAllDetail } = useGetAllCateDetailByFilmQuery();
  const selectedCinema = useAppSelector(
    (state) => state.selectedCinema as string | null
  );
  const user = useAppSelector((state) => state.auth?.token);
  const { showtimesByFilm, isLoading: bookingShowtimesLoading } =
    useBookingShowtimes({
      cinemaId: selectedCinema,
    });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);
  const [visibleFilmCount, setVisibleFilmCount] = useState(
    INITIAL_VISIBLE_FILMS
  );

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userAge = currentUser?.date_of_birth
    ? dayjs().diff(dayjs(currentUser.date_of_birth), "year")
    : null;

  const selectedCinemaInfo = useMemo(() => {
    return (
      (cinemas as any)?.data?.find(
        (cinema: any) => String(cinema.id) === String(selectedCinema)
      ) ?? null
    );
  }, [cinemas, selectedCinema]);

  const selectedFilmShowtimes = useMemo(() => {
    if (!selectedFilmId) {
      return [];
    }

    return showtimesByFilm[selectedFilmId] ?? [];
  }, [selectedFilmId, showtimesByFilm]);

  const availableFilms = useMemo(() => {
    const filteredFilms =
      (films as any)?.data?.filter((film: any) => {
        const isExpired = dayjs(film.end_date).endOf("day").isBefore(dayjs());
        const isUpcoming = dayjs(film.release_date)
          .startOf("day")
          .isAfter(dayjs());

        return !isExpired && !isUpcoming;
      }) ?? [];

    if (!selectedCinema) {
      return filteredFilms;
    }

    return sortFilmsByBookingPriority(filteredFilms, showtimesByFilm);
  }, [films, selectedCinema, showtimesByFilm]);

  const visibleFilms = useMemo(() => {
    return availableFilms.slice(0, visibleFilmCount);
  }, [availableFilms, visibleFilmCount]);

  const hasMoreFilms = visibleFilmCount < availableFilms.length;
  const canCollapseFilms =
    availableFilms.length > INITIAL_VISIBLE_FILMS &&
    visibleFilmCount >= availableFilms.length;

  const isPageLoading =
    filmsLoading ||
    cinemasLoading ||
    (!!selectedCinema && bookingShowtimesLoading);

  useEffect(() => {
    setVisibleFilmCount(INITIAL_VISIBLE_FILMS);
  }, [selectedCinema]);

  const handleTimeSelection = (showId: string) => {
    if (user) {
      navigate(`/book-ticket/${showId}`);
      return;
    }

    message.warning("Bạn chưa đăng nhập!");
    navigate("/login");
  };

  const showModal = (filmId: string) => {
    setSelectedFilmId(filmId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleVisibleFilms = () => {
    if (hasMoreFilms) {
      setVisibleFilmCount((prev) => prev + VISIBLE_FILMS_STEP);
      return;
    }

    setVisibleFilmCount(INITIAL_VISIBLE_FILMS);
  };

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="relative bg-[url('/banner-ticket.jpg/')] bg-cover w-full bg-center bg-no-repeat opacity-80">
        <Header />

        <div className="mx-auto my-10 h-screen max-w-screen-xl px-10 py-[200px] text-center">
          <h2 className="mx-auto text-5xl font-bold text-[#FFFFFF]">
            Đặt vé chưa bao giờ dễ dàng đến thế!
          </h2>
          <p className="mx-auto px-20 py-10 text-[#FFFFFF]">
            Mở khóa liền mạch thế giới phim ảnh! Đặt vé xem phim CGV một cách dễ
            dàng thông qua trang web thân thiện với người dùng của chúng tôi.
            Hành trình điện ảnh của bạn chỉ cách đó vài cú nhấp chuột!
          </p>
          <div className="mt-[50px] flex justify-center">
            <Link
              to="#"
              className="rounded-3xl bg-red-600 px-10 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none active:bg-red-500 sm:w-auto"
            >
              Đặt vé theo phim
            </Link>
            <Link to="#">
              <div className="ml-4 rounded-[48px] border border-tertiary p-2 px-6 text-white hover:bg-tertiary">
                Đặt vé tại rạp
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="boby mx-auto mb-20 max-w-5xl">
        <div className="book-ticket">
          <h2 className="mb-[34px] text-center text-[40px] font-bold text-[#FFFFFF]">
            Đặt phim
          </h2>
          <Alert
            banner
            message={
              <Marquee pauseOnHover gradient={false}>
                Nút mua vé sẽ chỉ hiển thị nếu bạn đủ tuổi xem phim đó hoặc chưa
                đăng nhập để xác minh độ tuổi.
              </Marquee>
            }
            className="my-10 rounded-md"
          />

          <div className="grid grid-cols-4 gap-10">
            {visibleFilms.map((film: any) => {
              const filmKey = String(film.id);
              const filmShowtimes = showtimesByFilm[filmKey] ?? [];
              const nextShowtime = getNextShowtime(filmShowtimes);
              const cate = cateAllDetail?.find((item: any) => item.id === film.id);
              const avgFilm = (avgFilms as any)?.filmRatings?.find(
                (item: any) => item.film_id === film.id
              );
              const minimumAge = extractLimitAge(film.limit_age);
              const isUnderAge =
                !!currentUser &&
                minimumAge > 0 &&
                userAge !== null &&
                userAge < minimumAge;

              return (
                <div key={film.id} className="relative">
                  <div className="relative min-h-[640px] w-[245px]">
                    <img
                      srcSet={film.image}
                      alt={film.name}
                      className="h-[340px] w-[228px] rounded-2xl"
                    />
                    <div className="absolute left-0 top-0 m-2 rounded-xl bg-black px-2 p-1 font-bold text-white">
                      {film?.limit_age}+
                    </div>

                    <div className="h-[150px]">
                      <h3 className="my-[10px] mb-[7px] text-[26px] font-bold text-[#FFFFFF]">
                        <Link
                          to={`/movie_about/${film.id}`}
                          className="transition hover:text-[#EE2E24]"
                        >
                          {film?.name?.length > 18
                            ? `${film?.name.slice(0, 15)}...`
                            : film?.name}
                        </Link>
                      </h3>
                      <div className="flex w-[200px] items-center space-x-5 text-[11px] text-[#8E8E8E]">
                        <span>{cate?.category_names}</span>
                        <span className="flex items-center space-x-2">
                          <span>{avgFilm?.star}</span>
                          {avgFilm?.star ? (
                            <svg
                              className="h-5 w-5"
                              fill="#FADB14"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ) : null}
                        </span>
                        <span>{film?.limit_age}+</span>
                      </div>
                      <div className="mt-4 text-xs text-[#C8C8C8]">
                        {nextShowtime
                          ? `Suất gần nhất: ${dayjs(nextShowtime.date).format(
                              "DD/MM"
                            )} · ${formatShowtimeLabel(nextShowtime.time)}`
                          : "Rạp này chưa có lịch chiếu"}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      <Link
                        to={`/movie_about/${film.id}`}
                        className="flex w-full items-center justify-center rounded-lg border border-white/20 bg-white/5 py-3 text-sm font-medium text-white transition hover:border-[#EE2E24] hover:bg-slate-900"
                      >
                        Xem chi tiết
                      </Link>

                      {filmShowtimes.length > 0 && !isUnderAge ? (
                        <button
                          className="w-full rounded-lg bg-[#EE2E24] py-3 text-[#FFFFFF] hover:opacity-75"
                          onClick={() => showModal(filmKey)}
                        >
                          Mua vé
                        </button>
                      ) : (
                        <div className="rounded-lg border border-dashed border-slate-500 px-4 py-3 text-center text-sm text-[#C8C8C8]">
                          {isUnderAge
                            ? `Phim yêu cầu đủ ${minimumAge}+ tuổi`
                            : "Hiện chưa có suất chiếu hợp lệ"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {(hasMoreFilms || canCollapseFilms) && (
            <button
              type="button"
              onClick={handleToggleVisibleFilms}
              className="mx-auto mt-[150px] block text-[17px] text-[#8E8E8E] underline transition hover:text-white"
            >
              {hasMoreFilms ? "Xem thêm" : "Ẩn bớt"}
            </button>
          )}
        </div>
      </div>

      <Modal
        title="Lịch Chiếu Phim"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedFilmId !== null && (
          <p className="text-center text-2xl">
            Rạp {(selectedCinemaInfo as any)?.name}
          </p>
        )}
        <h2 className="mb-4 font-semibold">2D PHỤ ĐỀ</h2>
        <BookingShowtimePicker
          cinemaId={selectedCinema}
          filmId={selectedFilmId}
          showtimes={selectedFilmShowtimes}
          onSelectShowtime={handleTimeSelection}
          selectionKey={selectedFilmId}
        />
      </Modal>
    </>
  );
};

export default Ticket;