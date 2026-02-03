import React from "react";
import {
  Space,
  Table,
  Tag,
  Input,
  DatePicker,
  Button,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
// import AddFilm from "../Films/AddFilm";
import AddCategory from "../Category/AddCategory"
// import EditFilm from "../Films/EditFilm";
// import {
//   useFetchProductQuery,
//   useRemoveProductMutation,
// } from "../../../service/films.service";
import { useFetchCateQuery} from "../../../service/cate.service"
import { ICategorys } from "../../../interface/model";
// import { useRemoveCateMutation } from "../../../service/cate.service";
interface DataType {
  key: string;
  name: string;
  nameCate: string;
  slug: string;
  status: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã Category",
    dataIndex: "key",
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
    title: "Trạng thái",

    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "green" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <EditFilm /> */}

        <Popconfirm
          placement="topLeft"
          title="Bạn muốn xóa sản phẩm?"
          description="Xóa sẽ mất sản phẩm này trong database!"
          // onConfirm={() => handleRemoveProduct(record.key)}
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

const { Search } = Input;
const { RangePicker } = DatePicker;

const ListCate: React.FC = () => {
  const { data: cates } = useFetchCateQuery();
//   const [removeCate] = useRemoveCateMutation();
  console.log(cates);

  const dataCate = cates?.data?.map((cate: ICategorys, index: number) => ({
    key: index.toString(),
    name: cate?.name,
    slug: cate?.slug,
    tags: [cate.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
  }));
  

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí phim</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
          />
          <RangePicker />
          <AddCategory />
        </div>
      </div>
      <Table columns={columns} dataSource={dataCate} />
    </>
  );
};

export default ListCate;