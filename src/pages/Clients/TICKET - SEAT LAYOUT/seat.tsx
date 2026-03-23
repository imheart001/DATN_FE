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
  kepted = "kepted",
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
  // const paymentLink = useGetPaybyTranferQuery(totalMoney + totalComboAmount);

  // const paymentLinkMoMo = usePaymentMomoQuery(totalMoney + totalComboAmount);

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

  const onHandleNextStep = () => {
    if (selectedSeatsCount === 0) {
      message.error("Vui lòng chọn ít nhất một ghế để đặt vé.");
      return;
    }
    const seatNearOutermost = selectedSeats.find((seat) => seat.column === 10);

    if (seatNearOutermost) {
      const NearSeatOutermost = seatNearOutermost?.row;
      const test3 = seats[NearSeatOutermost].find(
        (seat) =>
          seat.row === NearSeatOutermost &&
          seat.column === seatNearOutermost?.column + 1
      );
      console.log(test3);
      if (seatNearOutermost && test3?.status === "available") {
        message.error(
          "Bạn không được bỏ trống ghế " +
            getRowName(seatNearOutermost.row) +
            (seatNearOutermost.column + 2)
        );
        return;
      }
    }

    const findSeats = () => {
      for (let i = 0; i < selectedSeats.length - 1; i++) {
        const seat1 = selectedSeats[i];

        for (let j = i + 1; j < selectedSeats.length; j++) {
          const seat2 = selectedSeats[j];

          if (
            seat1.row === seat2.row &&
            Math.abs(seat1.column - seat2.column) === 2
          ) {
            return [seat1, seat2];
          }
        }
      }

      return null;
    };

    const result = findSeats();
    if (result) {
      const rowCheck = result
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.row === item.row)
        )
        .map((item) => item.row)[0];

      const seatBetween = seats[rowCheck].find(
        (seat: any) =>
          seat.row === rowCheck &&
          seat.column === (result[0]?.column + result[1]?.column) / 2
      );
      console.log(seatBetween);
      if (result && seatBetween?.status === "available") {
        message.error(
          "Bạn không được bỏ trống ghế " +
            getRowName(seatBetween.row) +
            (seatBetween.column + 1)
        );
        return;
      }
    }
    if (selectedSeats) {
      const rowseatCheck = selectedSeats
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.row === item.row)
        )
        .map((item) => item.row)[0];
      const seatChoosing = selectedSeats.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.row === item.row)
      );
      console.log(seatChoosing);

      const seat2 = selectedSeats
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.row === item.row)
        )
        .map((item) => item.column)[0];
      console.log(seat2);

      console.log(seats[rowseatCheck]);
      const seatFinded = seats[rowseatCheck].map((s) => s.column);
      console.log(seatFinded);

      console.log(seatFinded);
      const findSeats = () => {
        const result = [];

        for (let i = 0; i < seatFinded.length; i++) {
          if (seat2 && Math.abs(seat2 - seatFinded[i]) === 2) {
            result.push(seatFinded[i]);
          }
        }

        return result.length > 0 ? result : null;
      };

      const testtt = findSeats();
      console.log(testtt);
      if (testtt && seatChoosing) {
        if (seats[rowseatCheck][testtt[1]]?.status === "booked") {
          const seatBetween = seats[rowseatCheck].find(
            (seat: any) =>
              seat.row === rowseatCheck &&
              seat.column ===
                (seats[rowseatCheck][testtt[1]]?.column +
                  seatChoosing[0]?.column) /
                  2
          );
          console.log(seatBetween);

          if (
            (seats[rowseatCheck][testtt[0]]?.status === "booked" ||
              seats[rowseatCheck][testtt[1]]?.status === "booked") &&
            seatBetween?.status === "available"
          ) {
            message.error(
              "Bạn không được bỏ trống ghế " +
                getRowName(seatBetween.row) +
                (seatBetween.column + 1)
            );
            return;
          }
        } else if (seats[rowseatCheck][testtt[0]]?.status === "booked") {
          const seatBetween = seats[rowseatCheck].find(
            (seat: any) =>
              seat.row === rowseatCheck &&
              seat.column ===
                (seats[rowseatCheck][testtt[0]]?.column +
                  seatChoosing[0]?.column) /
                  2
          );
          console.log(seatBetween);

          if (
            (seats[rowseatCheck][testtt[0]]?.status === "booked" ||
              seats[rowseatCheck][testtt[1]]?.status === "booked") &&
            seatBetween?.status === "available"
          ) {
            message.error(
              "Bạn không được bỏ trống ghế " +
                getRowName(seatBetween.row) +
                (seatBetween.column + 1)
            );
            return;
          }
        }
      }
    }
    setShowPopCorn(!showPopCorn);
  };
  // const test3 = seats.find(
  //   (seat) => seat.row === testttt?.row && seat.column === testttt?.column + 1
  // );

  // console.log(test3);
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

    // window.location.href = `${paymentLink?.data?.data}`;
    // Rest of the code...
  };

  const handlePaymentMomo = () => {
    if (!selectedPaymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    // window.location.href = `${paymentLinkMoMo?.data?.payUrl}`;
  };
  const handleSeatClick = async (row: number, column: number) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[row][column];
    const lastSelectedSeat = selectedSeats[selectedSeats.length - 1];

    // const ChooseEeatKeping = `${getRowName(lastSelectedSeat?.row)}${
    //   lastSelectedSeat?.column + 1
    // }`;
    // const seatKeping = {
    //   id_time_detail: id,
    //   id_user: userId.id,
    //   selected_seats: ChooseEeatKeping,
    // };
    // const reponse = await keptSeat(seatKeping);

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

    setSeats(updatedSeats);
  };

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

  const parseSeatName = (seatName: string) => {
    const row = seatName.charCodeAt(0) - "A".charCodeAt(0);
    const column = parseInt(seatName.slice(1)) - 1;
    return [row, column];
  };

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

  const applyDiscount = () => {
    if (selectedVoucherInfo) {
      if (selectedVoucherInfo.limit === 1) {
        // Giảm giá theo giá trị cố định
        return selectedVoucherInfo.price_vocher;
      } else if (selectedVoucherInfo.limit === 2) {
        // Giảm giá theo phần trăm
        const discountPercentage = selectedVoucherInfo.price_vocher;
        if (
          (totalMoney + totalComboAmount) * (discountPercentage / 100) >
          discountPercentage
        ) {
          return discountPercentage;
        } else {
          return (totalMoney + totalComboAmount) * (discountPercentage / 100);
        }
      }
    }
    return 0; // Nếu không có voucher hoặc không phù hợp với các điều kiện trên
  };
  const discountAmount = applyDiscount();

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
                          {infoSeat.status === SeatStatus.kepted &&
                            infoSeat.type === SeatType.normal && (
                              <span>
                                <img
                                  className="scale-120 inline-block ml-10 mt-5"
                                  title="..."
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nO2UQQoCMQxF/wUUdO/as4gbYfCSIngHvYRrdaugC0loSqSiMItW2zrKyPRDNmXmv+TTFCjqrK6KEVssSXBhC02pxz8rUoyToSQ4pgI9DZycVzTYTfoptFaLaHBOvC+mPqdMrE1WAQelih4ZzFiwzY5YsCODynlFR11rYOAMcqCqGEaDyGDKggML9mQwuV80wTz5JhtUIT+v3Af1rt2ZKvqp4Ge8Pj+vQmuQuz7Ra8VtA+fq/8D8q6eTC9h2JWo0rLe+JNiQYN00+Fu+Re3WDfJnklf/Hbx3AAAAAElFTkSuQmCC"
                                />
                              </span>
                            )}
                          {infoSeat.status === SeatStatus.kepted &&
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
        <section className="col-span-1">
          <div className="bg-[#F3F3F3] space-y-2 rounded-lg px-4 py-10 shadow-lg shadow-cyan-500/50">
            <div className="mx-auto">
              <button
                onClick={onHandleNextStep}
                className={` ${
                  showPopCorn
                    ? "hidden"
                    : "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                }`}
              >
                Tiếp tục
              </button>
              <button
                onClick={handlePaymentVnpay}
                className={` ${
                  showPopCorn && choosePayment === 1
                    ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                    : "hidden"
                }`}
              >
                Thanh toán
              </button>
              <button
                onClick={handlePaymentMomo}
                className={` ${
                  showPopCorn && choosePayment === 2
                    ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                    : "hidden"
                }`}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </section>
      </section>
      <hr className="mt-10 w-full border-2 border-[#F3F3F3]" />
    </>
  );
};

export default BookingSeat;
