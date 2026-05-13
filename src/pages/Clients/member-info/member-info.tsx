import { Alert, Col, Row, Slider, Statistic } from "antd";
import "../../../App.css";

import {
  useFetchMembersQuery,
  useGetPointByIdUserQuery,
} from "../../../service/member.service";

import { any } from "prop-types";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { formatter } from "../../../utils/formatCurrency";
import { formatDatee } from "../../../utils";

function getGradientColor(percentage: number) {
  const endColor = [135, 208, 104];
  const startColor = [255, 204, 199];

  const midColor = startColor.map((start, i) => {
    const end = endColor[i];
    const delta = end - start;
    return (start + delta * percentage).toFixed(0);
  });

  return `rgb(${midColor.join(",")})`;
}

const MemberInfo = () => {
  const { data } = useFetchMembersQuery();

  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const { data: memberUser } = useGetPointByIdUserQuery(IfUser.id);
  const user_id = IfUser.id;
  const dataUser = data?.data?.filter(
    (item) => item.id_user === Number(user_id)
  );

  console.log(memberUser);

  return (
    <>
      {/* <Header />   */}
      <div className="h-scree bg-white boder ">
        <div
          className="mt-10 flow-root rounded-lg border bg-white text-black border-gray-100 py-3 shadow-sm "
          style={{ maxWidth: "1000px", textAlign: "center", margin: "auto" }}
        >
          <h1
            className="mb-10"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Thẻ hội viên
          </h1>

          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y-5  text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    SÔ THẺ
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    HẠNG THẺ
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    NGÀY KÍCH HOẠT
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    TỔNG CHI TIÊU
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    ĐIỂM TÍCH LŨY
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    ĐIỂM ĐÃ TIÊU
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    ĐIỂM KHẢ DỤNG
                  </th>
                </tr>
              </thead>
              {/* <hr /> */}
              <tbody className="divide-y divide-gray-200">
                {dataUser &&
                  dataUser.length > 0 &&
                  dataUser.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {item.id_card}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.card_class === 1 ? (
                          "Bình Thường"
                        ) : (
                          <span className="text-yellow-500 font-semibold text-base uppercase">
                            V.I.P
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {formatDatee(item.activation_date)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.total_spending.toLocaleString()}vnd
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.accumulated_points.toLocaleString()}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.points_used.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.usable_points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <hr className="mt-5" />
          <div className="flex justify-start">
            {(memberUser as any)?.data?.card_class === 1 ? (
              "Hội viên thường chỉ được hoàn 1% khi đặt vé!!"
            ) : (
              <div>
                Chúc mừng bạn đã là{" "}
                <span className="text-yellow-500 font-semibold text-base uppercase">
                  thành viên VIP
                </span>{" "}
                của chúng tôi! Để tri ân, bạn sẽ được hoàn 5% điểm với tổng tiền
                khi bạn đặt vé!
              </div>
            )}
          </div>
          {dataUser &&
            dataUser.length > 0 &&
            dataUser.map((item) => (
              <Col span={24} key={item.id}>
                {item.total_spending < 3000000 ? (
                  <>
                    <Statistic
                      className=""
                      style={{ fontWeight: "bold", color: "red" }}
                      title="Số tiền chi tiêu"
                      value={formatter(item.total_spending.toLocaleString())}
                      suffix="/ 3.000.000 đ"
                    />
                    <Alert
                      className="bg-white"
                      banner
                      message={
                        <Marquee
                          className="mt-2 "
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "24px",
                          }}
                          pauseOnHover
                          gradient={false}
                        >
                          Bạn cần chi tiêu ít nhất "{" "}
                          {`${(
                            3000000 - parseInt(item.total_spending, 10)
                          ).toLocaleString()} VND`}{" "}
                          " để trở thành khách hàng VIP
                        </Marquee>
                      }
                    />
                    {/* <Slider
                    range
                    defaultValue={value}
                    onChange={setValue}
                    styles={{
                      track: {
                        background: 'transparent',
                      },
                      tracks: {
                        background: `linear-gradient(to right, ${getGradientColor(start)} 0%, ${getGradientColor(
                          end,
                        )} 100%)`,
                      },
                    }}
                  /> */}
                  </>
                ) : (
                  <div>
                    <Alert
                      className="bg-white"
                      banner
                      message={
                        <Marquee
                          className="mt-2 "
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "24px",
                          }}
                          pauseOnHover
                          gradient={false}
                        >
                          Bạn đã là khách hàng VIP
                        </Marquee>
                      }
                    />
                  </div>
                )}
              </Col>
            ))}
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
