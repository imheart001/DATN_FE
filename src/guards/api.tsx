// api.js

import { ISeatKepting } from "../interface/model";

export const addSeat = async (newSeat: ISeatKepting) => {
  const response = await fetch(`http://127.0.0.1:8000/api/cache_seat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Thêm bất kỳ header nào bạn cần thiết
    },
    body: JSON.stringify(newSeat),
  });

  if (!response.ok) {
    throw new Error("Failed to add seat");
  }

  const result = await response.json();
  return result;
};

export const checkSeat = async (id: any) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/getReservedSeatsByTimeDetail/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Thêm bất kỳ header nào bạn cần thiết
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add seat");
  }

  const result = await response.json();
  return result;
};
