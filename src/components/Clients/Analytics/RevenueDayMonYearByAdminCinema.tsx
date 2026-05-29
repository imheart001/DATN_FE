import React from "react";
import { Card, Col, Row } from "antd";
import { formatter } from "../../../utils/formatCurrency";
interface RevenueDayMonYearByAdminCinemaProps {
  data: any;
}
const RevenueDayMonYearByAdminCinema: React.FC<
  RevenueDayMonYearByAdminCinemaProps
> = ({ data }) => {
  console.log(data);

  return (
    <Row gutter={30} className="bg-[#F0F2F5] p-10 overflow-y-auto h-[200px]">
      <Col span={8}>
        <Card
          className="text-base"
          title="Tổng doanh thu theo ngày"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.revenue_admin_day_filter[0]
            ? formatter(
                data?.revenue_admin_cinema?.revenue_admin_day_filter[0]
                  ?.total_amount
              )
            : "0 đ"}
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Tổng doanh thu theo tháng"
          className="text-base"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.revenue_admin_mon_filter[0]
            ? formatter(
                data?.revenue_admin_cinema?.revenue_admin_mon_filter[0]
                  ?.total_amount
              )
            : "0 đ"}
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Tổng doanh thu theo năm"
          className="text-base"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.revenue_admin_year_filter[0]
            ? formatter(
                data?.revenue_admin_cinema?.revenue_admin_year_filter[0]
                  ?.total_amount
              )
            : "0 đ"}
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Tổng doanh thu đồ ăn theo ngày"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.revenue_food_day
            ? formatter(data?.revenue_admin_cinema?.revenue_food_day)
            : "0 đ"}
        </Card>
      </Col>

      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Tổng doanh thu đồ ăn theo tháng"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.total_food_mon
            ? formatter(data?.revenue_admin_cinema?.total_food_mon)
            : "0 đ"}
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Tổng doanh thu đồ ăn theo năm"
          bordered={false}
        >
          {data?.revenue_admin_cinema?.total_food_year
            ? formatter(data?.revenue_admin_cinema?.total_food_year)
            : "0 đ"}
        </Card>
      </Col>
    </Row>
  );
};

export default RevenueDayMonYearByAdminCinema;
