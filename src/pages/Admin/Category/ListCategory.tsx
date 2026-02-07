import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import AddCategory from "../Category/AddCategory";

import {
  useFetchCateQuery,
  useRemoveCateMutation,
} from "../../../service/cate.service";
import { ICategorys } from "../../../interface/model";
import UpdateCategory from "./UpdateCategory";

interface DataType {
  id: string;
  nameCate: string;
  slug: string;
  status: string;
  tags: string[];
}

const { Search } = Input;

const ListCate: React.FC = () => {
  const { data: cates } = useFetchCateQuery();
  const [removeCate] = useRemoveCateMutation();
  console.log(cates);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Category",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateCategory dataCate={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeCate(record.id)}
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

  const dataCate = cates?.data?.map((cate: ICategorys, index: number) => ({
    key: index.toString(),
    id: cate.id,
    name: cate?.name,
    slug: cate?.slug,
    tags: [cate.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí loại phim</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
          />

          <AddCategory />
        </div>
      </div>
      <Table columns={columns} dataSource={dataCate} />
    </>
  );
};

export default ListCate;
