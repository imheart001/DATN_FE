import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatter } from "../../../utils/formatCurrency";

interface DataType {
  key: string;
  name: string;
  TotalTickets: string;
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
    title: "Tổng vé",
    className: "column-money",
    dataIndex: "TotalTickets",
    align: "center",
    render: (text) => <a>{text} vé</a>,
    // render: (text) => <span>{formatter(Number(text))}</span>,
  },
];

interface TotalBookTicketInMonthProps {
  data: any;
}
const TotalBookTicketInMonth: React.FC<TotalBookTicketInMonthProps> = ({
  data,
}) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    scroll={{ x: 500, y: 200 }}
    title={() => "Vé được bán ra theo phim theo tháng hiện tại"}
  />
);

export default TotalBookTicketInMonth;
