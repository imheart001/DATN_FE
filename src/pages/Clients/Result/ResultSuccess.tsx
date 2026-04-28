import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Button, QRCode, Result, Space } from "antd";

import { useRechargeByMomoMutation } from "../../../service/payMoMo.service";

const ResultSuccess = () => {
  const location = useLocation();
  console.log(location);

  const [recharge] = useRechargeByMomoMutation();
  const params = new URLSearchParams(location.search);
  const amount = params.get("amount") || "";
  const TransactionStatus = params.get("resultCode") || "";
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);
  useEffect(() => {
    const fetchData = async () => {
      if (TransactionStatus && TransactionStatus == "0") {
        const dataRecharge: any = {
          coin: amount,
          id_user: userId?.id,
        };
        const response = await recharge(dataRecharge);
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
