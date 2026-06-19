import React, { useState } from "react";
import { Input, Modal, message } from "antd";
import { usePaymentCoinsMutation } from "../../../service/usecoin.service";
import { useSelector, useDispatch } from "react-redux";
import { useAddBookTicketMutation, useGetUserByIdQuery } from "../../../service/book_ticket.service";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAddFoodTicketDetailMutation } from "../../../service/food.service";
import { useSendEmailMutation } from "../../../service/sendEmail.service";
import { useUsed_VC_ByUserIdMutation } from "../../../service/voucher.service";
import { useAddChairsMutation } from "../../../service/chairs.service";
import { useDiscountPointMutation } from "../../../service/member.service";
import { format } from "date-fns";
import * as moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { clearTKinformation } from "../../../components/CinemaSlice/selectSeat";
interface PaymentCoinProps {
  showPopCorn: any;
  choosePayment: any;
}
const PaymentCoin: React.FC<PaymentCoinProps> = ({
  showPopCorn,
  choosePayment,
}) => {
  const dispatch = useDispatch();
  const currentDateTime = moment().utcOffset(420).toDate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState(""); // Thêm state để lưu trữ mật khẩu
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCoin] = usePaymentCoinsMutation();
  const [addIfSeatByUser] = useAddBookTicketMutation();
  const [addFood] = useAddFoodTicketDetailMutation();
  const [sendEmail] = useSendEmailMutation();
  const [useVCbyUserID] = useUsed_VC_ByUserIdMutation();
  const [addChair] = useAddChairsMutation();
  const [discountPoint] = useDiscountPointMutation();
  const dateBk = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");
  const totalPrice = useSelector(
    (state: any) => state.TKinformation?.totalPrice
  );
  const totalPriceSeat = useSelector(
    (state: any) => state.TKinformation?.totalPriceSeat
  );
  const selectingSeat = useSelector(
    (state: any) => state.TKinformation?.selectedSeats
  );
  const id_selectingTime_detail = useSelector(
    (state: any) => state.TKinformation?.showtimeId
  );
  const VoucherCode = useSelector(
    (state: any) => state.TKinformation?.chooseVoucher
  );
  const parsedPopCorn = useSelector(
    (state: any) => state.TKinformation?.comboFoods
  );
  const MyVoucher = {
    voucher_code: VoucherCode,
  };
  const moneyByPoint = useSelector((state: any) => state.TKinformation?.point);
  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const { refetch: refetchUser } = useGetUserByIdQuery(
    IfUser?.id ? `${IfUser.id}` : skipToken
  );
  const showModal = () => {
    setIsModalOpen(true);
  };
  const payment = localStorage.getItem("payment");
  const navigate = useNavigate();
  const handleOk = async () => {
    // Kiểm tra nếu mật khẩu không được nhập hoặc ít hơn 6 ký tự
    if (!password || password.length < 6) {
      message.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (isPaying || paymentSuccess) return;
    setIsPaying(true);
    const dataUseCoin = {
      password: password,
      amount: totalPrice,
      id: IfUser.id,
    };
    let isTxSuccess = false;
    try {
      const response = await paymentCoin(dataUseCoin);
      if ((response as any)?.data?.msg && !(response as any)?.data?.data) {
        message.error(`${(response as any)?.data?.msg}`);
      }

      if ((response as any)?.data?.data) {
        isTxSuccess = true;
        setPaymentSuccess(true);
        const selectedSeatsData = {
          name: selectingSeat,
          price: totalPriceSeat,
          id_time_detail: id_selectingTime_detail,
        };
        const responseAddChair = await addChair(selectedSeatsData);
        const IddataAfterFood_Detail: any[] = [];
        const responseData = (responseAddChair as any)?.data;
        console.log(responseData);

        const newId = responseData?.id;
        console.log(newId);
        console.log(IddataAfterFood_Detail);

        // Gọi hàm addIfSeatByUser với dữ liệu mới lấy được
        const addIfSeatResponse = await addIfSeatByUser({
          id_chair: newId,
          payment: payment,
          amount: totalPrice,
          time: dateBk,
          user_id: IfUser.id,
          id_time_detail: id_selectingTime_detail,
          id_code: (response as any)?.data?.data?.id_code,
        });
        console.log(addIfSeatResponse);

        await Promise.all(
          parsedPopCorn.map(async (popCorn: any) => {
            const foodDetail = {
              food_id: popCorn.id_food,
              quantity: popCorn.quantity,
              book_ticket_id: (addIfSeatResponse as any)?.data?.data?.id || (addIfSeatResponse as any)?.data?.id,
            };
            const responseAddFood = await addFood(foodDetail);
            IddataAfterFood_Detail.push((responseAddFood as any)?.data?.data?.id || (responseAddFood as any)?.data?.id);
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
          id_user: IfUser.id,
        };
        if (moneyByPoint) {
          const reponsePoint = await discountPoint(myPoint);
          console.log(reponsePoint);
        }

        message.success(`${(response as any)?.data?.msg}`);
        if (typeof refetchUser === "function") {
          try {
            refetchUser();
          } catch (e) {
            console.error("Failed to refetch user data:", e);
          }
        }
        dispatch(clearTKinformation());
        setIsModalOpen(false);
        navigate("/resultpaymentcoins");
      }
    } catch (error: any) {
      console.error("Payment flow error:", error);
      message.error(error?.message || "Đã xảy ra lỗi trong quá trình thanh toán.");
    } finally {
      if (!isTxSuccess) {
        setIsPaying(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        disabled={isPaying || paymentSuccess}
        className={` ${
          showPopCorn && choosePayment === 3
            ? "hover:bg-[#EAE8E4] rounded-md my-2 hover:text-black bg-black text-[#FFFFFF] w-full text-center py-2 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            : "hidden"
        }`}
      >
        Thanh toán Coins
      </button>
      <Modal
        title="Nhập mật khẩu "
        visible={isModalOpen}
        onOk={handleOk}
        confirmLoading={isPaying}
        okButtonProps={{
          disabled: isPaying || paymentSuccess,
          style: { backgroundColor: "#007bff", color: "white" },
        }}
        cancelButtonProps={{
          disabled: isPaying || paymentSuccess,
        }}
        onCancel={handleCancel}
        closable={!isPaying && !paymentSuccess}
        maskClosable={!isPaying && !paymentSuccess}
      >
        <Input.Password
          required
          min={6}
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default PaymentCoin;
