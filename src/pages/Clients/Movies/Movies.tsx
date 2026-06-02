import { useEffect, useMemo, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { useFetchProductQuery } from "../../../service/films.service";
import FilmShowing from "../../../components/FilmShowing";
import { IFilms } from "../../../interface/model";
import { compareDates, compareReleaseDate } from "../../../utils";
import { useAppSelector } from "../../../store/hooks";
import { useBookingShowtimes } from "../../../hooks/useBookingShowtimes";
import { sortFilmsByBookingPriority } from "../../../utils/booking-showtimes";

const INITIAL_VISIBLE_MOVIES = 8;
const VISIBLE_MOVIES_STEP = 4;

const Movies = () => {
  const { data } = useFetchProductQuery() as any;
  const selectedCinema = useAppSelector(
    (state) => state.selectedCinema as string | null
  );
  const { showtimesByFilm } = useBookingShowtimes({
    cinemaId: selectedCinema,
  });
  const [visibleNowShowingCount, setVisibleNowShowingCount] = useState(
    INITIAL_VISIBLE_MOVIES
  );
  const [visibleUpcomingCount, setVisibleUpcomingCount] = useState(
    INITIAL_VISIBLE_MOVIES
  );

  const movieReleases = useMemo(() => {
    const filteredMovies =
      data?.data?.filter((item: any) => compareDates(item.release_date, item.end_date)) ??
      [];

    if (!selectedCinema) {
      return filteredMovies;
    }

    return sortFilmsByBookingPriority(filteredMovies, showtimesByFilm);
  }, [data, selectedCinema, showtimesByFilm]);

  const futureMovies = useMemo(() => {
    const filteredMovies =
      data?.data
        ?.filter((item: any) => compareReleaseDate(item.release_date))
        .filter((item: any) => {
          const currentDate = new Date();
          const featureMovieDate = new Date();
          const releaseDate = new Date(item.release_date);
          featureMovieDate.setDate(currentDate.getDate() + 300);
          return featureMovieDate > releaseDate;
        }) ?? [];

    if (!selectedCinema) {
      return filteredMovies;
    }

    return sortFilmsByBookingPriority(filteredMovies, showtimesByFilm);
  }, [data, selectedCinema, showtimesByFilm]);

  const visibleNowShowingMovies = useMemo(() => {
    return movieReleases.slice(0, visibleNowShowingCount);
  }, [movieReleases, visibleNowShowingCount]);

  const visibleUpcomingMovies = useMemo(() => {
    return futureMovies.slice(0, visibleUpcomingCount);
  }, [futureMovies, visibleUpcomingCount]);

  const hasMoreNowShowing = visibleNowShowingCount < movieReleases.length;
  const canCollapseNowShowing =
    movieReleases.length > INITIAL_VISIBLE_MOVIES &&
    visibleNowShowingCount >= movieReleases.length;
  const hasMoreUpcoming = visibleUpcomingCount < futureMovies.length;
  const canCollapseUpcoming =
    futureMovies.length > INITIAL_VISIBLE_MOVIES &&
    visibleUpcomingCount >= futureMovies.length;

  useEffect(() => {
    setVisibleNowShowingCount(INITIAL_VISIBLE_MOVIES);
    setVisibleUpcomingCount(INITIAL_VISIBLE_MOVIES);
  }, [selectedCinema]);

  const handleToggleNowShowing = () => {
    if (hasMoreNowShowing) {
      setVisibleNowShowingCount((prev) => prev + VISIBLE_MOVIES_STEP);
      return;
    }

    setVisibleNowShowingCount(INITIAL_VISIBLE_MOVIES);
  };

  const handleToggleUpcoming = () => {
    if (hasMoreUpcoming) {
      setVisibleUpcomingCount((prev) => prev + VISIBLE_MOVIES_STEP);
      return;
    }

    setVisibleUpcomingCount(INITIAL_VISIBLE_MOVIES);
  };

  return (
    <>
      <section
        style={{
          backgroundImage: "url(/bannerMovie.png/)",
          opacity: "0.8",
        }}
        className="relative bg-cover w-full bg-center bg-no-repeat"
      >
        <Header />

        <div className="text-center my-10 px-10 h-screen py-[200px] max-w-screen-xl mx-auto">
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
      <section className="max-w-5xl my-10 mx-auto">
        <div className="movie now playing">
          <h1 className="text-[#FFFFFF] mb-[34px] mt-[66px] mx-auto text-center text-[41px] font-bold">
            Đang chiếu
          </h1>
          <div className="grid grid-cols-4 gap-7">
            {visibleNowShowingMovies.map((film: IFilms) => (
              <FilmShowing key={film.id} data={film} />
            ))}
          </div>
          {(hasMoreNowShowing || canCollapseNowShowing) && (
            <button
              type="button"
              onClick={handleToggleNowShowing}
              className="mx-auto block mb-[67px] text-[17px] text-[#8E8E8E] underline transition hover:text-white"
            >
              {hasMoreNowShowing ? "Xem thêm" : "Ẩn bớt"}
            </button>
          )}
        </div>
        <div className="movie upcoming">
          <h1 className="text-[#FFFFFF] mb-[34px] mt-[66px] mx-auto text-center text-[41px] font-bold">
            Sắp chiếu
          </h1>
          <div className="grid grid-cols-4 gap-7">
            {visibleUpcomingMovies.map((film: IFilms) => (
              <FilmShowing key={film.id} data={film} />
            ))}
          </div>
          {(hasMoreUpcoming || canCollapseUpcoming) && (
            <button
              type="button"
              onClick={handleToggleUpcoming}
              className="mx-auto block mb-[67px] text-[17px] text-[#8E8E8E] underline transition hover:text-white"
            >
              {hasMoreUpcoming ? "Xem thêm" : "Ẩn bớt"}
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;