import React, { useState } from "react";
import { Badge, Button, Image, Input, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetBookTicketByAdminQuery } from "../../../service/book_ticket.service";

import AddBookTicket from "./AddBookTicket";
import { formatter } from "../../../utils/formatCurrency";

const ListBookTicket: React.FC = () => {
  const { Search } = Input;
  const { data: dataBook_tickets } = useGetBookTicketByAdminQuery();
  const handlePrintTicket = (idCode: string) => {
    window.open(`http://127.0.0.1:8000/api/print-ticket/${idCode}`, "_blank");
    window.location.reload();
  };

  interface DataType {
    key: React.Key;
    time: string;
    name: string;
    id_code: string;
    status: number;
    movie_room_name: string;
    name_cinema: string;
    address: string;
    date: string;
    time_suatchieu: string;
    image: string;
    total_price: number;
    food_names: string;
    chair_name: string;
    chair_price: string;
    users_name: string;
    users_email: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên KH",
      width: 100,
      dataIndex: "users_name",
      key: "users_name",
      fixed: "left",
      align: "center",
    },

    {
      title: "Check in",
      width: 150,
      align: "center",
      dataIndex: "status",
      key: "status",
      fixed: "left",
      render: (status) => {
        let statusTag = null;

        if (status === 0) {
          statusTag = <Badge status="success" text=" CHECK-IN" />;
        } else if (status === 1) {
          statusTag = (
            <Badge status="error" className="text-red-600" text="ĐÃ CHECK-IN" />
          );
        }

        return statusTag;
      },
    },
    {
      title: "Mã vé",
      dataIndex: "id_code",
      align: "center",
      width: 160,
      key: "id_code",
      render: (text) => (
        <span>{text?.length > 15 ? `${text.slice(0, 15)}...` : text}</span>
      ),
    },
    {
      title: "Ghế",
      dataIndex: "chair_name",
      align: "center",
      key: "chair_name",
      width: 100,
      render: (text) => (
        <span>{text?.length > 20 ? `${text.slice(0, 10)}...` : text}</span>
      ),
    },
    {
      title: "Combo",
      dataIndex: "food_names",
      align: "center",
      key: "food_names",
      width: 120,
      render: (text) => (
        <span>{text?.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
      ),
    },

    {
      title: "Tên Phim",
      dataIndex: "name",
      align: "center",
      key: "name",
      width: 160,
    },
    {
      key: "image",
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",

      width: 160,
      render: (text: string) => <Image width={100} src={text} />,
    },
    {
      title: "Giờ chiếu",
      dataIndex: "time_suatchieu",
      key: "2",
      align: "center",
      width: 150,
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "movie_room_name",
      key: "3",
      align: "center",
      width: 150,
    },
    {
      title: "Ngày Chiếu",
      dataIndex: "date",
      key: "4",
      align: "center",
      width: 150,
    },
    {
      title: "Chi nhánh",
      dataIndex: "name_cinema",
      key: "5",
      align: "center",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: 150,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      align: "center",
      width: 100,
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      title: "Email",
      dataIndex: "users_email",
      key: "users_email",
      align: "center",
      width: 150,
      render: (text) => (
        <span>{text?.length > 10 ? `${text.slice(0, 12)}...` : text}</span>
      ),
    },
    { title: "Ngày đặt", dataIndex: "time", key: "time" },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="group relative inline-block text-sm font-medium  focus:outline-none focus:ring active:text-red-500"
            onClick={() => handlePrintTicket(record.id_code)}
          >
            In vé
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = dataBook_tickets;
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredData = dataBook_tickets?.filter((item: any) =>
    item?.id_code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Vé Đã Đặt</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập thông tin tìm kiếm"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          <AddBookTicket />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 2200, y: 600 }}
      />
    </>
  );
};

export default ListBookTicket;
