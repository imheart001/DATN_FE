import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import { IBookTicket, IUser } from "../../../interface/model";
import { useFetchBookTicketQuery, useRemoveBookTicketMutation } from "../../../service/book_ticket.service";
import AddBookTicket from "./AddBookTicket";
import EditBookTicket from "./EditBookTicket";
import { useFetchUsersQuery } from "../../../service/signup_login";
import { useFetchShowTimeQuery } from "../../../service/show.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";

interface DataType {
  id: string,
  user_id: string,
  id_time_detail_date: string,
  id_time_detail_room: string,
  payment: string,
  amount: string,
  id_chair: string,
  time: string,
}

const { Search } = Input;

const ListBookTicket: React.FC = () => {
  const { data: bookticket } = useFetchBookTicketQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const [removeBookTicket] = useRemoveBookTicketMutation();
  const {data: users} = useFetchUsersQuery();
  const { data: roomBrand } = useFetchMovieRoomQuery();
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
      title: "Phòng Chiếu",
      dataIndex: "id_time_detail_room",
      key: "id_time_detail_room",
    },
    {
      title: "Giá Tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Phương Thức Thanh Toán",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Số Ghế",
      dataIndex: "id_chair",
      key: "id_chair",
    },
    {
      title: "Ngày Chiếu",
      dataIndex: "id_time_detail_time",
      key: "id_time_detail_time",
    },
    {
      title: "Thời gian chiếu",
      dataIndex: "time",
      key: "time",
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

  const dataBookTicket = (bookticket as any)?.data?.map((bookticket: any, index: number) => ({
    key: index.toString(),
    id: bookticket.id,
    user_id: (users as any)?.data?.find(
      (users: any) => users.id === bookticket.user_id
    )?.name,
    id_time_detail_time: (shows as any)?.data?.find(
      (shows: any) => shows.id === bookticket.user_id
    )?.date,
    id_time_detail_room: (roomBrand as any)?.data?.find(
      (room: any) => room.id === (shows as any)?.data?.find((shows: any) => shows.id === bookticket.user_id)?.room_id
    )?.name,
    payment: bookticket.payment,
    amount: bookticket.amount,
    id_chair: bookticket.id_chair,
    time: bookticket.time,
  }));
  console.log(dataBookTicket);

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Vé Đã Đặt</h2>
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
