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
import {
  useSendEmailMutation,
  useUsed_VC_ByUserIdMutation,
} from "../../../service/pay.service";
import * as moment from "moment-timezone";

const Payment = () => {
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

  const dispatch = useDispatch();
  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const selectingSeat = useSelector(
    (state: any) => state.TKinformation?.selectedSeats
  );
  const VoucherCode = useSelector(
    (state: any) => state.TKinformation?.chooseVoucher
  );
  const MyVoucher = {
    voucher_code: VoucherCode,
  };
  const id_time_details = useSelector(
    (state: any) => state.TKinformation?.showtimeId
  );
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
    price: totalPrice,
    id_time_detail: id_selectingTime_detail,
  };
  const currentPath = location.pathname;

  // Tách đoạn đường dẫn thành các phần bằng dấu "/"
  const pathParts = currentPath.split("/");
  const idCodePart = pathParts.find((part) => part.startsWith("id_code="));
  const idCode = idCodePart ? idCodePart.split("=")[1] : null;
  console.log(idCode);
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const amount = params.get("vnp_Amount") || "";
      const TransactionStatus = params.get("vnp_TransactionStatus") || "";

      setVnpAmount(amount);
      setVnp_TransactionStatus(TransactionStatus);

      if (!addChairCalled && vnp_TransactionStatus === "00") {
        const matchingSeats = (allchairbked as any)?.data.filter(
          (chair: any) => {
            return (
              chair.id_time_detail == id_selectingTime_detail &&
              selectingSeat.includes(chair.name)
            );
          }
        );

        if (matchingSeats && matchingSeats.length > 0) {
          console.log("Có ghế trùng");
        } else {
          try {
            const response = await addChair(selectedSeatsData as any);
            console.log(response);
            const UsedVoucher = await useVCbyUserID(`${MyVoucher}`);
            console.log(UsedVoucher);

            const responseData = (response as any)?.data;
            const IddataAfterFood_Detail: any[] = [];

            const newId = responseData.data.id;
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

  let content;
  if (vnp_TransactionStatus == "00") {
    content = (
      <div className="bg-white p-10 rounded-lg shadow-lg">
        {/* <Header /> */}
        <section className="rounded-3xl shadow-2xl">
          <div className="p-8 text-center sm:p-12">
            <h1 className="text-2xl mb-6">Thanh toán thành công</h1>
            <p className="text-gray-700 mb-4">
              Cảm ơn bạn đã đặt vé tại rạp của chúng tôi. Vé của bạn sẽ được gửi
              qua email trong thời gian sớm nhất.
            </p>
            <p className="text-gray-700 mb-4">
              Số tiền đã thanh toán: {formatter(totalPrice)} VND
            </p>
            {/* <p className="text-gray-700 mb-6">Trạng thái:{idCode} </p> */}
            <p className="text-gray-700 mb-6">
              Các ghế đang chọn: {selectingSeat}, suất chiếu{" "}
              {id_selectingTime_detail}
            </p>
            <p>Thông tin mã vé</p>
            <QRCode
              type="svg"
              value={`http://127.0.0.1:8000/api/QR_book/${idCode}`}
            />
            <Link to={`/`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Quay lại trang chủ
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  } else {
    content = (
      <div className="bg-white p-10 rounded-lg shadow-lg">
        {/* <Header /> */}
        <section className="rounded-3xl shadow-2xl">
          <div className="p-8 text-center sm:p-12">
            <h1 className="text-2xl mb-6">Thanh toán thất bại</h1>
            <p className="text-gray-700 mb-4">
              Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Quay lại trang chủ
            </button>
          </div>
        </section>
      </div>
    );
  }

  return content;
};

export default Payment;
