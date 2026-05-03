import { InputNumber, Modal, Tabs, message } from "antd";
import type { TabsProps } from "antd";
import { usePaymentMomoMutation } from "../../../service/payMoMo.service";
import { setMoney } from "../../ChoosePayment/ChoosePayment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Recharge: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [payMomo] = usePaymentMomoMutation();
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);
  const [inputValue, setInputValue] = useState("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Thêm state mới
  const showModal = () => {
    setIsModalOpen(true);
  };
  console.log(selectedPaymentMethod);

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (value: any) => {
    // console.log(value);
    if (value >= 10000000) {
      message.warning("Chỉ được nạp tối đa 10 triệu cho mỗi lần");
    }
    dispatch(setMoney(value));
    // const formattedValue = formatCurrency(newValue);
    setInputValue(value);
  };
  const money2 = useSelector((state: any) => state.Paymentmethod?.coin);
  console.log(money2);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleNapTien = async () => {
    if (!selectedPaymentMethod) {
      message.warning("Bạn chưa chọn phương thức thanh toán");
      return;
    }
    if (selectedPaymentMethod == "momo") {
      const dataPost: any = {
        amount: money2,
        id_user: userId.id,
      };
      const response = await payMomo(dataPost);
      console.log(!response);
      console.log(response);
      
      // dispatch(setMoney(value));
      window.location.href = `${(response as any)?.data?.payUrl}`;
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <span>Nạp tiền</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <button onClick={showModal}>Nạp tiền</button>
      <Modal
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} />
        <div className="w-72 my-4">
          <div className="relative w-full min-w-[200px] h-10">
            {/* <input
              id="moneyInput"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            /> */}
            <InputNumber
              max={10000000}
              min={0}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              value={inputValue} // Use `value` instead of `defaultValue`
              formatter={(value) =>
                `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              onChange={handleInputChange}
            />
            <label
              htmlFor="moneyInput"
              className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
            >
              Số tiền cần nạp
            </label>
          </div>
        </div>
        <div className="">
          <span>Từ nguồn tiền</span>
          <div className="bg-gray-100 flex justify-between rounded-lg my-2 p-4 px-4">
            <button
              className={`flex space-x-4 items-center rounded-lg px-4 py-2 ${
                selectedPaymentMethod === "momo"
                  ? "focus:border-red-500 focus:border-2 bg-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePaymentMethodSelect("momo")}
            >
              <img srcSet="/momo.png/ 10x" alt="Momo Logo" />
              <div className="">
                <h3 className="font-semibold text-base">Ví momo</h3>
                <span className="text-gray-400">Miễn phí thanh toán</span>
              </div>
            </button>
            <button
              className={`flex space-x-4 items-center rounded-lg px-4 py-2 ${
                selectedPaymentMethod === "vnpay"
                  ? "focus:border-red-500 focus:border-2 bg-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePaymentMethodSelect("vnpay")}
            >
              <img srcSet="/VNpay.png/ 10x" alt="Vnpay" />
              <div className="">
                <h3 className="font-semibold text-base">VNPay</h3>
                <span className="text-gray-400">Miễn phí thanh toán</span>
              </div>
            </button>
          </div>
          <div className="text-center mx-auto">
            <button
              onClick={handleNapTien}
              className="hover:bg-[#EAE8E4] rounded-md my-4   hover:text-black bg-black text-[#FFFFFF] w-[50%] text-center py-2 text-[16px]"
            >
              Nạp tiền
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Recharge;
