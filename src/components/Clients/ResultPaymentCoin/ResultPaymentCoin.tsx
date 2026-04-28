import { useEffect, useState } from "react";
import ChoosePop from "../../../pages/Clients/ChoosePop/ChoosePop";
import Header from "../../../Layout/LayoutUser/Header";
import { Link, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const ResultPaymentCoin = ({}) => {
  const [showChoosePop, setShowChoosePop] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    // Ẩn ChoosePop sau 5 giây
    const timeoutId = setTimeout(() => {
      setShowChoosePop(false);
    }, 3000);

    // Xóa timeout khi component bị unmount hoặc khi showChoosePop thay đổi
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      {showChoosePop && <ChoosePop />}
      {!showChoosePop && (
        <div>
          <div className="text-white bg-white p-20 ">
            <Result
              status="success"
              title="Thanh toán Thành Công"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console" className="bg-blue-500">
                  <Link to={"/"}>Quay về trang chủ</Link>
                </Button>,
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultPaymentCoin;
