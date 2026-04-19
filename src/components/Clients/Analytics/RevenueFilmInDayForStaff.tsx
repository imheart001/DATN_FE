import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatter } from "../../../utils/formatCurrency";

interface DataType {
  key: string;
  name: string;
  total_tickets: string;
  TotalAmount: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Stt",
    dataIndex: "key",
    align: "center",
    render: (text, record, index) => <span>{index + 1}</span>,
    width: "10%",
  },
  {
    title: "Tên phim",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Doanh thu",
    className: "column-money",
    dataIndex: "TotalAmount",
    align: "left",
    render: (text) => <span>{formatter(Number(text))}</span>,
  },
  {
    title: "Tổng vé",
    className: "column-money",
    dataIndex: "total_tickets",
    align: "center",
    width: "15%",
    render: (text) => <a>{text} vé</a>,
    // render: (text) => <span>{formatter(Number(text))}</span>,
  },
];

interface RevenueFilmInDayForStaffProps {
  data: any;
}
const RevenueFilmInDayForStaff: React.FC<RevenueFilmInDayForStaffProps> = ({
  data,
}) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    scroll={{ x: 500, y: 200 }}
    title={() => "Doanh thu phim theo ngày"}
  />
);

export default RevenueFilmInDayForStaff;
