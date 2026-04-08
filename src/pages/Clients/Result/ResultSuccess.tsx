import { Button, Result, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useRechargeByMomoMutation } from "../../../service/payMoMo.service";
const ResultSuccess = () => {
  const location = useLocation();
  console.log(location);

  let content;
  const [recharge] = useRechargeByMomoMutation();
  const params = new URLSearchParams(location.search);
  const amount = params.get("amount") || "";
  const TransactionStatus = params.get("resultCode") || "";
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);
  if (TransactionStatus && TransactionStatus == "0") {
    const dataRecharge: any = {
      coin: amount,
      id_user: userId?.id,
    };
    try {
      const response = recharge(dataRecharge);
      if (response as any) {
        content = (
          <>
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
          </>
        );
      }
    } catch (error) {
      console.log(error);
    }
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
