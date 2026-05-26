import { useState } from "react";

import { Space, Table, Input, Button, Popconfirm, Switch, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import {
  useFetchMovieRoomQuery,
  useRemoveMovieRoomMutation,
  useUpdateMovieRoomMutation,
} from "../../../service/movieroom.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { ICinemas, IMovieRoom } from "../../../interface/model";
import AddMovieRoom from "./AddMovieRoom";
import EditMovieRoom from "./EditMovieRoom";
import { FilterValue } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

interface DataType {
  id: string;
  name: string;
  id_cinema: string;
}

const { Search } = Input;

const ListMovieRoom: React.FC = () => {
  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const { data: movies } = useFetchMovieRoomQuery();

  const dataMVRByAdminCinema = (movies as any)?.data.filter(
    (r: any) => r.id_cinema == IfUser.id_cinema
  );
  console.log(dataMVRByAdminCinema);
  const { data: cinemas } = useFetchCinemaQuery();
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;
  const id_cinema = user.id_cinema;
  const [updateMovieRoom] = useUpdateMovieRoomMutation();
  const navigate = useNavigate();

  const onChange = async (checked: boolean, item: any) => {
    const status = checked ? 1 : 0;
    const data = {
      name: item.name,
      id: item.id,
      status,
    };
    console.log("🚀 ~ file: ListMovieRoom.tsx:49 ~ onChange ~ data:", data);
    try {
      const result = await updateMovieRoom({ ...(data as any) });
      console.log(
        "🚀 ~ file: ListMovieRoom.tsx:51 ~ onChange ~ result:",
        result
      );

      message.success("Cập nhật sản phẩm thành công");

      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // navigate("/admin/movieroom");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };

  const [removeMovie] = useRemoveMovieRoomMutation();
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Phòng Chiếu",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Phòng Chiếu",
      dataIndex: "name",
      key: "name",
      filters: (movies as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name === value,
    },

    {
      title: "Rạp Chiếu",
      dataIndex: "id_cinema",
      key: "id_cinema",
      filters: (cinemas as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.id_cinema || null,
      onFilter: (value: any, record) => record.id_cinema === value,
    },

    {
      render: (_, record) => {
        if (role === 1 || role === 2) {
          return (
            <Space size="middle">
              <EditMovieRoom dataMovieRoom={record} />

              <Popconfirm
                placement="topLeft"
                title="Bạn muốn xóa sản phẩm?"
                description="Xóa sẽ mất sản phẩm này trong database!"
                onConfirm={() => removeMovie(record.id)}
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
      title: role === 1 && "Hành động",
      key: "action",
      render: (_: any, record: any) => {
        if (role === 1) {
          return (
            <Switch
              checked={record.status === 1 ? true : false}
              onChange={(value: boolean) => onChange(value, record)}
            />
          );
        }
      },
    },
  ];

  const dataMovie = (
    role === 1 ? (movies as any)?.data : dataMVRByAdminCinema
  )?.map((movie: IMovieRoom, index: number) => ({
    key: index.toString(),
    id: movie.id,
    name: movie?.name,
    id_cinema: (cinemas as any)?.data?.find(
      (cinemas: ICinemas) => cinemas.id === movie.id_cinema
    )?.name,
    cinema_id: (cinemas as any)?.data?.find(
      (cinemas: ICinemas) => cinemas.id === movie.id_cinema
    )?.id,
    status: movie.status,
  }));

  const resultCinemas = dataMovie?.filter(
    (item: any) => item.cinema_id === id_cinema
  );

  const [dataList, setDataList] = useState<any>(null);
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    setFilteredInfo(filters);
  };
  const onSearch = (value: any, _e: any) => {
    if (role === 1) {
      const results = dataMovie.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setDataList(results);
      return;
    }
    const results = resultCinemas.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản Lý Phòng Chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên đồ ăn hoặc mã đồ ăn"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          {role === 1 && <AddMovieRoom />}
          {role === 2 && <AddMovieRoom />}
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
          dataSource={dataMovie}
          onChange={handleChange}
        />
      )}
      {/* {!dataList && role === 3 && (
        <Table columns={columns} dataSource={resultCinemas} />
      )} */}
    </>
  );
};

export default ListMovieRoom;
