
import React, { useState } from "react";

import { Space, Table, Input, Button,  Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";


import {
  useFetchMovieRoomQuery,
  useRemoveMovieRoomMutation,
} from "../../../service/movieroom.service";
import {
useFetchCinemaQuery
} from "../../../service/brand.service";
import { ICinemas, IMovieRoom } from "../../../interface/model";
import AddMovieRoom from "./AddMovieRoom";
import EditMovieRoom from "./EditMovieRoom";
interface DataType {

  id: string;
  name: string;
  id_cinema: string
}

const { Search } = Input;

const ListMovieRoom: React.FC = () => {
  const { data: movies } = useFetchMovieRoomQuery();
  const { data: cinemas } = useFetchCinemaQuery();

  const [removeMovie] = useRemoveMovieRoomMutation();
  console.log(movies);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã MovieRoom",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên MovieRoom",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "id_cinema",
      dataIndex: "id_cinema",
      key: "id_cinema",
    },
   
    {

      render: (_, record) => (
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
      ),
    },
  ];

  const dataMovie = (movies as any)?.data?.map(
    (movie: IMovieRoom, index: number) => ({
      key: index.toString(),
      id: movie.id,
      name: movie?.name,
      id_cinema: (cinemas as any)?.data?.find((cinemas: ICinemas) =>cinemas.id === movie.id_cinema)?.name

    })
  );
  const [dataList, setDataList] = useState<any>(null)

  const onSearch = (value: any, _e: any) => {
    const results =dataMovie.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()))
    setDataList(results)
  }
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


          <AddMovieRoom />
        </div>
      </div>
      {dataList ? (
      <Table columns={columns} dataSource={dataList} />
        
      ) : (

      <Table columns={columns} dataSource={dataMovie} />
      )}
    </>
  );
};


export default ListMovieRoom;
