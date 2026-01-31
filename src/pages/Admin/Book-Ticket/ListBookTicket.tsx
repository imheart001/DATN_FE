import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useFetchCinemaQuery,
  useRemoveCinemaMutation,
} from "../../../service/brand.service";
import { IBookTicket, ICinemas } from "../../../interface/model";
import { useFetchBookTicketQuery, useRemoveBookTicketMutation } from "../../../service/book_ticket.service";
import AddBookTicket from "./AddBookTicket";
import EditBookTicket from "./EditBookTicket";

interface DataType {
    id: string,
    user_id: string,
    id_time_detail: string,
    payment: string,
    amount: string,
    price: string,
    status: number,
}

const { Search } = Input;

const ListBookTicket: React.FC = () => {
  const { data: bookticket } = useFetchBookTicketQuery();
  const [removeBookTicket] = useRemoveBookTicketMutation();
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Vé",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
        title: "Suất Chiếu",
        dataIndex: "id_time_detail",
        key: "id_time_detail",
      },
      {
        title: "Số Lượng",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Giá Tiền",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Thanh Toán",
        dataIndex: "payment",
        key: "payment",
      },
      {
        title: "Trạng Thái",
        dataIndex: "status",
        key: "status",
      },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditBookTicket dataCinema={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeBookTicket(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: { backgroundColor: "#007bff", color: "white" },
            }}
            cancelButtonProps={{
              style: { backgroundColor: "#dc3545", color: "white" },
            }}
          >
            <Button>
              <div className="flex ">
                <DeleteOutlined />
              </div>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataBookTicket = (bookticket as any )?.data?.map((bookticket: IBookTicket, index: number) => ({
    key: index.toString(),
    id: bookticket.id,
    user_id: bookticket.user_id,
    id_time_detail: bookticket.id_time_detail,
    payment: bookticket.payment,
    amount: bookticket.amount,
    price: bookticket.price,
    status: bookticket.status,
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Vé Đặt</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập thông tin tìm kiếm"
            style={{ width: 600 }}
          />

          <AddBookTicket />
        </div>
      </div>
      <Table columns={columns} dataSource={dataBookTicket} />
    </>
  );
};

export default ListBookTicket;
