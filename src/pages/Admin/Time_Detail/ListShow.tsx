import React, { useState } from "react";
import { Space, Table, Input, Button, Popconfirm, message, Switch } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { IFilms, IMovieRoom, IShowTime, ITime } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import EditShow from "./EditShow";
import {
  useFetchShowTimeQuery,
  useGetShowTimeByAdminCinemaQuery,
  useRemoveShowTimeMutation,
  useUpdateShowTimeMutation,
} from "../../../service/show.service";
import AddShow from "./AddShow";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { FilterValue } from "antd/es/table/interface";

interface DataType {
  id: string;
  date: Date;
  time_id: string;
  film_id: string;
  room_id: string;
}

const { Search } = Input;

const ListShow: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const { data: roomBrand } = useFetchMovieRoomQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const { data: films } = useFetchProductQuery();
  const { data: times } = useFetchTimeQuery();
  const { data: room } = useFetchMovieRoomQuery();
  const [removeShowTimes] = useRemoveShowTimeMutation();

  let user = JSON.parse(localStorage.getItem("user")!);
  const { data: dataShowsByAdminCinema } = useGetShowTimeByAdminCinemaQuery(
    `${user?.id_cinema}`
  );
  console.log(shows);
  // const showsByAdminCinema = (shows as any)?.data.filter(s=>s.)
  const role = user?.role;

  const [updateShowTime] = useUpdateShowTimeMutation();

  const onChange = async (checked: boolean, item: any) => {
    try {
      const status = checked ? 1 : 0;

      const data = {
        date: item.date,
        film_id: item.id_film,
        room_id: item.id_room,
        time_id: item.id_time,
        status,
      };
      const result = await updateShowTime({ ...data, id: item.id });
      if ((result as any).error) {
        message.error("Có lỗi xảy ra");
        return;
      }
      message.success("cập nhật thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  // console.log(shows);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Suất Chiếu",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Tên Phim",
      dataIndex: "film_id",
      key: "film_id",
      filters: (films as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.film_id || null,
      onFilter: (value: string, record: DataType) =>
        record.film_id.includes(value),
    },
    {
      title: "Thời gian",
      dataIndex: "time_id",
      key: "time_id",
      filters: (times as any)?.data?.map((item: any) => ({
        text: item.time,
        value: item.time,
      })),
      filteredValue: filteredInfo.time_id || null,
      onFilter: (value: string, record: DataType) =>
        record.time_id.includes(value),
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "room_id",
      key: "room_id",
      filters: (room as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.room_id || null,
      onFilter: (value: string, record: DataType) =>
        record.room_id.includes(value),
    },
    {
      title: role !== 1 && "Rạp Chiếu",
      dataIndex: role !== 1 && "name",
      key: role !== 1 && "name",
    },
    {
      title: role === 1 && "Action",
      key: "action",
      render: (_, record) => {
        if (role === 1 || role === 2) {
          return (
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
          );
        }
      },
    },
    {
      title: role == 1 && "Hành động",
      key: "action",
      render: (_: any, record) => {
        if (role == 1) {
          return (
            <Switch
              checked={(record as any).status === 1 ? true : false}
              onChange={(value: boolean) => onChange(value, record)}
            />
          );
        }
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataShow = (
    role === 1 ? (shows as any) : (dataShowsByAdminCinema as any)
  )?.data?.map((show: IShowTime, index: number) => {
    return {
      key: index.toString(),
      id: show.id,
      date: show.date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      film_id: (films as any)?.data?.find(
        (films: IFilms) => films.id === show.film_id
      )?.name,
      id_film: (films as any)?.data?.find(
        (films: IFilms) => films.id === show.film_id
      )?.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      time_id: (times as any)?.data?.find(
        (times: ITime) => times.id === show.time_id
      )?.time,
      id_time: (times as any)?.data?.find(
        (times: ITime) => times.id === show.time_id
      )?.id,
      id_room: (roomBrand as any)?.data?.find(
        (room: IMovieRoom) => room.id === show.room_id
      )?.id,
      room_id: (roomBrand as any)?.data?.find(
        (room: IMovieRoom) => room.id === show.room_id
      )?.name,
      name: show.name,
      status: show.status,
    };
  });

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    console.log(filters);

    setFilteredInfo(filters);
  };
  const [dataShows, setDateShows] = useState<any>(null);

  const onSearch = (value: any, _e: any) => {
    const results = dataShow.filter((item: any) =>
      item.film_id.toLowerCase().includes(value.toLowerCase())
    );
    setDateShows(results);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Suất Chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          {role === 1 && <AddShow />}
          {role === 2 && <AddShow />}
        </div>
      </div>
      {dataShows ? (
        <Table
          columns={columns}
          dataSource={dataShows}
          onChange={handleChange}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={dataShow}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default ListShow;
