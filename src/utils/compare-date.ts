export const compareDates = (releaseDate: string, enđate: string) => {
  const date1 = new Date(releaseDate).getTime();
  const date2 = new Date(enđate).getTime();
const curentDate = new Date().getTime()

  if (date1 < curentDate && curentDate < date2) {
    return true
  } else {
    return false
  }
};
