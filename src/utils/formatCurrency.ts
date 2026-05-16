export const formatCurrency = (price: number) => {
  const formatCurrency = price?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatCurrency;
};
export const formatter = (value: number) =>
  `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  export const formatterNumber = (value: number) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
