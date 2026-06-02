import { Select, message } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useFetchProductQuery } from "../../service/films.service";
import { useFetchCinemaQuery } from "../../service/brand.service";
import { useBookingShowtimes } from "../../hooks/useBookingShowtimes";
import {
  formatShowtimeLabel,
  getBookingDateOptions,
} from "../../utils/booking-showtimes";

const FindBookQuickly: React.FC = () => {
  const navigate = useNavigate();
  const { data: dataFilm } = useFetchProductQuery();
  const { data: dataCinema } = useFetchCinemaQuery();

  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);

  const { showtimes } = useBookingShowtimes({
    cinemaId: selectedCinema,
    filmId: selectedFilm,
  });

  const filmOptions = useMemo(() => {
    return ((dataFilm as any)?.data ?? [])
      .filter((film: any) => {
        const isExpired = dayjs(film.end_date).endOf("day").isBefore(dayjs());
        const isUpcoming = dayjs(film.release_date)
          .startOf("day")
          .isAfter(dayjs());

        return !isExpired && !isUpcoming;
      })
      .map((film: any) => ({
        label: film.name,
        value: String(film.id),
      }));
  }, [dataFilm]);

  const cinemaOptions = useMemo(() => {
    return ((dataCinema as any)?.data ?? [])
      .filter((cinema: any) => cinema.status === 1)
      .map((cinema: any) => ({
        label: cinema.name,
        value: String(cinema.id),
      }));
  }, [dataCinema]);

  const dateOptions = useMemo(() => {
    return getBookingDateOptions(showtimes)
      .filter((option) => option.showtimes.length > 0)
      .map((option) => ({
        label: option.label,
        value: option.key,
      }));
  }, [showtimes]);

  const timeOptions = useMemo(() => {
    return showtimes
      .filter((showtime) => showtime.date === selectedDate)
      .map((showtime) => ({
        label: `${formatShowtimeLabel(showtime.time)} · ${showtime.room_name} · ${showtime.available_seats} ghế`,
        value: String(showtime.show_id),
        disabled: Number(showtime.available_seats) <= 0,
      }));
  }, [selectedDate, showtimes]);

  const helperText = useMemo(() => {
    if (!selectedFilm) {
      return "Vui lòng chọn phim trước";
    }

    if (!selectedCinema) {
      return "Vui lòng chọn rạp trước";
    }

    if (showtimes.length === 0) {
      return "Rạp này chưa có lịch chiếu cho phim này";
    }

    return "Chọn ngày và giờ chiếu phù hợp để tiếp tục";
  }, [selectedCinema, selectedFilm, showtimes]);

  const handleFilmChange = (value?: string) => {
    setSelectedFilm(value ?? null);
    setSelectedCinema(null);
    setSelectedDate(null);
    setSelectedShowId(null);
  };

  const handleCinemaChange = (value?: string) => {
    setSelectedCinema(value ?? null);
    setSelectedDate(null);
    setSelectedShowId(null);
  };

  const handleDateChange = (value?: string) => {
    setSelectedDate(value ?? null);
    setSelectedShowId(null);
  };

  const handleShowtimeChange = (value?: string) => {
    setSelectedShowId(value ?? null);
  };

  const handleLinkBookTicket = () => {
    if (!selectedShowId) {
      message.warning(
        "Vui lòng chọn đúng và đầy đủ thứ tự Phim, Rạp, Ngày Chiếu, Giờ Chiếu"
      );
      return;
    }

    navigate(`book-ticket/${selectedShowId}`);
  };

  return (
    <section>
      <section className="mx-auto max-w-5xl space-y-2 rounded-lg border-cyan-500 bg-white p-4 shadow-xl shadow-cyan-500/50">
        <section>
          <h1 className="block border-b-2 border-red-600 text-center text-xl font-bold text-red-600">
            Đặt vé nhanh ở đây
          </h1>
          <p className="mt-3 text-center text-sm text-slate-500">{helperText}</p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <section>
            <Select
              className="w-full"
              placeholder="Tìm phim..."
              options={filmOptions}
              value={selectedFilm ?? undefined}
              onChange={handleFilmChange}
              allowClear
            />
          </section>

          <section>
            <Select
              className="w-full"
              placeholder="Rạp"
              options={cinemaOptions}
              value={selectedCinema ?? undefined}
              onChange={handleCinemaChange}
              disabled={!selectedFilm}
              allowClear
            />
          </section>

          <section>
            <Select
              className="w-full"
              placeholder="Ngày chiếu"
              options={dateOptions}
              value={selectedDate ?? undefined}
              onChange={handleDateChange}
              disabled={!selectedFilm || !selectedCinema || dateOptions.length === 0}
              allowClear
            />
          </section>

          <section>
            <Select
              className="w-full"
              placeholder="Suất chiếu"
              options={timeOptions}
              value={selectedShowId ?? undefined}
              onChange={handleShowtimeChange}
              disabled={!selectedDate || timeOptions.length === 0}
              allowClear
            />
          </section>

          <section>
            <button
              onClick={handleLinkBookTicket}
              disabled={!selectedShowId}
              className={`my-2 w-full rounded-md py-2 text-[16px] transition ${
                selectedShowId
                  ? "bg-black text-[#FFFFFF] shadow-xl shadow-cyan-500/50 hover:bg-[#EAE8E4] hover:text-black"
                  : "cursor-not-allowed bg-slate-300 text-slate-500"
              }`}
            >
              Mua Vé Ngay
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default FindBookQuickly;
