import React from 'react'

import { useState } from "react";

import { Space, Table, Input, Button, Image, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import AddBlog from "../Blogs/AddBlog";


import { IBlogs } from "../../../interface/model";
import UpdateBlog from "./UpdateBlog";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import { formatter } from "../../../utils/formatCurrency";
import { useFetchBlogQuery , useRemoveBlogMutation} from '../../../service/blog.service';
interface DataType {
    id: string;
    title: string;
    slug: string;
    image: string;
    content: string;
    status: number;
}

const { Search } = Input;

const ListBlog: React.FC = () => {
  const { data: blogs } = useFetchBlogQuery();
  const [removeBlog] = useRemoveBlogMutation();

  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user.role;

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Blogs",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Title Blogs",
      dataIndex: "title",
      key: "title",
    },
    {
        title: "Slug Blogs",
        dataIndex: "slug",
        key: "slug",
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
        title: "Content",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    {
      render: (_, record) => {
        if (role === 1) {
          return (
            <Space size="middle">
              <UpdateBlog dataBlog={record} />
              <Popconfirm
                placement="topLeft"
                title="Bạn muốn xóa sản phẩm?"
                description="Xóa sẽ mất sản phẩm này trong database!"
                onConfirm={() => removeBlog(record.id)}
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

  const dataBlog = (blogs as any)?.data?.map((blog: IBlogs, index: number) => ({
    key: index.toString(),
    id: blog.id,
    title: blog?.title,
    slug: blog?.slug,
    image: blog?.image,
    content: blog?.content,
    status: blog?.status,
      tags: [blog.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
  }));
  console.log("🚀 ~ file: ListBlog.tsx:92 ~ dataBlog ~ dataBlog:", dataBlog);
  const [dataList, setDataList] = useState<any>(null);

  const onSearch = (value: any, _e: any) => {
    const results = dataBlog.filter((item: any) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };

  return (
    <>
        <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí  blogs</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên đồ ăn hoặc mã đồ ăn"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          {role === 1 && <AddBlog />}
        </div>
      </div>
      {dataList ? (
        <Table columns={columns} dataSource={dataList} />
      ) : (
        <Table columns={columns} dataSource={dataBlog} />
      )}
       
    </>
  );
};

export default ListBlog;
