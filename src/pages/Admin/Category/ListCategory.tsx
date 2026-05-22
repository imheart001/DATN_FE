import React, { useState } from "react";
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
  name: string;
  slug: string;
  status: number;
}

const { Search } = Input;

const ListCate: React.FC = () => {
  const { data: cates } = useFetchCateQuery();
  const [removeCate] = useRemoveCateMutation();
  console.log(cates);
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tiêu đề",
      dataIndex: "slug",
      key: "slug",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
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
        );
      },
    },
  ];

  const dataCate = (cates as any)?.data?.map(
    (cate: ICategorys, index: number) => ({
      key: index.toString(),
      id: cate.id,
      name: cate?.name,
      slug: cate?.slug,
      status: cate?.status,
      tags: [cate.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
    })
  );

  const [categoryDetails, setCategoryDetails] = useState<any>(null);

  const onSearch = (value: any, _e: any) => {
    const results = dataCate.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setCategoryDetails(results);
  };

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí loại phim</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          <AddCategory />
        </div>
      </div>
      {!categoryDetails && <Table columns={columns} dataSource={dataCate} />}
      {categoryDetails && (
        <Table columns={columns} dataSource={categoryDetails} />
      )}
    </>
  );
};

export default ListCate;
