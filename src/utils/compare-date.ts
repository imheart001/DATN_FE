export const compareDates = (releaseDate: string, enđate: string) => {
  const date1 = new Date(releaseDate).getTime();
  const date2 = new Date(enđate).getTime();
  const curentDate = new Date().getTime();

  if (date1 <= curentDate && curentDate <= date2) {
    return true;
  } else {
    return false;
  }
};

export const compareReleaseDate = (releaseDate: string) => {
  const resleaseDateMovie = new Date(releaseDate).getTime();
  const curentDate = new Date().getTime();

  return curentDate < resleaseDateMovie ? true : false;
};
// utils/formatDate.js
export const formatDatee = (dateString: string) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString("vn-VN", options);
};
