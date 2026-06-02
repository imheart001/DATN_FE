import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import Header from "../../../Layout/LayoutUser/Header";
import { useGetProductByIdQuery } from "../../../service/films.service";
import CommentFilm from "../Comment/comment";
import { useGetCommentByUserIdQuery } from "../../../service/commentfilm.service";
import Loading from "../../../components/isLoading/Loading";
import { useAppSelector } from "../../../store/hooks";
import { useBookingShowtimes } from "../../../hooks/useBookingShowtimes";
import BookingShowtimePicker from "../../../components/Clients/Booking/BookingShowtimePicker";
import { useFetchCinemaQuery } from "../../../service/brand.service";

const Movie_About = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: film, isLoading: filmLoading } = useGetProductByIdQuery(`${id}`);
  const { data: rating } = useGetCommentByUserIdQuery(`${id}`);
  const { data: cinemas } = useFetchCinemaQuery();
  const selectedCinema = useAppSelector(
    (state) => state.selectedCinema as string | null
  );
  const user = useAppSelector((state) => state.auth?.token);
  const { showtimes, isLoading: bookingShowtimesLoading } = useBookingShowtimes({
    cinemaId: selectedCinema,
    filmId: id ? String(id) : null,
  });

  const selectedCinemaInfo = useMemo(() => {
    return (
      (cinemas as any)?.data?.find(
        (cinema: any) => String(cinema.id) === String(selectedCinema)
      ) ?? null
    );
  }, [cinemas, selectedCinema]);

  const handleTimeSelection = (showId: string) => {
    if (user) {
      navigate(`/book-ticket/${showId}`);
      return;
    }

    message.warning("Bạn chưa đăng nhập!");
    navigate("/login");
  };

  if (filmLoading || bookingShowtimesLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-primary text-center">
      <section
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat p-4 text-secondary"
        style={{ backgroundImage: `url(${(film as any)?.data?.poster})` }}
      >
        <Header />
      </section>

      <div className="mt-[70px] items-center">
        <h1 className="mb-[20px] text-4xl font-bold text-white">Tóm tắt</h1>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-200 overflow-hidden rounded-lg sm:h-200 lg:order-last lg:h-full">
                <img
                  alt={(film as any)?.data?.name}
                  srcSet={(film as any)?.data?.image}
                  className="w-[70%] bg-white p-4"
                />
              </div>

              <div className="flex flex-col items-center lg:py-24">
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {(film as any)?.data?.name}
                </h2>

                <p className="my-4 text-center text-white">
                  THỜI LƯỢNG: {(film as any)?.data?.time}
                </p>

                <div className="my-4 flex items-center justify-center space-x-2 text-white">
                  <div>Đánh giá : {rating?.averageStars}</div>
                  <svg
                    className="h-5 w-5"
                    fill="#FADB14"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <p className="my-4 text-center text-white">
                  NGÀY KHỞI CHIẾU :{" "}
                  {new Date(
                    (film as any)?.data?.release_date
                  ).toLocaleDateString("en-GB")}
                </p>

                <p className="my-4 text-center text-white">
                  MÔ TẢ: {(film as any)?.data?.description}
                </p>

                <div className="my-10 w-full rounded-lg bg-white px-4 pb-8 shadow-lg">
                  <div className="pt-6 text-center">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Lịch chiếu tại {selectedCinemaInfo?.name ?? "rạp đã chọn"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Chọn ngày và suất chiếu phù hợp để tiếp tục đặt vé.
                    </p>
                  </div>

                  <div className="mt-6">
                    <BookingShowtimePicker
                      cinemaId={selectedCinema}
                      filmId={id}
                      showtimes={showtimes}
                      onSelectShowtime={handleTimeSelection}
                      selectionKey={id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h1 className="mb-[20px] text-4xl font-bold text-white">
          Movie Trailer
        </h1>
        <div className="mx-auto flex justify-center bg-[#3C3E4D] p-10 pt-20">
          <iframe
            className="h-screen w-[80%]"
            allowFullScreen
            src={`https://www.youtube.com/embed/${(film as any)?.data?.trailer}`}
            title="Official Trailer"
            allow="autoplay"
          ></iframe>
        </div>
      </div>

      <CommentFilm dataidfilm={id} />
      <div className="mt-[30px] pb-10">
        <Link
          to="/movies"
          className="text-[17px] text-[#8E8E8E] underline transition hover:text-white"
        >
          Xem thêm phim
        </Link>
      </div>
    </div>
  );
};

export default Movie_About;
