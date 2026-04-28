import { Table } from "antd";
import React from "react";
interface Top5user_friendlyProps {
  data: any;
}
import type { ColumnsType } from "antd/es/table";
const Top5user_friendly: React.FC<Top5user_friendlyProps> = ({ data }) => {
  console.log(data);
  interface DataType {
    key: string;
    name: string;
    money: string;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cash Assets",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const dataa: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      money: "￥300,000.00",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      money: "￥1,256,000.00",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      money: "￥120,000.00",
      address: "Sydney No. 1 Lake Park",
    },
  ];
  return (
    <>
      <div>Top5user_friendly</div>
      <Table
        columns={columns}
        dataSource={dataa}
        bordered
        title={() => "Top 5 Khách Hàng Thân Thiết"}
      />
    </>
  );
};

export default Top5user_friendly;
