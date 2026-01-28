import React from "react";
import { Space, Table, Input, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import {
  useFetchShowTimeQuery,
  useRemoveShowTimeMutation,
} from "../../../service/show.service";
import { IFilms, IShowTime, ITime } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import AddShow from "./AddShow";
import EditShow from "./EditShow";

interface DataType {
  id: string;
  date: Date;
  time_id: string;
  film_id: string;
  room_id: string;
}

const { Search } = Input;

const ListShow: React.FC = () => {
  const { data: shows } = useFetchShowTimeQuery();
  const { data: films } = useFetchProductQuery();
  const {data: times} = useFetchTimeQuery();
  const [removeShowTimes] = useRemoveShowTimeMutation();
  // console.log(shows);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Suất Chiếu",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Phim",
      dataIndex: "film_id",
      key: "film_id",
    },
    {
      title: "Thời gian",
      dataIndex: "time_id",
      key: "time_id",
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "room_id",
      key: "room_id",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditShow dataShow={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => {
              removeShowTimes(record.id);
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

  const dataShow = (shows as any)?.data?.map((show: IShowTime, index: number) => ({
    key: index.toString(),
    id: show.id,
    date: show.date,
    film_id: (films as any)?.data?.find((films: IFilms) => films.id === show.film_id)?.name,
    time_id: (times as any)?.data?.find((times: ITime) => times.id === show.time_id)?.time,
    room_id: show.room_id,
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

          <AddShow />
        </div>
      </div>
      <Table columns={columns} dataSource={dataShow} />
    </>
  );
};

export default ListShow;