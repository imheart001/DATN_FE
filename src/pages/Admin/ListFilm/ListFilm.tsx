import React from "react";
import {
  Space,
  Table,
  Tag,
  Input,
  DatePicker,
  Button,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddFilm from "../Films/AddFilm";
import { NavLink } from "react-router-dom";
import EditFilm from "../Films/EditFilm";
interface DataType {
  key: string;
  name: string;
  nameFilm: string;
  time: string;
  dateSt: Date;
  dateEnd: Date;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã phim",
    dataIndex: "name",
    key: "name",
    render: (text) => <a className="text-blue-700">{text}</a>,
  },
  {
    title: "Tên phim",
    dataIndex: "nameFilm",
    key: "nameFilm",
  },
  {
    title: "Thời lượng",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Ngày phát hành",
    dataIndex: "dateSt",
    key: "dateSt",
    render: (date) => <span>{date.toLocaleDateString()}</span>,
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "dateEnd",
    key: "dateEnd",
    render: (date) => <span>{date.toLocaleDateString()}</span>,
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
        <EditFilm />

        <Popconfirm
          placement="topLeft"
          title="Bạn muốn xóa sản phẩm?"
          description="Xóa sẽ mất sản phẩm này trong database!"
          onConfirm={() => {
            // deleteProduct(record.key);
            message.success("Xóa sản phẩm thành công!");
          }}
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

const data: DataType[] = [
  {
    key: "1",
    name: "MOV10004",
    nameFilm: "The Black Doreamon 1",
    time: "180 phút",
    dateSt: new Date(2023, 4, 17),
    dateEnd: new Date(2023, 4, 30),
    tags: ["Hoạt động"],
  },
];

const { Search } = Input;
const { RangePicker } = DatePicker;
const ListFilm: React.FC = () => (
  <>
    <div className="">
      <h2 className="font-bold text-2xl my-4">Quản lí phim</h2>
      <div className="space-x-4 justify-center my-4">
        <Search
          placeholder="Nhập tên phim hoặc mã phim"
          style={{ width: 600 }}
        />
        <RangePicker />
        <AddFilm />
      </div>
    </div>
    <Table columns={columns} dataSource={data} />
  </>
);

export default ListFilm;
