import { useMemo } from "react";
import { useGetBookingShowtimesQuery } from "../service/show.service";
import {
  groupBookingShowtimesByFilm,
  sortBookingShowtimes,
} from "../utils/booking-showtimes";

interface UseBookingShowtimesOptions {
  cinemaId?: string | null;
  filmId?: string | null;
  dateFrom?: string;
  days?: number;
}

export const useBookingShowtimes = ({
  cinemaId,
  filmId,
  dateFrom,
  days,
}: UseBookingShowtimesOptions) => {
  const { data, isLoading, isFetching, error } = useGetBookingShowtimesQuery(
    {
      cinemaId: cinemaId ?? "",
      filmId,
      dateFrom,
      days,
    },
    {
      skip: !cinemaId,
    }
  );

  const showtimes = useMemo(
    () => sortBookingShowtimes((data as any)?.data ?? []),
    [data]
  );

  const showtimesByFilm = useMemo(
    () => groupBookingShowtimesByFilm(showtimes),
    [showtimes]
  );

  return {
    showtimes,
    showtimesByFilm,
    isLoading,
    isFetching,
    error,
  };
};
