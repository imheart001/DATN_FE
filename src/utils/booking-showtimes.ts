import dayjs from "dayjs";
import { IBookingShowtimeRow } from "../interface/model";

export const BOOKING_WINDOW_DAYS = 5;

const DAYS_OF_WEEK = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

export interface BookingDateOption {
  key: string;
  label: string;
  isToday: boolean;
  showtimes: IBookingShowtimeRow[];
}

const normalizeTime = (time: string) => {
  if (!time) {
    return "00:00:00";
  }

  return time.length === 5 ? `${time}:00` : time;
};

export const sortBookingShowtimes = (showtimes: IBookingShowtimeRow[]) => {
  return [...showtimes].sort((left, right) => {
    const leftDateTime = dayjs(`${left.date}T${normalizeTime(left.time)}`);
    const rightDateTime = dayjs(`${right.date}T${normalizeTime(right.time)}`);

    return leftDateTime.valueOf() - rightDateTime.valueOf();
  });
};

export const groupBookingShowtimesByFilm = (
  showtimes: IBookingShowtimeRow[]
): Record<string, IBookingShowtimeRow[]> => {
  return sortBookingShowtimes(showtimes).reduce(
    (accumulator, showtime) => {
      const filmKey = String(showtime.film_id);
      if (!accumulator[filmKey]) {
        accumulator[filmKey] = [];
      }

      accumulator[filmKey].push(showtime);
      return accumulator;
    },
    {} as Record<string, IBookingShowtimeRow[]>
  );
};

export const getBookingDateOptions = (
  showtimes: IBookingShowtimeRow[],
  days = BOOKING_WINDOW_DAYS
): BookingDateOption[] => {
  const startDate = dayjs().startOf("day");

  return Array.from({ length: days }, (_, index) => {
    const currentDate = startDate.add(index, "day");
    const key = currentDate.format("YYYY-MM-DD");

    return {
      key,
      isToday: index === 0,
      label:
        index === 0
          ? "Hôm nay"
          : `${currentDate.format("DD/MM")} - ${DAYS_OF_WEEK[currentDate.day()]}`,
      showtimes: sortBookingShowtimes(
        showtimes.filter((showtime) => showtime.date === key)
      ),
    };
  });
};

export const getBookingEmptyMessage = ({
  cinemaId,
  filmId,
  showtimes,
  activeDate,
}: {
  cinemaId?: string | null;
  filmId?: string | number | null;
  showtimes: IBookingShowtimeRow[];
  activeDate: string;
}) => {
  if (!cinemaId || !filmId) {
    return "Vui lòng chọn rạp/phim trước";
  }

  if (showtimes.length === 0) {
    return "Rạp này chưa có lịch chiếu cho phim này";
  }

  const todayKey = dayjs().format("YYYY-MM-DD");
  const hasTodayShowtime = showtimes.some((showtime) => showtime.date === todayKey);

  if (activeDate === todayKey && !hasTodayShowtime) {
    return "Đã hết suất hôm nay, chọn ngày khác";
  }

  return "Chưa có suất chiếu cho ngày này";
};

export const getNextShowtime = (showtimes: IBookingShowtimeRow[]) => {
  return sortBookingShowtimes(showtimes)[0] ?? null;
};

export const extractLimitAge = (limitAge: string | number | null | undefined) => {
  const matchedAge = String(limitAge ?? "").match(/\d+/);

  return matchedAge ? Number(matchedAge[0]) : 0;
};

export const formatShowtimeLabel = (time: string) => {
  return normalizeTime(time).slice(0, 5);
};
