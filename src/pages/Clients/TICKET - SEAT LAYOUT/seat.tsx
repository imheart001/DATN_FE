import { useEffect, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFetchChairsQuery } from "../../../service/chairs.service";
import { useGetAllDataShowTimeByIdQuery } from "../../../service/show.service";
import { Button, Col, InputNumber, Row, Space, Statistic, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/isLoading/Loading";
import Pusher from "pusher-js";
import { setKepted } from "../../../components/CinemaSlice/seatkeep";
import {
  setShowtimeId,
  setSelectSeats,
  setTotalPrice,
  setComboFoods,
  setChooseVoucher,
  setChangePoint,
  setTotalPriceSeat,
} from "../../../components/CinemaSlice/selectSeat";

import { useFetchFoodQuery } from "../../../service/food.service";
import {
  useFetchVoucherQuery,
  useGetVoucherbyIdUserQuery,
} from "../../../service/voucher.service";
import * as dayjs from "dayjs";
import {
  useGetAllSeatKepingsQuery,
  useKeptSeatMutation,
} from "../../../service/seatkeping.service";
import type { CountdownProps } from "antd";

import { checkSeat } from "../../../guards/api";
import { useSendPaymentVnPayMutation } from "../../../service/payVnpay.service";
import { useGetPointByIdUserQuery } from "../../../service/member.service";
import { usePaymentMomoMutation } from "../../../service/payMoMo.service";
import Changepoint from "../../../components/Clients/PointChange/changpoint";
import { usePaymentCoinsMutation } from "../../../service/usecoin.service";
import PaymentCoin from "../Payment/PaymentCoin";
import { useAVG_FilmsQuery } from "../../../service/films.service";

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
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 10);
  const [countdownKey, setCountdownKey] = useState(1); // Change key to reset Countdown

  const navigate = useNavigate();

  const startCountdown = () => {
    setDeadline(Date.now() + 1000 * 60 * 10);
    setCountdownKey((prevKey) => prevKey + 1); // Change key to reset Countdown
  };

  const onFinish = () => {
    navigate("/");
  };

  const { Countdown } = Statistic;
  const [sendPaymentVnpay] = useSendPaymentVnPayMutation();

  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };
  // const [keepSeat, setkeepSeat] = useState<[]>([]);
  const { data: DataSeatBooked, isLoading } = useFetchChairsQuery();
  const [seatingSelect, setSeatingSelect] = useState("");
  const { data: foods } = useFetchFoodQuery();
  const { data: dataVouchers } = useFetchVoucherQuery();
  const [payMomo] = usePaymentMomoMutation();
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const {
    data: dataSeatKeping,
    refetch,
    isLoading: LoadingSeat,
  } = useGetAllSeatKepingsQuery(`${id}`);

  const [keptSeat] = useKeptSeatMutation();
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  // const fetchData = async () => {
  //   try {
  //     const data = await checkSeat(id);
  //     setkeepSeat(data);
  //   } catch (error) {
  //     console.error("Lỗi khi kiểm tra ghế đã đặt:", error);
  //   }
  // };

  // useEffect(() => {
  //   refetch();
  //   // fetchData();
  // }, [refetch, selectedSeats, id]);

  const [totalComboAmount, setTotalComboAmount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const [point, setPoint] = useState(null);

  const [foodQuantities, setFoodQuantities] = useState<any[]>([]);

  const [foodQuantitiesUI, setFoodQuantitiesUI] = useState<{
    [key: string]: { quantity: number; price: number };
  }>({});

  const totalMoney = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0
  );
  // console.log(totalMoney + totalComboAmount);

  const dispatch = useDispatch();

  const onHandleChooseVC = (voucherId: string, voucherCode: string) => {
    const selectedVoucherInfo = (dataVouchers as any)?.data.find(
      (vc: any) => vc?.id === voucherId
    );

    if (selectedVoucherInfo) {
      if (totalMoney + totalComboAmount < selectedVoucherInfo?.minimum_amount) {
        // Show warning message

        message.warning(
          `Số tiền không đủ để áp dụng voucher "${voucherCode}".`
        );
        setSelectedVoucher(null);
        return;
      }
    }

    // Allow selecting the voucher
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

  const { data: PointUser } = useGetPointByIdUserQuery(userId?.id);
  // console.log(PointUser);
  const { data: VoucherUsedbyUser } = useGetVoucherbyIdUserQuery(userId?.id);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);

  const [showPopCorn, setShowPopCorn] = useState(false);

  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const parseSeatNames = (seatNamesString: any) => {
    return seatNamesString.split(",").map((name: any) => name.trim());
  };
  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 9 && column >= 2 && column <= 10;
  };
  const seatBooked = (DataSeatBooked as any)?.data || [];
  const filteredSeats = seatBooked.filter(
    (item: any) => `${item?.id_time_detail}` === id
  );
  const bookedSeatNames =
    filteredSeats
      .map((item: any) => parseSeatNames(item.name))
      .flat()
      .flat() || [];
  // console.log(bookedSeatNames);
  const findData = dataSeatKeping?.map((s: any) => s.seat) || [];

  const [seats, setSeats] = useState<SeatInfo[][]>(
    // Initialize seats array based on the keptSeat data
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        const type = isVIPSeat(rowIndex, columnIndex)
          ? SeatType.VIP
          : SeatType.normal;
        const seatName = `${String.fromCharCode(65 + rowIndex)}${
          columnIndex + 1
        }`;
        const isBooked = bookedSeatNames.includes(seatName);
        const isKepted = findData.includes(seatName);

        // Set status directly to Kepted if the seat is kept
        const status = isBooked
          ? SeatStatus.Booked
          : isKepted
          ? SeatStatus.Kepted
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

  const seatBookedByIdTimeDetail = DataSeatBooked?.filter(
    (data: any) => data.id_time_detail == id
  );
  const seatNameBooked = seatBookedByIdTimeDetail?.map(
    (seat: any) => seat.seat
  );
  useEffect(() => {
    const updatedSeats = [...seats];
    const parseSeatName = (seatName: any) => {
      const row = seatName.charAt(0).charCodeAt(0) - "A".charCodeAt(0);
      const column = parseInt(seatName.slice(1)) - 1;
      return [row, column];
    };

    // Loop through the booked seats and set their status to "Booked"
    seatNameBooked?.forEach((seatName: any) => {
      const [rowIndex, columnIndex] = parseSeatName(seatName);
      // console.log(rowIndex, columnIndex);

      if (
        rowIndex >= 0 &&
        rowIndex < numRows &&
        columnIndex >= 0 &&
        columnIndex < numColumns
      ) {
        updatedSeats[rowIndex][columnIndex].status = SeatStatus.Booked;
      }
    });

    // Update the seats state with the modified seat statuses
    setSeats(updatedSeats);
  }, [DataSeatBooked]);

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
        const seatKeping = {
          id_time_detail: id,
          id_user: userId.id,
          selected_seats: `${getRowName(row)}${column + 1}`,
        };
        await keptSeat(seatKeping);
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
      const seatKeping = {
        id_time_detail: id,
        id_user: userId.id,
        selected_seats: `${getRowName(row)}${column + 1}`,
      };
      await keptSeat(seatKeping);
    }

    setSeats(updatedSeats);
  };

  console.log(selectedSeats);

  useEffect(() => {
    const pusher = new Pusher("d76cdda00e63582c39f9", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("Cinema");

    channel.bind("SeatKepted", function (data: any) {
      // Update the seat status based on the received data
      console.log(data);
      const parseSeatName = (seatName: any) => {
        const row = seatName.charAt(0).charCodeAt(0) - "A".charCodeAt(0);
        const column = parseInt(seatName.slice(1)) - 1;
        return [row, column];
      };

      const updatedSeats = [...seats];

      {
        data &&
          data?.forEach((s: any) => {
            const seatName = s.seat;

            const [rowIndex, columnIndex] = parseSeatName(seatName);
            console.log(rowIndex, columnIndex);

            const isSeatSelected = selectedSeats.some(
              (selectedSeat: any) =>
                selectedSeat.row === rowIndex &&
                selectedSeat.column === columnIndex
            );
            console.log(isSeatSelected);
            if (
              rowIndex >= 0 &&
              rowIndex < numRows &&
              columnIndex >= 0 &&
              columnIndex < numColumns
            ) {
              const seat = updatedSeats[rowIndex][columnIndex];

              if (
                data &&
                s.id_user == userId?.id &&
                s.id_time_detail == id &&
                isSeatSelected === true
              ) {
                // If id_user matches, update status to Selected
                seat.status = SeatStatus.Selected;
              } else {
                seat.status = SeatStatus.Available;
              }
              if (
                data &&
                s.id_user == userId?.id &&
                s.id_time_detail == id &&
                isSeatSelected === false
              ) {
                // If id_user matches, update status to Selected
                seat.status = SeatStatus.Kepted;
              }
              if (s.id_user != userId?.id && s.id_time_detail == id) {
                // If id_user doesn't match, update status to Kepted
                seat.status = SeatStatus.Kepted;
              }
              // Add condition to check if the seat is not in dataSeatKeping
              if (!data?.some((d: any) => d.seat === seatName)) {
                // If id_user doesn't match and seat is not in dataSeatKeping, update status to Available
                seat.status = SeatStatus.Available;
              }
            }
          });
      }

      updatedSeats.forEach((row, rowIndex) => {
        row.forEach((seat, columnIndex) => {
          const seatName = `${getRowName(rowIndex)}${columnIndex + 1}`;
          const isSeatInData = data.some((s: any) => s.seat == seatName);

          if (seat.status == SeatStatus.Kepted && !isSeatInData) {
            seat.status = SeatStatus.Available;
          }
        });
      });

      setSeats(updatedSeats);
    });

    return () => {
      // Unsubscribe from the Pusher channel when the component unmounts or when dataSeatKeping changes
      pusher.unsubscribe("Cinema");
    };
  }, [dataSeatKeping, selectedSeats]);

  useEffect(() => {
    const pusher = new Pusher("d76cdda00e63582c39f9", {
      cluster: "ap1",
    });
    return () => {
      pusher.unsubscribe("Cinema");
      pusher.disconnect();
    };
  }, []);
  useEffect(() => {}, [foodQuantitiesUI, dispatch]);
  useEffect(() => {
    // Calculate the total amount before discount
    const totalAmount = totalMoney + totalComboAmount;

    // Check if a voucher is selected
    if (selectedVoucher) {
      const selectedVoucherInfo = (dataVouchers as any)?.data.find(
        (vc: any) => vc.id === selectedVoucher
      );

      if (selectedVoucherInfo) {
        // Check if the total amount is greater than or equal to the minimum amount required by the voucher
        if (totalAmount >= selectedVoucherInfo.minimum_amount) {
          // Calculate the discounted amount based on the voucher type
          let discount = 0;
          if (selectedVoucherInfo.limit === 1) {
            discount = selectedVoucherInfo.price_voucher;
          } else if (selectedVoucherInfo.limit === 2) {
            discount =
              (totalAmount * selectedVoucherInfo.percent) / 100 <=
              selectedVoucherInfo.price_voucher
                ? (totalAmount * selectedVoucherInfo.percent) / 100
                : selectedVoucherInfo.price_voucher;
          }

          // Set the discounted amount
          setDiscountedAmount(discount);
        } else {
          // Show a warning message if the total amount is not enough for the voucher
          message.warning(
            `Số tiền không đủ để áp dụng voucher "${selectedVoucherInfo.code}".`
          );

          // Reset the selected voucher
          setSelectedVoucher(null);
          setDiscountedAmount(0);
        }
      }
    } else {
      // Reset the discounted amount if no voucher is selected
      setDiscountedAmount(0);
    }
  }, [selectedVoucher, totalMoney, totalComboAmount, dataVouchers]);

  const handlePaymentVnpay = async () => {
    if (!selectedPaymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    // console.log(totalMoney + totalComboAmount + discountedAmount);

    if (point) {
      const money = {
        amount: totalMoney + totalComboAmount - discountedAmount - point,
      };
      const reponse = await sendPaymentVnpay(money);

      window.location.href = `${(reponse as any)?.data?.data}`;
    } else {
      const money = {
        amount: totalMoney + totalComboAmount - discountedAmount,
      };
      const reponse = await sendPaymentVnpay(money);

      window.location.href = `${(reponse as any)?.data?.data}`;
    }
  };

  // if (moneyByPoint) {
  //   setDiscountedPoint(moneyByPoint);
  // }
  dispatch(setChangePoint(point));

  const moneyByPoint = useSelector((state: any) => state.TKinformation?.point);

  const handlePaymentMomo = async () => {
    if (!selectedPaymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    if (point) {
      const money = {
        amount: totalMoney + totalComboAmount - discountedAmount - point,
      };
      const reponse = await payMomo(money);

      window.location.href = `${(reponse as any)?.data?.payUrl}`;
    } else {
      const money = {
        amount: totalMoney + totalComboAmount - discountedAmount,
      };
      const reponse = await payMomo(money);

      window.location.href = `${(reponse as any)?.data?.payUrl}`;
    }
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
    .map((seat: any) => `${getRowName(seat.row)}${seat.column + 1}`)
    .join(",");
  const formattedSeats = selectedSeatsInSelectedState.map((seat: any) => ({
    seat: `${getRowName(seat.row)}${seat.column + 1}`,
    price: seat.price,
  }));

  dispatch(setSelectSeats(seatNames));
  dispatch(setShowtimeId(id));
  if (point) {
    const moneyTotal1 =
      totalMoney + totalComboAmount - discountedAmount - point;
    dispatch(setTotalPrice(moneyTotal1));
    dispatch(setTotalPriceSeat(totalMoney));
  } else {
    const moneyTotal2 = totalMoney + totalComboAmount - discountedAmount;
    dispatch(setTotalPrice(moneyTotal2));
    dispatch(setTotalPriceSeat(totalMoney));
  }

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
  const onHandleNextStep = () => {
    if (selectedSeatsCount === 0) {
      message.error("Vui lòng chọn ít nhất một ghế để đặt vé.");
      return;
    }
    const seatNearOutermost = selectedSeats.filter(
      (seat) => seat.column === 10
    );
    // console.log(seatNearOutermost);
    // console.log(seats);
    seatNearOutermost.map((s) => {
      return s.row;
    });
    const seatHaveColumn11 = seatNearOutermost.map((s) => {
      return seats[s.row] && seats[s.row][s.column + 1];
    });
    const seatHaveColumn11Available = seatHaveColumn11.find(
      (s) => s.status === "available"
    );

    if (seatNearOutermost && seatHaveColumn11Available) {
      message.error(
        "Bạn không được bỏ trống ghế " +
          getRowName(seatHaveColumn11Available.row) +
          (seatHaveColumn11Available.column + 1)
      );
      return;
    }

    const findSeats = () => {
      const result = [];

      for (let i = 0; i < selectedSeats.length - 1; i++) {
        const seat1 = selectedSeats[i];

        for (let j = i + 1; j < selectedSeats.length; j++) {
          const seat2 = selectedSeats[j];

          if (
            seat1.row === seat2.row &&
            Math.abs(seat1.column - seat2.column) === 2
          ) {
            result.push([seat1, seat2]);
          }
        }
      }

      return result.length > 0 ? result : null;
    };

    const result = findSeats();
    // console.log(result);

    if (result) {
      for (const seatsPair of result) {
        for (const seat of seatsPair) {
          const rowCheck = seat.row;
          const seatBetween = seats[rowCheck].find(
            (s) =>
              s.row === rowCheck &&
              s.column === (seatsPair[0].column + seatsPair[1].column) / 2
          );

          if (seatBetween?.status === "available") {
            message.error(
              `Bạn không được bỏ trống ghế ${getRowName(seatBetween.row)}${
                seatBetween.column + 1
              }`
            );
            return;
          }
        }
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
      // console.log(seatChoosing);

      const seat2 = selectedSeats
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.row === item.row)
        )
        .map((item) => item.column)[0];
      // console.log(seat2);

      const seatFinded = seats[rowseatCheck].map((s) => s.column);

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
      // console.log(testtt);
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
          // console.log(seatBetween);

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
          // console.log(seatBetween);

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
              <div className="items-center flex">
                <div className=" text-[#FFFFFF] px-6 py-5  bg-yellow-300 shadow-lg shadow-yellow-300/50 rounded-lg inline-block"></div>{" "}
                <span className="text-[17px] text-[#8E8E8E] mx-2">
                  Ghế đang giữ
                </span>
              </div>
            </div>
            {seats.length > 0 && (
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
                            onClick={() =>
                              handleSeatClick(rowIndex, columnIndex)
                            }
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
            )}
          </section>
        </section>
        <section className={` ${showPopCorn ? "col-span-3" : " hidden"}`}>
          <section className="bg-white rounded-lg p-8 space-y-4">
            <main className="max-w-5xl mx-auto shadow-lg  shadow-cyan-500/50 px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8">
                <span className="block font-medium text-lg text-red-600 border-b-2 border-red-600">
                  Khách hàng
                </span>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center mt-3">
                      <p className="font-medium text-base">{userId?.name}</p>
                      <p className="text-gray-500 text-sm ml-1">
                        {userId?.phone}
                      </p>
                      <p className="text-gray-500 text-sm ml-3">
                        {userId?.email}
                      </p>
                    </div>
                    <NavLink
                      to="#"
                      className="text-red-500 border p-1 text-[10px] border-red-500 ml-3"
                    >
                      mặc định
                    </NavLink>
                  </div>
                  <button className="md:text-blue-500 md:text-sm md:hover:text-green-700 md:mt-2 pl-3 text-blue-500 hover:text-green-700 text-[10px]">
                    Thay đổi
                  </button>
                </div>
              </div>
              <div className="info-seat space-y-4 my-4">
                <div className="info-seat space-y-4 my-4">
                  {Object.entries(seatInfo).map(([seatType, info]) => (
                    <div key={seatType} className="flex justify-between">
                      <div className="block font-medium text-lg text-red-600 border-b-2 border-red-600">
                        Ghế {seatType}
                      </div>
                      <div className="flex w-[40%] justify-between">
                        <div className="">Số lượng x{info?.quantity}</div>
                        <div className="">
                          Thành tiền {formatter(info.totalPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <span className="block mb-4 text-lg font-semibold text-red-600">
                COMBO ƯU ĐÃI
              </span>
              <div className="mb-8 border rounded-[10px]">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-2 font-medium text-center text-sm text-red-600 border-b-2 border-red-600"
                      ></th>
                      <th
                        scope="col"
                        className="py-2 font-medium text-center text-sm text-red-600 border-b-2 border-red-600"
                      >
                        Sản phẩm
                      </th>
                      <th
                        scope="col"
                        className="py-2 font-medium text-center text-sm text-red-600 border-b-2 border-red-600"
                      >
                        Giá
                      </th>
                      <th
                        scope="col"
                        className="py-2 font-medium text-center text-sm text-red-600 border-b-2 border-red-600"
                      >
                        Số lượng
                      </th>
                      <th
                        scope="col"
                        className="py-2 font-medium text-center text-sm text-red-600 border-b-2 border-red-600"
                      >
                        Thành tiền
                      </th>
                    </tr>
                    {(foods as any)?.data.map((food: any, index: any) => {
                      return (
                        <>
                          <tr key={index}>
                            <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900">
                              <img
                                src={food.image}
                                alt=""
                                className="w-[50px] bg-[#F3F3F3] h-[50px]"
                              />
                            </td>
                            <td className="whitespace-nowrap text-center  px-4 py-2 text-gray-700">
                              {food.name}
                            </td>
                            <td className="whitespace-nowrap text-center  px-4 py-2 text-gray-700">
                              {formatter(food.price)}
                            </td>
                            <td className="whitespace-nowrap text-center mx-auto px-4 py-2 text-gray-700">
                              <div className="text-center mx-auto">
                                <label
                                  htmlFor={`Quantity-${food.id}`}
                                  className="sr-only"
                                >
                                  Quantity
                                </label>
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    onClick={() =>
                                      handleQuantityChange(
                                        food.id,
                                        -1,
                                        food.price
                                      )
                                    }
                                    disabled={
                                      foodQuantitiesUI[food.id]?.quantity ===
                                        0 || !foodQuantitiesUI[food.id]
                                    }
                                  >
                                    &minus;
                                  </button>
                                  <input
                                    id={`Quantity-${food.id}`}
                                    value={
                                      foodQuantitiesUI[food.id]?.quantity || 0
                                    }
                                    readOnly
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        food.id,
                                        parseInt(e.target.value) || 0,
                                        food.price
                                      )
                                    }
                                    className="h-10 w-16 rounded border-gray-200 text-center sm:text-sm"
                                  />
                                  <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    onClick={() => {
                                      if (
                                        foodQuantitiesUI[food.id]?.quantity > 9
                                      ) {
                                        message.warning(
                                          "Bạn chỉ được mua tối đa 10 sản phẩm/đặt vé"
                                        );
                                      } else {
                                        handleQuantityChange(
                                          food.id,
                                          1,
                                          food.price
                                        );
                                      }
                                    }}
                                    disabled={
                                      foodQuantitiesUI[food.id]?.quantity > 10
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">
                              {foodQuantitiesUI[food.id]?.quantity > 0
                                ? formatter(
                                    foodQuantitiesUI[food.id]?.quantity *
                                      food.price
                                  )
                                : formatter(0)}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </thead>
                </table>
              </div>
              <div className="mb-8">
                <span className="block mb-4 font-medium text-lg text-red-600 border-b-2 border-red-600">
                  MÃ KHUYẾN MÃI
                </span>
                <div className="grid grid-cols-1 h-32 overflow-y-auto gap-4 lg:grid-cols-2 lg:gap-6">
                  {(dataVouchers as any)?.data.map((vc: any) => {
                    const formattedEndDate = dayjs(vc.end_time).format(
                      "DD/MM/YYYY"
                    );
                    const isExpired = dayjs(vc.end_time).isBefore(dayjs());
                    // console.log(formattedEndDate);
                    // console.log(vc.end_time);

                    const isSelected = selectedVoucher === vc.id;
                    const borderClass = isSelected
                      ? "border-2 border-red-600"
                      : "border border-gray-200";
                    const buttonText = isSelected ? "Hủy áp dụng" : "Áp dụng";
                    const textClass = isSelected ? "text-red-600" : "black";
                    const isVoucherUsed = VoucherUsedbyUser?.some(
                      (usedVoucher: any) => usedVoucher.voucher_code === vc.code
                    );

                    // Nếu là voucher đã sử dụng, không hiển thị nút áp dụng
                    if (isVoucherUsed) {
                      return null;
                    }
                    if (isExpired) {
                      return null; // Ẩn voucher đã hết hạn
                    }

                    return (
                      <>
                        <button
                          key={vc.limit}
                          onClick={() => onHandleChooseVC(vc.id, vc.code)}
                          className={`h-30 m-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${borderClass}`}
                        >
                          <div className="space-y-1">
                            {vc.limit === 2 ? (
                              <h3 className="font-semibold text-base text-left">
                                Mã {vc.code} Giảm {vc.percent}% tối đa{" "}
                                {vc.price_voucher / 1000}k
                              </h3>
                            ) : (
                              <h3 className="font-semibold text-base text-left">
                                Mã {vc.code} Giảm {vc.price_voucher / 1000}k
                              </h3>
                            )}

                            <p className="text-left">
                              Áp dụng cho đơn hàng từ{" "}
                              <span className="font-semibold">
                                {vc.minimum_amount / 1000}k
                              </span>
                            </p>
                            <div className="text-left">
                              <span>HSD: </span>
                              <span className="font-semibold">
                                {formattedEndDate}
                              </span>
                            </div>
                            <h3
                              onClick={() => onHandleChooseVC(vc.id, vc.code)}
                              className={`${textClass} text-right font-semibold`}
                            >
                              {buttonText}
                            </h3>
                          </div>
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="mb-8">
                <Changepoint point={point} setPoint={setPoint} />
              </div>
              <div className="mb-8">
                <span className="block font-medium text-lg text-red-600 border-b-2 border-red-600">
                  Phương thức thanh toán
                </span>
                <div className="mt-4 space-x-2">
                  <button
                    className={`border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      selectedPaymentMethod === 1 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handlePaymentMethodClick(1)}
                  >
                    Ngân hàng
                  </button>
                  <button
                    className={`border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      selectedPaymentMethod === 2 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handlePaymentMethodClick(2)}
                  >
                    Momo
                  </button>
                  <button
                    className={`border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      selectedPaymentMethod === 3 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handlePaymentMethodClick(3)}
                  >
                    Số dư (Coin)
                  </button>
                </div>
              </div>
              <div className="mb-8 flex justify-between items-center">
                <span className="text-sm">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều
                  khoản!
                </span>
              </div>
            </main>
          </section>
        </section>
        <section className="col-span-1 space-y-4">
          <div className="bg-[#F3F3F3] space-y-2 rounded-lg px-4 py-10 shadow-lg shadow-cyan-500/50">
            <img
              src={dataAllByTime_Byid?.image_film}
              alt=""
              className="block mx-auto w-[201px] shadow-lg shadow-cyan-500/50 rounded-2xl h-[295px]"
            />
            <div className="w-full text-center space-y-2">
              <h1 className=" text-[#03599d] font-semibold font-mono">
                {dataAllByTime_Byid?.name_film}
              </h1>
              <span className="block text-center">2D Phụ đề</span>
            </div>
            <hr className="border-dashed border-2 border-sky-500" />
            <div className="space-y-4">
              <span className="   mx-5 flex  space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-alarm"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                </svg>
                <h4 className="">
                  Giờ chiếu:{" "}
                  <span className="font-semibold">
                    {dataAllByTime_Byid?.time}
                  </span>
                </h4>
              </span>
              <span className="   mx-5 flex  space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-cast"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0z" />
                  <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086l-1-1z" />
                </svg>
                <h4 className="">
                  Phòng chiếu:{" "}
                  <span className="font-semibold">
                    {dataAllByTime_Byid?.room_name}
                  </span>
                </h4>
              </span>

              <span className="   mx-5 flex  space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-inboxes-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1H4.98zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374L3.81.563zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z" />
                </svg>
                <h4 className=" space-x-1">
                  <span>Ghế ngồi</span>:{" "}
                  {selectedSeats.map((seat) => (
                    <span className="font-semibold">
                      {getRowName(seat.row)}
                      {seat.column + 1}
                    </span>
                  ))}
                </h4>
              </span>
              <span className="   mx-5 flex  space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                </svg>
                <h4 className="flex space-x-1">
                  <span>Tổng tiền </span>: {/* moneyByPoint */}
                  <span className="font-semibold">
                    {point
                      ? selectedVoucherInfo?.limit === 1 &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            selectedVoucherInfo.price_voucher -
                            point
                        )
                      : selectedVoucherInfo?.limit === 1 &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            selectedVoucherInfo.price_voucher
                        )}
                    {point
                      ? !selectedVoucherInfo &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            point
                        )
                      : !selectedVoucherInfo &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) + totalComboAmount
                        )}
                    {point
                      ? selectedVoucherInfo?.limit === 2 &&
                        ((totalMoney + totalComboAmount) *
                          selectedVoucherInfo?.percent) /
                          100 >=
                          selectedVoucherInfo.price_voucher &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            selectedVoucherInfo.price_voucher -
                            point
                        )
                      : selectedVoucherInfo?.limit === 2 &&
                        ((totalMoney + totalComboAmount) *
                          selectedVoucherInfo?.percent) /
                          100 >=
                          selectedVoucherInfo.price_voucher &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            selectedVoucherInfo.price_voucher
                        )}
                    {point
                      ? selectedVoucherInfo?.limit === 2 &&
                        ((totalMoney + totalComboAmount) *
                          selectedVoucherInfo?.percent) /
                          100 <
                          selectedVoucherInfo.price_voucher &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            point -
                            ((totalMoney + totalComboAmount) *
                              selectedVoucherInfo?.percent) /
                              100
                        )
                      : selectedVoucherInfo?.limit === 2 &&
                        ((totalMoney + totalComboAmount) *
                          selectedVoucherInfo?.percent) /
                          100 <
                          selectedVoucherInfo.price_voucher &&
                        formatter(
                          selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                          ) +
                            totalComboAmount -
                            ((totalMoney + totalComboAmount) *
                              selectedVoucherInfo?.percent) /
                              100
                        )}
                  </span>
                </h4>
              </span>
            </div>
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
              <div className="">
                <button
                  onClick={onHandleNextStep}
                  className={` ${
                    showPopCorn && choosePayment === 1
                      ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                      : "hidden"
                  }`}
                >
                  Quay lại
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
              </div>
              <div className="">
                <button
                  onClick={onHandleNextStep}
                  className={` ${
                    showPopCorn && choosePayment === 2
                      ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                      : "hidden"
                  }`}
                >
                  Quay lại
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

              <div className="">
                <button
                  onClick={onHandleNextStep}
                  className={` ${
                    showPopCorn && choosePayment === 3
                      ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px]"
                      : "hidden"
                  }`}
                >
                  Quay lại
                </button>
                <PaymentCoin
                  showPopCorn={showPopCorn}
                  choosePayment={choosePayment}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F3F3F3] text-center space-y-2 rounded-lg px-4 py-2 shadow-lg shadow-cyan-500/50">
            <h1 className="text-xl font-semibold">Thời gian còn lại</h1>
            <Row className="w-full text-center">
              <Col className="w-full text-center">
                <Countdown
                  key={countdownKey} // Change key to reset Countdown
                  value={deadline}
                  onFinish={onFinish}
                />
              </Col>
            </Row>
          </div>
        </section>
      </section>
      <hr className="mt-10 w-full border-2 border-[#F3F3F3]" />
    </>
  );
};

export default BookingSeat;
