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
    width: "26%",
  },
  {
    title: "Doanh thu",
    className: "column-money",
    dataIndex: "TotalAmount",
    align: "left",
    render: (text) => <span>{formatter(Number(text))}</span>,
  },

  {
    title: "Tổng vé bán ra",
    className: "column-money",
    dataIndex: "TotalTickets",
    align: "center",
    render: (text) => <a>{text} vé</a>,
    width: "15%",
    // render: (text) => <span>{formatter(Number(text))}</span>,
  },
];

interface RevenueFilmInMonProps {
  data: any;
}
const RevenueFilmInMon: React.FC<RevenueFilmInMonProps> = ({ data }) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey={(record, index) => index?.toString() || ""}
    scroll={{ x: 500, y: 270 }}
    bordered
    title={() => "Top 5 phim có doanh thu cao nhất trong tháng"}
  />
);

export default RevenueFilmInMon;
