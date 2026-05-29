import { useState } from "react";

import { Space, Table, Input, Button, Image, Popconfirm } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import AddFood from "../Food/AddFood";

import {
  useFetchFoodQuery,
  useRemoveFoodMutation,
} from "../../../service/food.service";
import { IFood } from "../../../interface/model";
import EditFood from "./EditFood";
import { formatter } from "../../../utils/formatCurrency";
import { FilterValue } from "antd/es/table/interface";
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
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Đồ Ăn",
      dataIndex: "id",
      key: "key",
    },
    {
      title: "Tên Đồ Ăn",
      dataIndex: "name",
      key: "name",
      filters: (foods as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name === value,
    },

    {
      key: "Hình Ảnh",
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      width: "20%",
      render: (text: string) => <Image width={50} src={text} />,
    },
    {
      title: "Giá Tiền",
      dataIndex: "price",
      key: "price",
      filters: (foods as any)?.data?.map((item: any) => ({
        text: item.price,
        value: item.price,
      })),
      filteredValue: filteredInfo.price || null,
      onFilter: (value: any, record) => record.price === value,
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      render: (_, record) => {
        if (role === 1) {
          return (
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
          );
        }
      },
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
  console.log("🚀 ~ file: ListFood.tsx:92 ~ dataFood ~ dataFood:", dataFood);
  const [dataList, setDataList] = useState<any>(null);
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    setFilteredInfo(filters);
  };
  const onSearch = (value: any, _e: any) => {
    const results = dataFood.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí đồ ăn</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên đồ ăn hoặc mã đồ ăn"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          {role === 1 && <AddFood />}
        </div>
      </div>
      {dataList ? (
        <Table
          columns={columns}
          dataSource={dataList}
          onChange={handleChange}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={dataFood}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default ListFood;
