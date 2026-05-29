import { Table } from "antd";
import React from "react";
interface VocuherByUserAnalyticsProps {
  data: any;
}
import type { ColumnsType } from "antd/es/table";
import { formatter, formatterNumber } from "../../../utils/formatCurrency";
const VocuherByUserAnalytics: React.FC<VocuherByUserAnalyticsProps> = ({
  data,
}) => {
  console.log(data);
  interface DataType {
    key: string;
    code: string;
    price_voucher: number;
    usage_limit: number;
    percentage_used: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Stt",
      dataIndex: "key",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Mã voucher",
      dataIndex: "code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá giảm",
      dataIndex: "price_voucher",
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      title: "Số lượng ban đầu",
      dataIndex: "usage_limit",
      render: (text) => <a>{formatterNumber(text)} code</a>,
    },
    {
      title: "% được lựa chọn",
      dataIndex: "percentage_used",
      render: (text) => <a>{(parseFloat(text) * 100).toFixed(1)}%</a>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Voucher"}
      />
    </>
  );
};

export default VocuherByUserAnalytics;
