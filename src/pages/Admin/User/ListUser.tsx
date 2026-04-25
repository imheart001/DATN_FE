import React, { useState } from "react";

import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import { IUser } from "../../../interface/model";
import EditUser from "./EditUser";
import {
  useFetchUsersQuery,
  useRemoveUserMutation,
} from "../../../service/signup_login.service";
import { FilterValue } from "antd/es/table/interface";
import { useFetchCinemaQuery } from "../../../service/brand.service";

interface DataType {
  id: string;
  name: string;
  phone: number;
  email: string;
  role: number;
  id_cinema: number;
}

const { Search } = Input;

const ListUser: React.FC = () => {
  const { data: users } = useFetchUsersQuery();
  const { data: cinema } = useFetchCinemaQuery();
  const [removeFood] = useRemoveUserMutation();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  // Lọc ra các giá trị duy nhất từ danh sách rạp chiếu
  const unique = Array.from(new Set(users?.data?.map((item) => item.name)));
  console.log(cinema?.data[0].id);
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã User",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên User",
      dataIndex: "name",
      key: "name",
      filters: unique?.map(item => ({ text: item, value: item})),
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name === value,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Quyền Hạn",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Người Dùng", value: 0 },
        { text: "Admin Tổng", value: 1 },
        { text: "Nhân Viên", value: 2 },
        { text: "Admin Theo Rạp", value: 3 },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value: any, record) => record.role === value,
      render: (value) => {
        if (value === 0) {
          return <span color="blue">Người Dùng</span>
        }
        if (value === 1) {
          return <span color="green">Admin Tổng</span>
        }
        if (value === 2) {
          return <span color="warning">Nhân Viên</span>
        }
        if (value === 3) {
          return <span color="error">Admin Theo Rạp</span>
        }
      },
    },
    {
      title: "Rạp Chiếu",
      dataIndex: "id_cinema",
      key: "id_cinema",
      render: (value) => {
        const cinemabyID = cinema?.data.find(x => x.id === value);
        // Nếu có sự khớp, trả về tên rạp chiếu, ngược lại trả về rỗng
        return cinemabyID ? <span>{cinemabyID.name}</span> : null;
      }
    },
    {
      render: (_, record) => (
        <Space size="middle">
          <EditUser dataUser={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa user?"
            description="Xóa sẽ mất user này trong database!"
            onConfirm={() => removeFood(record.id)}
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

  const dataUser = (users as any)?.data?.map((user: IUser, index: number) => ({
    key: index.toString(),
    id: user.id,
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    role: user?.role,
    id_cinema: user?.id_cinema,
  }));
  const [dataList, setDataList] = useState<any>(null);
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  const onSearch = (value: any, _e: any) => {
    const results = dataUser.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản Lý Người Dùng</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên user"
            style={{ width: 600 }}
            onSearch={onSearch}
          />
        </div>
      </div>
      {dataList ? (
        <Table columns={columns} dataSource={dataList} onChange={handleChange} />
      ) : (
        <Table columns={columns} dataSource={dataUser} onChange={handleChange} />
      )}
    </>
  );
};

export default ListUser;
