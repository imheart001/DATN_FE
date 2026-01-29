import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useFetchCinemaQuery,
  useRemoveCinemaMutation,
} from "../../../service/brand.service";
import EditCinema from "./EditCinema";
import { ICinemas } from "../../../interface/model";
import AddCinema from "./AddCinema";

interface DataType {
  id: string;
  name: string;
  address: string;
  status: string;
}

const { Search } = Input;

const ListCinema: React.FC = () => {
  const { data: cinemas } = useFetchCinemaQuery();
  const [removeCinema] = useRemoveCinemaMutation();
  console.log(cinemas);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Rạp",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Rạp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditCinema dataCinema={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeCinema(record.id)}
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

  const dataCate = (cinemas as any )?.data?.map((cinema: ICinemas, index: number) => ({
    key: index.toString(),
    id: cinema.id,
    name: cinema?.name,
    address: cinema?.address,
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Rạp Chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
          />

          <AddCinema />
        </div>
      </div>
      <Table columns={columns} dataSource={dataCate} />
    </>
  );
};

export default ListCinema;
