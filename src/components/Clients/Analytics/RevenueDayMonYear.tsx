import React from "react";
import { Card, Col, Row } from "antd";
import { formatter, formatterNumber } from "../../../utils/formatCurrency";
interface RevenueDayMonYearProps {
  data: any;
}
const RevenueDayMonYear: React.FC<RevenueDayMonYearProps> = ({ data }) => {
  return (
    <Row gutter={30} className="bg-[#F0F2F5] p-10 overflow-y-auto h-[200px]">
      <Col span={8}>
        <Card
          className="text-base"
          title="Tổng doanh thu theo ngày"
          bordered={false}
        >
          {formatter(data?.revenue_day?.revenueToday)}
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Tổng doanh thu theo tháng"
          className="text-base"
          bordered={false}
        >
          {formatter(data?.revenue_month?.revenue_month_y)}
        </Card>
      </Col>
      <Col className="text-base" span={8}>
        <Card
          className="text-base"
          title="Tổng doanh thu đồ ăn theo ngày"
          bordered={false}
        >
          {formatter(data?.revenue_day?.totalPricefoodday)}
        </Card>
      </Col>

      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card className="text-base" title="Người dùng" bordered={false}>
          {data?.user_count} người
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className={`text-base ${
            data?.revenue_month?.comparison > 0
              ? "text-green-500"
              : "text-red-600"
          }`}
          title="Doanh thu so với tháng trước"
          bordered={false}
        >
          {formatter(data?.revenue_month?.comparison)}
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Doanh thu đồ ăn theo tháng"
          bordered={false}
        >
          {formatter(data?.revenue_month?.totalPricefoodmon)}
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Tổng số phim đang hoạt động"
          bordered={false}
        >
          {data?.released_film_num} phim
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card className="text-base" title="Menu đồ ăn" bordered={false}>
          {data?.count_food} món
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Tổng số rạp đang hoạt động"
          bordered={false}
        >
          {data?.count_cinema} rạp
        </Card>
      </Col>
      <Col className="text-base" span={8} style={{ width: 300, marginTop: 40 }}>
        <Card
          className="text-base"
          title="Số voucher còn hoạt động"
          bordered={false}
        >
          {formatterNumber(data?.voucher_is_onl_count)}
        </Card>
      </Col>
    </Row>
  );
};

export default RevenueDayMonYear;
