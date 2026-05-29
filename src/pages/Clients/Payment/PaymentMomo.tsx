import { Button, Result } from "antd";

import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCode, Space } from "antd";
import {
  useAddChairsMutation,
  useFetchChairsQuery,
} from "../../../service/chairs.service";

import { useAddBookTicketMutation } from "../../../service/book_ticket.service";
import { format } from "date-fns";
import { useAddFoodTicketDetailMutation } from "../../../service/food.service";

import * as moment from "moment-timezone";
import { useSendEmailMutation } from "../../../service/sendEmail.service";
import { useUsed_VC_ByUserIdMutation } from "../../../service/voucher.service";
import { useDiscountPointMutation } from "../../../service/member.service";

const PaymentMomo: React.FC = () => {
  const location = useLocation();
  const [vnpAmount, setVnpAmount] = useState("");
  const { data: allchairbked } = useFetchChairsQuery();
  const [addIfSeatByUser] = useAddBookTicketMutation();
  const [addFood] = useAddFoodTicketDetailMutation();
  const [sendEmail] = useSendEmailMutation();
  const [useVCbyUserID] = useUsed_VC_ByUserIdMutation();
  const currentDateTime = moment().utcOffset(420).toDate();
  const dateBk = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");

  console.log(dateBk);
  const [vnp_TransactionStatus, setVnp_TransactionStatus] = useState("");
  const [addChairCalled, setAddChairCalled] = useState(false);
  const parsedPopCorn = useSelector(
    (state: any) => state.TKinformation?.comboFoods
  );
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);

  const dispatch = useDispatch();
  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const selectingSeat = useSelector(
    (state: any) => state.TKinformation?.selectedSeats
  );
  const totalPriceSeat = useSelector(
    (state: any) => state.TKinformation?.totalPriceSeat
  );
  const id_time_details = useSelector(
    (state: any) => state.TKinformation?.showtimeId
  );
  const VoucherCode = useSelector(
    (state: any) => state.TKinformation?.chooseVoucher
  );
  console.log(!VoucherCode);
  const moneyByPoint = useSelector((state: any) => state.TKinformation?.point);
  console.log(moneyByPoint);

  const MyVoucher = {
    voucher_code: VoucherCode,
  };
  const user_id = parseInt(localStorage.getItem("user_id") as any, 10);

  const payment = localStorage.getItem("payment");
  const totalPrice = useSelector(
    (state: any) => state.TKinformation?.totalPrice
  );
  // const totalPrice = useSelector((state: any) => state.booking?.totalPrice);
  const id_selectingTime_detail = useSelector(
    (state: any) => state.TKinformation?.showtimeId
  );
  const [addChair] = useAddChairsMutation();

  const selectedSeatsData = {
    name: selectingSeat,
    price: totalPriceSeat,
    id_time_detail: id_selectingTime_detail,
  };
  const currentPath = location.pathname;
  console.log(selectedSeatsData);

  // Tách đoạn đường dẫn thành các phần bằng dấu "/"
  const pathParts = currentPath.split("/");
  const idCodePart = pathParts.find((part) => part.startsWith("id_code="));
  const idCode = idCodePart ? idCodePart.split("=")[1] : null;
  console.log(idCode);
  const [discountPoint] = useDiscountPointMutation();
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const amount = params.get("amount") || "";
      const TransactionStatus = params.get("resultCode") || "";

      setVnpAmount(amount);
      setVnp_TransactionStatus(TransactionStatus);

      if (!addChairCalled && vnp_TransactionStatus == "0") {
        const matchingSeats = (allchairbked as any)?.filter((chair: any) => {
          console.log(chair.seat);

          return (
            chair.id_time_detail == id_selectingTime_detail &&
            selectingSeat.includes(chair.seat)
          );
        });
        if (matchingSeats && matchingSeats.length > 0) {
          console.log("Có ghế trùng");
        } else {
          try {
            const response = await addChair(selectedSeatsData as any);
            console.log(response);

            const responseData = (response as any)?.data;
            const IddataAfterFood_Detail: any[] = [];
            console.log(responseData);

            const newId = responseData.id;
            console.log(newId);
            console.log(IddataAfterFood_Detail);

            // Gọi hàm addIfSeatByUser với dữ liệu mới lấy được
            const addIfSeatResponse = await addIfSeatByUser({
              id_chair: newId,
              payment: payment,
              amount: totalPrice,
              time: dateBk,
              user_id: user_id,
              id_time_detail: id_time_details,
              id_code: idCode,
            });
            console.log(addIfSeatResponse);

            await Promise.all(
              parsedPopCorn.map(async (popCorn: any) => {
                const foodDetail = {
                  food_id: popCorn.id_food,
                  quantity: popCorn.quantity,
                  book_ticket_id: (addIfSeatResponse as any)?.data.data.id,
                };
                const responseAddFood = await addFood(foodDetail);
                IddataAfterFood_Detail.push(
                  (responseAddFood as any)?.data?.data.id
                );
              })
            );

            console.log((addIfSeatResponse as any)?.data);
            await sendEmail({});
            if (VoucherCode) {
              const UsedVoucher = await useVCbyUserID(MyVoucher);
              console.log(UsedVoucher);
            }
            const myPoint = {
              discount: moneyByPoint,
              id_user: user_id,
            };

            const reponsePoint = await discountPoint(myPoint);
            console.log(reponsePoint);

            setAddChairCalled(true);
            localStorage.removeItem("foodQuantities");
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    fetchData(); // Call the asynchronous function inside useEffect
  }, [vnp_TransactionStatus, addChairCalled, (allchairbked as any)?.data]);
  return (
    <div className="bg-white">
      {vnp_TransactionStatus == "0" && (
        <Result
          status="success"
          title="Thanh Toán Thành Công"
          subTitle={`Mã vé: ${idCode}! Bạn có thể kiểm tra lại vé của mình ở phần Lịch sử đơn hàng!!. Thanks you`}
          extra={[
            <>
              <p className="text-gray-700 mb-4">
                Cảm ơn bạn đã đặt vé tại rạp của chúng tôi. Vé của bạn sẽ được
                gửi qua email trong thời gian sớm nhất.
              </p>
              <p className="text-gray-700 mb-4">
                Số tiền đã thanh toán: {formatter(totalPrice)} VND
              </p>
              <p className="text-gray-700 mb-6">
                Các ghế đang chọn: {selectingSeat}, suất chiếu{" "}
                {id_selectingTime_detail}
              </p>
              <p>Thông tin mã vé</p>
              <QRCode
                type="svg"
                value={`http://127.0.0.1:8000/api/QR_book/${idCode}`}
              />
              <Button type="primary" key="console" className="bg-blue-500">
                <Link to={"/"}>Quay về trang chủ</Link>
              </Button>
              ,
            </>,
          ]}
        />
      )}
      {vnp_TransactionStatus != "0" && (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          {/* <Header /> */}
          <Result
            status="error"
            title="Thanh toán Thất Bại!"
            subTitle="Vui lòng thử lại sau "
          >
            <Link to={"/"} className="text-center ">
              <Button type="primary" className="bg-blue-600">
                Back Home
              </Button>
            </Link>
          </Result>
        </div>
      )}
    </div>
  );
};

export default PaymentMomo;
