import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Button, QRCode, Result, Space } from "antd";

import { useRechargeByMomoMutation } from "../../../service/payMoMo.service";
import { setMoney } from "../../../components/ChoosePayment/ChoosePayment";
import { useDispatch, useSelector } from "react-redux";

const ResultSuccess = () => {
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const [recharge] = useRechargeByMomoMutation();
  const params = new URLSearchParams(location.search);
  const amount = params.get("amount") || "";
  const money2 = useSelector((state: any) => state.Paymentmethod?.coin);
  console.log(money2);
  const TransactionStatus = params.get("resultCode") || "";
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);
  const dataRecharge: any = {
    coin: money2,
    id_user: userId?.id,
  };
  useEffect(() => {
    const fetchData = async () => {
      if (TransactionStatus && TransactionStatus == "0") {
        const response = await recharge(dataRecharge);
        console.log(response);

        if ((response as any)?.data.status) {
          dispatch(setMoney(null));
        }
      }
    };

    fetchData(); // Call the asynchronous function inside useEffect
  }, []);

  let content;
  if (TransactionStatus == "0") {
    content = (
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <Result
          status="success"
          title="Nạp tiền thành công!"
          subTitle="Chúc bạn có thật nhiều trải nghiệm trên website của chúng tôi."
          extra={[
            <Link to={"/"} className="text-center ">
              <Button type="primary" className="bg-blue-600">
                Back Home
              </Button>
            </Link>,
          ]}
        />
      </div>
    );
  } else {
    content = (
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
    );
  }

  return content;
};

export default ResultSuccess;
