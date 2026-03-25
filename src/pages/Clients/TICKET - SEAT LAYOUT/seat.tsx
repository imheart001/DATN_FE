import { useEffect, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { NavLink, useParams } from "react-router-dom";
import { useFetchChairsQuery } from "../../../service/chairs.service";
import { useGetAllDataShowTimeByIdQuery } from "../../../service/show.service";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/isLoading/Loading";
import {
  setShowtimeId,
  setSelectSeats,
  setTotalPrice,
  setComboFoods,
  setChooseVoucher,
} from "../../../components/CinemaSlice/selectSeat";

import { useFetchFoodQuery } from "../../../service/food.service";
import { useFetchVoucherQuery } from "../../../service/voucher.service";
import * as dayjs from "dayjs";
import {
  useGetAllSeatKepingsQuery,
  useKeptSeatMutation,
} from "../../../service/seatkeping.service";
import { useGetPaybyTranferQuery } from "../../../service/payVnpay.service";
import { usePaymentMomoQuery } from "../../../service/payMoMo.service";

enum SeatStatus {
  Available = "available",
  Booked = "booked",
  Selected = "selected",
  Kepted = "kepted",
  Reserved = "Reserved",
}
enum SeatType {
  normal = "normal",
  VIP = "vip",
}
interface SeatInfo {
  row: number;
  column: number;
  status: SeatStatus;
  type: SeatType;
  price: number;
}

const BookingSeat = () => {
  const { id } = useParams();
  const { data: dataAllByTime_Byid } = useGetAllDataShowTimeByIdQuery(
    id as string
  );
  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };
  const { data: DataSeatBooked, isLoading } = useFetchChairsQuery();
  const { data: foods } = useFetchFoodQuery();
  const { data: dataVouchers } = useFetchVoucherQuery();
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const { data: dataSeatKeping } = useGetAllSeatKepingsQuery(id);
  const [keptSeat] = useKeptSeatMutation();
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  const [totalComboAmount, setTotalComboAmount] = useState(0);
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [foodQuantities, setFoodQuantities] = useState<any[]>([]);
  const [foodQuantitiesUI, setFoodQuantitiesUI] = useState<{
    [key: string]: { quantity: number; price: number };
  }>({});

  const totalMoney = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0
  );
  const dispatch = useDispatch();

  const onHandleChooseVC = (voucherId: string, voucherCode: string) => {
    setSelectedVoucher(selectedVoucher === voucherId ? null : voucherId);
    dispatch(setChooseVoucher(voucherCode));
  };

  dispatch(setComboFoods(foodQuantities));

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [choosePayment, setChoosePayment] = useState(1);

  const [seatInfo, setSeatInfo] = useState<{
    [key: string]: { quantity: number; totalPrice: number };
  }>({});
  const handlePaymentMethodClick = (method: any) => {
    setSelectedPaymentMethod(method);
    setChoosePayment(method);
  };
  {
    choosePayment &&
      localStorage.setItem("payment", JSON.stringify(choosePayment));
  }

  const numRows = 12;
  const numColumns = 12;

  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);

  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);

  const [showPopCorn, setShowPopCorn] = useState(false);

  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 5 && column >= 2 && column <= 7;
  };

  const parseSeatNames = (seatNamesString: any) => {
    return seatNamesString.split(",").map((name: any) => name.trim());
  };
  const seatBooked = (DataSeatBooked as any)?.data || [];

  // Lọc ra các phần tử có id_time_detail trùng với id từ URL params
  const filteredSeats = seatBooked.filter(
    (item: any) => `${item.id_time_detail}` === id
  );

  const bookedSeatNames =
    filteredSeats
      .map((item: any) => parseSeatNames(item.name))
      .flat()
      .flat() || [];

  const [seats, setSeats] = useState<SeatInfo[][]>(
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        const type = isVIPSeat(rowIndex, columnIndex)
          ? SeatType.VIP
          : SeatType.normal;
        const seatName = `${String.fromCharCode(65 + rowIndex)}${
          columnIndex + 1
        }`;
        const status = bookedSeatNames.includes(seatName)
          ? SeatStatus.Booked
          : SeatStatus.Available;
        const price =
          status === SeatStatus.Booked
            ? 0
            : type === SeatType.VIP
            ? 50000
            : 45000; // Đặt giá cho từng loại ghế
        return {
          row: rowIndex,
          column: columnIndex,
          status,
          type,
          price,
        };
      })
    )
  );

  useEffect(() => {
    const seatBooked = (DataSeatBooked as any)?.data || [];

    // Lọc ra các phần tử có id_time_detail trùng với id từ URL params
    const filteredSeats = seatBooked.filter(
      (item: any) => `${item.id_time_detail}` === id
    );

    // Tạo một danh sách tên ghế từ filteredSeats
    const bookedSeatNames = filteredSeats
      .map((item: any) => parseSeatNames(item.name))
      .flat();

    // Tạo một bản sao mới của mảng ghế
    const updatedSeats = [...seats];
    const parseSeatName = (seatNamesString: any) => {
      return seatNamesString.split(",").map((name: any) => name.trim());
    };
    console.log(parseSeatName("A4"));
    // Duyệt qua các ghế đã đặt và cập nhật trạng thái của chúng
    bookedSeatNames.forEach((seatName: any) => {
      const [rowIndex, columnIndex] = parseSeatName(seatName);
      if (
        rowIndex >= 0 &&
        rowIndex < numRows &&
        columnIndex >= 0 &&
        columnIndex < numColumns
      ) {
        updatedSeats[rowIndex][columnIndex].status = SeatStatus.Booked;
      }
    });

    // Cập nhật mảng ghế trong trạng thái
    setSeats(updatedSeats);
  }, [(DataSeatBooked as any)?.data]);

  useEffect(() => {}, [foodQuantitiesUI, dispatch]);

  const handlePaymentVnpay = () => {
    if (!selectedPaymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }
  };

  const handlePaymentMomo = () => {
    if (!selectedPaymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }
  };
  const handleSeatClick = async (row: number, column: number) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[row][column];
    if (seat.status === SeatStatus.Available) {
      const selectedPrice = seat.type === SeatType.VIP ? 50000 : 45000;

      if (selectedSeatsCount < 8) {
        updatedSeats[row][column] = {
          ...seat,
          status: SeatStatus.Selected,
          price: selectedPrice,
        };
        setSeatInfo((prevSeatInfo) => {
          const seatType = seat.type;
          const prevQuantity = prevSeatInfo[seatType]?.quantity || 0;
          const prevTotalPrice = prevSeatInfo[seatType]?.totalPrice || 0;

          return {
            ...prevSeatInfo,
            [seatType]: {
              quantity: prevQuantity + 1,
              totalPrice: prevTotalPrice + selectedPrice,
            },
          };
        });
        setSelectedSeats([...selectedSeats, updatedSeats[row][column]]);
        setSelectedSeatsCount(selectedSeatsCount + 1);
      } else {
        message.warning("Bạn chỉ có thể chọn tối đa 8 ghế trong một lần mua.");
      }
    } else if (seat.status === SeatStatus.Selected) {
      updatedSeats[row][column] = {
        ...seat,
        status: SeatStatus.Available,
        price: 0,
      };
      setSeatInfo((prevSeatInfo) => {
        const seatType = seat.type;
        const prevQuantity = prevSeatInfo[seatType]?.quantity || 0;
        const prevTotalPrice = prevSeatInfo[seatType]?.totalPrice || 0;

        return {
          ...prevSeatInfo,
          [seatType]: {
            quantity: prevQuantity - 1,
            totalPrice: prevTotalPrice - seat.price,
          },
        };
      });
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
      setSelectedSeatsCount(selectedSeatsCount - 1);
    }
    if (seat.type === SeatType.normal && seat.status === SeatStatus.Available) {
      updatedSeats[row][column] = {
        ...seat,
        status: SeatStatus.Kepted,
        price: 0, // Có thể đặt giá là 0 cho trạng thái giữ ghế
      };

      // Cập nhật mảng ghế trong trạng thái
      setSeats(updatedSeats);

      // Gọi mutation để đặt ghế vào trạng thái giữ ghế
      const seatKeping = {
        id_time_detail: id,
        id_user: userId.id,
        selected_seats: `${getRowName(row)}${column + 1}`,
      };
      await keptSeat(seatKeping);
    }
    setSeats(updatedSeats);
  };
  // useEffect(() => {
  //   // ... (existing code)
  //   const parseSeatName = (seatNamesString: any) => {
  //     return seatNamesString.split(",").map((name: any) => name.trim());
  //   };
  //   // Fetch and display seats kepted by user A
  //   const keptedSeats = dataSeatKeping?.map((keptSeat: any) => {
  //     const [row, column] = parseSeatName(keptSeat.seatName);
  //     return {
  //       row,
  //       column,
  //       status: SeatStatus.Kepted,
  //       type: keptSeat.type,
  //       price: keptSeat.price,
  //     };
  //   });

  //   if (keptedSeats) {
  //     const updatedSeats = [...seats];
  //     keptedSeats.forEach((keptSeat: any) => {
  //       updatedSeats[keptSeat.row][keptSeat.column] = keptSeat;
  //     });
  //     setSeats(updatedSeats);
  //   }
  // }, [dataSeatKeping, seats]);

  const updateFoodQuantitiesUI = (
    foodId: string,
    change: number,
    price: number
  ) => {
    setFoodQuantitiesUI((prevQuantitiesUI) => {
      const updatedQuantity =
        (prevQuantitiesUI[foodId]?.quantity || 0) + change;
      const updatedPrice =
        (prevQuantitiesUI[foodId]?.price || 0) + change * price;

      setTotalComboAmount((prevTotal) => prevTotal + change * price); // Tổng số tiền của combo

      return {
        ...prevQuantitiesUI,
        [foodId]: {
          quantity: Math.max(0, updatedQuantity),
          price: updatedPrice,
        },
      };
    });
  };

  const handleQuantityChange = (
    foodId: string,
    change: number,
    price: number
  ) => {
    // Call the function to update state after rendering
    updateFoodQuantitiesUI(foodId, change, price);
  };
  useEffect(() => {
    const updatedFoodQuantities = Object.keys(foodQuantitiesUI).map(
      (foodId) => ({
        id_food: foodId,
        quantity: foodQuantitiesUI[foodId]?.quantity,
        price: foodQuantitiesUI[foodId]?.price,
      })
    );

    setFoodQuantities(updatedFoodQuantities);
  }, [foodQuantitiesUI]);
  const selectedSeatsInSelectedState = selectedSeats.filter(
    (seat) => seat.status === SeatStatus.Selected
  );

  const seatNames = selectedSeatsInSelectedState
    .map((seat) => `${getRowName(seat.row)}${seat.column + 1}`)
    .join(",");
  dispatch(setSelectSeats(seatNames));
  dispatch(setShowtimeId(id));

  if (isLoading) {
    return <Loading />; // Hoặc bạn có thể hiển thị thông báo "Loading" hoặc hiển thị một spinner
  }
  const date = dataAllByTime_Byid?.date;

  const dateObject = new Date(date);
  const daysOfWeek = [
    "CHỦ NHẬT",
    "THỨ HAI",
    "THỨ BA",
    "THỨ TƯ",
    "THỨ NĂM",
    "THỨ SÁU",
    "THỨ BẢY",
  ];
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();

  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const formattedDate = `${day}/${month}/${year}`;

  const selectedVoucherInfo = (dataVouchers as any)?.data.find(
    (vc: any) => vc.id === selectedVoucher
  );

  return (
    <>
      <Header />

      <div className="py-2 max-w-6xl border-t-2 my-20 border-cyan-500 shadow-xl shadow-cyan-500/50 text-center mx-auto bg-white rounded-xl">
        <h2 className="font-semibold ">
          THÔNG TIN ĐẶT VÉ - {dataAllByTime_Byid?.name_cinema} - {dayOfWeek},
          NGÀY {formattedDate}, {dataAllByTime_Byid?.time}
        </h2>
      </div>
      <section className="grid grid-cols-4 gap-4 max-w-6xl mx-auto ">
        <section className={` ${showPopCorn ? "hidden" : "col-span-3 "}`}>
          <section className="Screen  px-5">
            <img src="/ic-screen.png/" alt="" />
            <div className="status Seat flex space-x-[20px] items-center mx-auto  justify-center max-w-5xl">
              <div className="items-center flex ">
                <div className=" text-[#FFFFFF] px-6 py-5  bg-[#EE2E24] rounded-lg inline-block"></div>
                <span className="text-[17px] text-[#8E8E8E] mx-2">
                  Ghế đã bán
                </span>
              </div>
              <div className="items-center flex">
                <div className=" text-[#FFFFFF]  px-6 py-5  bg-[#8E8E8E] rounded-lg inline-block"></div>
                <span className="text-[17px] text-[#8E8E8E] mx-2">
                  Ghế trống
                </span>
              </div>
              <div className="items-center flex">
                <div className=" text-[#FFFFFF] px-6 py-5  bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg inline-block"></div>{" "}
                <span className="text-[17px] text-[#8E8E8E] mx-2">
                  Ghế đang chọn
                </span>
              </div>
            </div>
            <div className="Seat space-x-2 space-y-2 text-center mx-auto my-10">
              <table>
                <tbody>
                  <tr>
                    <th></th>

                    {Array.from({ length: numColumns }, (_, index) => (
                      <th key={index} className="text-white">
                        {index + 1}
                      </th>
                    ))}
                  </tr>
                  {seats.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-white">
                      <th>{getRowName(rowIndex)}</th>
                      {row.map((infoSeat, columnIndex) => (
                        <td
                          key={columnIndex}
                          className={`seat-${infoSeat.type} ${infoSeat.status} `}
                          onClick={() => handleSeatClick(rowIndex, columnIndex)}
                        >
                          {infoSeat.status === SeatStatus.Available &&
                            infoSeat.type === SeatType.normal && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg=="
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Selected &&
                            infoSeat.type === SeatType.normal && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzElEQVR4nO2UTQrCMBCF3wUUdO/as4gboXhJEbyDvYLQZLryZ6ugF3ilVVGhwSRtpZJ8MJuSvi8zHQpEwiXnBJprCG8Q0rHKdzbIOHWXCs8ews/SvFRZ1tw7bSZ9yVf2Yr/xmsRXFzFbLWvCE2ccQHEBoWrwbQ8QJlWWM3uOHgHu0h3H9iLNOYQnaB6hOKue5Vx6dJwY82opD7zfukQ4dBY/x1uXV4tpKXyXyXrJpG9iX/5PLL/6kUgUM5RRt418F6cQbjsQp53kRnpNAYGXZLhQ5IrJAAAAAElFTkSuQmCC"
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Available &&
                            infoSeat.type === SeatType.VIP && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2SsQ4BMRjHuxhJ2LyKMN0kCMnFU/AaEk+FuMHGargJT3Bn/0npQu6qpT2XuN/UfP33+7VfKkRFGQFqwBzYASmQqPVM7vmStoED+exl5lvJGNgAVz5Hnl0DI1PpEvcsTF7qi6FOLMdrSgfoWuRXOnFqIZC1nkU+0YmxEGCbFxpxHZgAR9xxAkLZW/vB1AWa6oALaStPMgAuKngG+qo+dSAOcx08Fk+3VOGGA/F9vJkOIH5Nv/lsxmj6xLIY/EAcZG4Ix+T2L43YN6IS/9+ohWfIEEfAtgBxVISnohzcAJ9YNflpnJMiAAAAAElFTkSuQmCC"
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Selected &&
                            infoSeat.type === SeatType.VIP && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDklEQVR4nO2SPUoDURRGv8ZSQTu3IlqlEhWF4Cp0G4Kr0mAKGzGN6Lt30mhcQUx/JGNik3kzI/PDgHPgg+G9O/e8P6mnkzyxJeNaxqOcLznz9Dtwlc41wiv7ciZyyIzxnNZUIuFcxkjOIioqzkLGvZyzclLjtoIslpvindYvXec0b7ej0o0SDhQ4LF1v3MXFPy+1nGA5Zhz9YUHzPDGlBbHk1Ud5Y1uBCzmhtrs1PuQM096FvLO7+qG69IW9bIlxIudzVThT4DgdT7isYcfDuMOYbaxyibNTWbw+XstyGNPoI6gqjvUxplJg0Lo4MMieqBuP9e+M2BvOL73Y/81RN41visdyHloQj1vx9HSCb4vVGyTN161SAAAAAElFTkSuQmCC"
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Kepted &&
                            infoSeat.type === SeatType.normal && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nO2UQQoCMQxF/wUUdO/as4gbYfCSIngHvYRrdaugC0loSqSiMItW2zrKyPRDNmXmv+TTFCjqrK6KEVssSXBhC02pxz8rUoyToSQ4pgI9DZycVzTYTfoptFaLaHBOvC+mPqdMrE1WAQelih4ZzFiwzY5YsCODynlFR11rYOAMcqCqGEaDyGDKggML9mQwuV80wTz5JhtUIT+v3Af1rt2ZKvqp4Ge8Pj+vQmuQuz7Ra8VtA+fq/8D8q6eTC9h2JWo0rLe+JNiQYN00+Fu+Re3WDfJnklf/Hbx3AAAAAElFTkSuQmCC"
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Kepted &&
                            infoSeat.type === SeatType.VIP && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nO2SsUoDQRCGv8ZSQTtfRbRKJSoKwafQ1xB8Kg2mSKetRSrjEySBm72dMLLxbMLtZfXuwoH3w8CyOzvf7j8DvbooM/Yy5V6UiSgLUeZhnSl34awV6NI4FuXNrbCyEOU15NSCiOdalJEoyxhoW6zvKs/iuUqCuhWPf4VVxMPWn7YA/XbAcxkHK6PUQrlxkhunv4A/VYEXqYCwlxtnqfmizKv6a6mACiei+cRkxr54bpzy3lh/lQ/xDEPtygErHnAYLjQBNeOovK+eC6d8Fokz8ZyvbVduG5jkYZThlNnmK4tfH9QF/9hbynDKNDYEdcHROsqUzDPYNTjzDEoPaFjR+p0Bu5aDHuz+ndW0LLfJEWUsykvbYNkRp1c39AVmSVDybGInBwAAAABJRU5ErkJggg=="
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Booked &&
                            infoSeat.type === SeatType.normal && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyElEQVR4nO2UQQrCMBRE5wJW2ua7c+1ZxI1QvKQI3kEv4VrdKtgLTKkpFKSR5hul0gzMJoR5yZAfIGq0ItI5YXaElITQ0yVh9kS+UEDlpgC++l5neYCfN2Ugbz3AqnpdfviAGdIR/KbqfELM1oScPqj4TEhRZ/Wuuj3ANG0CFNAk8wCZFSFXQi6EWTYPbaMAF668TtkN7antWpb4g229XXmdco2Bdnx6jxWHBtbq/8D81dfJCMZYqkZg9QCbIyGH8GDzldyoYasCCEEvQA5QsjIAAAAASUVORK5CYII="
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.Booked &&
                            infoSeat.type === SeatType.VIP && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVR4nO2UwWoCMRRF76ZLp6jvDfgroitXpYqC9CvsbxT8Klvqwl3dunBV/YLR/ZU400WpiRMnIwOdCw8CuXknuQkBalVRBB4IfSVkRciB0CQd68zMlQSVDiFrQmmpL+MpCInHhH4QcnSArtR57TvRHuU92fx2mLXe8pw0NPQngaEDbOLN3axLaM/Dv3DFfPAA9Ajpe/gT14npAaCvH3Zwu0HEE0I3Ae/3m9Cp6e18YOkGHpvZggDQqGW712dC95lxR8hTFvtLAPDUyuB58HuXqbkVFQen8V5kELK1PYKiYHsf2ZpPY3B/cDy4OIHAsvavDJglF2ow/13UKFn8C5YloZ/lg+UunFrV0Amvia/Scg88fQAAAABJRU5ErkJggg=="
                                />
                              </span>
                            )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </section>
      <hr className="mt-10 w-full border-2 border-[#F3F3F3]" />
    </>
  );
};

export default BookingSeat;
