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
    <section className="py-8 px-4">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 md:p-8 shadow-[0_10px_50px_rgba(6,182,212,0.15)] border border-cyan-100/50 relative overflow-hidden transition-all duration-300 hover:shadow-[0_15px_60px_rgba(6,182,212,0.25)]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/20 rounded-full blur-3xl -mr-20 -mt-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl -ml-20 -mb-20 -z-10" />

        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-600 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Đặt vé trực tuyến
            </span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              MUA VÉ NHANH
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{helperText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          {/* Select Film */}
          <div className="relative flex flex-col bg-gray-50 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 border border-gray-100 rounded-xl transition-all duration-200 h-16 justify-end pb-1.5">
            <label className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 9.17l4.24-4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M9.17 14.83l-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
              Chọn Phim
            </label>
            <Select
              bordered={false}
              className="w-full font-medium pt-3"
              placeholder="Chọn phim..."
              options={filmOptions}
              value={selectedFilm ?? undefined}
              onChange={handleFilmChange}
              allowClear
              showSearch
              optionFilterProp="label"
            />
          </div>

          {/* Select Cinema */}
          <div className={`relative flex flex-col bg-gray-50 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 border border-gray-100 rounded-xl transition-all duration-200 h-16 justify-end pb-1.5 ${!selectedFilm ? "opacity-50 pointer-events-none" : ""}`}>
            <label className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Chọn Rạp
            </label>
            <Select
              bordered={false}
              className="w-full font-medium pt-3"
              placeholder="Chọn rạp..."
              options={cinemaOptions}
              value={selectedCinema ?? undefined}
              onChange={handleCinemaChange}
              disabled={!selectedFilm}
              allowClear
              showSearch
              optionFilterProp="label"
            />
          </div>

          {/* Select Date */}
          <div className={`relative flex flex-col bg-gray-50 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 border border-gray-100 rounded-xl transition-all duration-200 h-16 justify-end pb-1.5 ${(!selectedFilm || !selectedCinema || dateOptions.length === 0) ? "opacity-50 pointer-events-none" : ""}`}>
            <label className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              Chọn Ngày
            </label>
            <Select
              bordered={false}
              className="w-full font-medium pt-3"
              placeholder="Chọn ngày..."
              options={dateOptions}
              value={selectedDate ?? undefined}
              onChange={handleDateChange}
              disabled={!selectedFilm || !selectedCinema || dateOptions.length === 0}
              allowClear
            />
          </div>

          {/* Select Showtime */}
          <div className={`relative flex flex-col bg-gray-50 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 border border-gray-100 rounded-xl transition-all duration-200 h-16 justify-end pb-1.5 ${(!selectedDate || timeOptions.length === 0) ? "opacity-50 pointer-events-none" : ""}`}>
            <label className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pointer-events-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Suất Chiếu
            </label>
            <Select
              bordered={false}
              className="w-full font-medium pt-3"
              placeholder="Chọn suất..."
              options={timeOptions}
              value={selectedShowId ?? undefined}
              onChange={handleShowtimeChange}
              disabled={!selectedDate || timeOptions.length === 0}
              allowClear
            />
          </div>

          {/* Book Button */}
          <div className="w-full lg:pt-1">
            <button
              onClick={handleLinkBookTicket}
              disabled={!selectedShowId}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-[14px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedShowId
                  ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Mua Vé Ngay</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindBookQuickly;
