import { Table } from "antd";
import React from "react";
interface Top5user_friendlyProps {
  data: any;
}
import type { ColumnsType } from "antd/es/table";
import { formatter } from "../../../utils/formatCurrency";
const Top5user_friendly: React.FC<Top5user_friendlyProps> = ({ data }) => {
  console.log(data);
  interface DataType {
    key: string;
    name: string;
    TotalAmount: number;
    card_class: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Stt",
      dataIndex: "key",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Hạng hội viên",
      dataIndex: "card_class",
      render: (card_class) =>
        card_class === 2 ? (
          <div className="flex items-center space-x-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 6.09143L7.21997 10.8114L12.0005 6.03088L16.7811 10.8114L21.5 6.09245V14.9691C21.5 16.626 20.1569 17.9691 18.5 17.9691H5.5C3.84314 17.9691 2.5 16.626 2.5 14.9691V6.09143ZM19.5 10.9087V14.9691C19.5 15.5214 19.0523 15.9691 18.5 15.9691H5.5C4.94771 15.9691 4.5 15.5214 4.5 14.9691V10.9077L7.21997 13.6277L12.0005 8.84717L16.7811 13.6277L19.5 10.9087Z"
                fill="currentColor"
              />
            </svg>
            <span>Vip</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                fill="currentColor"
              />
              <path
                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                fill="currentColor"
              />
            </svg>
            <span>Thường</span>
          </div>
        ),
    },
    {
      title: "Tổng tiền",
      className: "column-money",
      dataIndex: "TotalAmount",
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Top 5 Khách Hàng Thân Thiết"}
      />
    </>
  );
};

export default Top5user_friendly;
