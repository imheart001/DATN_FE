import React from "react";

import { Space, Table, Input, Button, Image, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import AddFood from "../Food/AddFood";

import {
  useFetchFoodQuery,
  useRemoveFoodMutation,
} from "../../../service/food.service";
import { IFood } from "../../../interface/model";
import EditFood from "./EditFood";
interface DataType {
  id: string;
  name: string;
  image: string;
  price: number;
}

const { Search } = Input;

const ListFood: React.FC = () => {
  const { data: foods } = useFetchFoodQuery();
  const [removeFood] = useRemoveFoodMutation();
  console.log(foods);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Food",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Food",
      dataIndex: "name",
      key: "name",
    },

    {
      key: "image",
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      width: "20%",
      render: (text: string) => <Image width={50} src={text} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      render: (_, record) => (
        <Space size="middle">
          <EditFood dataFood={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
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

  const dataFood = (foods as any)?.data?.map((food: IFood, index: number) => ({
    key: index.toString(),
    id: food.id,
    name: food?.name,
    image: food?.image,
    price: food?.price,
    //   tags: [food.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí đồ ăn</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên đồ ăn hoặc mã đồ ăn"
            style={{ width: 600 }}
          />

          <AddFood />
        </div>
      </div>
      <Table columns={columns} dataSource={dataFood} />
    </>
  );
};

export default ListFood;
