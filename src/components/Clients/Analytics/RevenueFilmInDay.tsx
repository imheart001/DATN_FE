import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatter } from "../../../utils/formatCurrency";

interface DataType {
  key: string;
  film_name: string;
  TotalAmount: string;
  TotalTickets: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Stt",
    dataIndex: "key",
    align: "center",
    render: (_, __, index) => <span>{index + 1}</span>,
    width: "10%",
  },
  {
    title: "Tên phim",
    dataIndex: "film_name",
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
    dataIndex: "TotalTickets",
    align: "center",
    width: "15%",
    render: (text) => <a>{text} vé</a>,
    // render: (text) => <span>{formatter(Number(text))}</span>,
  },
];

interface RevenueFilmInDayProps {
  data: any;
}
const RevenueFilmInDay: React.FC<RevenueFilmInDayProps> = ({ data }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    scroll={{ x: 500, y: 200 }}
    title={() => "Doanh thu phim theo ngày"}
  />
);

export default RevenueFilmInDay;
