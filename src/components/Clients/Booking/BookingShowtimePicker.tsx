import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { IBookingShowtimeRow } from "../../../interface/model";
import {
  BOOKING_WINDOW_DAYS,
  formatShowtimeLabel,
  getBookingDateOptions,
  getBookingEmptyMessage,
} from "../../../utils/booking-showtimes";

interface BookingShowtimePickerProps {
  cinemaId?: string | null;
  filmId?: string | number | null;
  showtimes: IBookingShowtimeRow[];
  onSelectShowtime: (showId: string) => void;
  selectionKey?: string | number | null;
}

const BookingShowtimePicker = ({
  cinemaId,
  filmId,
  showtimes,
  onSelectShowtime,
  selectionKey,
}: BookingShowtimePickerProps) => {
  const dateOptions = useMemo(
    () => getBookingDateOptions(showtimes, BOOKING_WINDOW_DAYS),
    [showtimes]
  );

  const [activeDate, setActiveDate] = useState(
    dateOptions[0]?.key ?? dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const nextDate =
      dateOptions.find((option) => option.showtimes.length > 0)?.key ??
      dateOptions[0]?.key ??
      dayjs().format("YYYY-MM-DD");

    setActiveDate(nextDate);
  }, [dateOptions, selectionKey]);

  const activeDateOption =
    dateOptions.find((option) => option.key === activeDate) ?? dateOptions[0];

  const emptyMessage = getBookingEmptyMessage({
    cinemaId,
    filmId,
    showtimes,
    activeDate: activeDateOption?.key ?? dayjs().format("YYYY-MM-DD"),
  });

  retun (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dateOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setActiveDate(option.key)}
            className={`min-w-fit rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeDate === option.key
                ? "border-[#EE2E24] bg-[#EE2E24] text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {activeDateOption?.showtimes?.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeDateOption.showtimes.map((showtime) => (
            <button
              key={showtime.show_id}
              type="button"
              onClick={() => onSelectShowtime(String(showtime.show_id))}
              disabled={Number(showtime.available_seats) <= 0}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                Number(showtime.available_seats) > 0
                  ? "border-slate-200 bg-white hover:border-[#EE2E24] hover:shadow-md"
                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              }`}
            >
              <div className="text-lg font-semibold text-slate-900">
                {formatShowtimeLabel(showtime.time)}
              </div>
              <div className="text-sm text-slate-500">{showtime.room_name}</div>
              <div className="mt-2 text-sm font-medium text-[#EE2E24]">
                {Number(showtime.available_seats) > 0
                  ? `${showtime.available_seats} ghế trống`
                  : "Hết ghế"}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default BookingShowtimePicker;
