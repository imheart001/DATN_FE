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
  Image,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import AddFilm from "../Films/AddFilm";

import EditFilm from "../Films/EditFilm";
import {
  useFetchProductQuery,
  useRemoveProductMutation,
} from "../../../service/films.service";
import { IFilms } from "../../../interface/model";
import { compareDates } from "../../../utils";
interface DataType {
  key: string;
  name: string;
  slug: string;
  nameFilm: string;
  images: string;
  time: string;
  trailer: string;
  status: string;
  description: string;
  release_date: string;
  end_date: string
  dateSt: Date;
  dateEnd: Date;
  tags: string[];
}
const { Search } = Input;
const { RangePicker } = DatePicker;

const ListFilm: React.FC = () => {
  const { data: films } = useFetchProductQuery();
  console.log("🚀 ~ file: ListFilm.tsx:44 ~ films:", films)

  const [removeProduct] = useRemoveProductMutation();
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
      key: "images",
      title: "Hình ảnh",
      dataIndex: "images",
      align: "center",
      width: "20%",
      render: (text: string) => <Image width={50} src={text} />,
    },
    {
      title: "Trạng thái",

      key: "tags",
      dataIndex: "tags",
      render: (_, { tags, release_date, end_date }) => {
        console.log("🚀 ~ file: ListFilm.tsx:89 ~ release_date, end_date:", release_date, end_date)
        return  (
          <Tag color={compareDates(release_date, end_date) ? "success" : "error"}>
          { compareDates(release_date, end_date) ? 'Đang Hoạt Động' : 'Ngừng Hoạt Động'}
        </Tag>
        )
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditFilm dataID={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => {
              removeProduct(record.name);
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
  console.log(films);

  const dataFilm = (films as any)?.data?.map((film: IFilms, index: number) => ({
    key: index.toString(),
    name: film?.id,
    slug: film.slug,
    trailer: film.trailer,
    status: film.status,
    description: film.description,
    release_date: film.release_date,
    end_date: film.end_date,
    nameFilm: film?.name,
    time: film?.time,
    images: film?.image,
    dateSt: new Date(film.release_date),
    dateEnd: new Date(film.end_date),
    tags: [film.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
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
          <AddFilm />
        </div>
      </div>
      <Table columns={columns} dataSource={dataFilm} />
    </>
  );
};

export default ListFilm;