import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useFetchTimeQuery,
  useRemoveTimeMutation,
} from "../../../service/time.service";
import { ITime } from "../../../interface/model";
import AddTime from "./addTime";
import EditTime from "./EditTime";

interface DataType {
  id: string;
  time: string;
}

const { Search } = Input;

const ListTime: React.FC = () => {
  const { data: time } = useFetchTimeQuery();
  const [removeCinema] = useRemoveTimeMutation();
  console.log(time);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã giờ chiếu",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Thời gian chiếu",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditTime dataTime={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeCinema(record.id)}
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

  const dataCate = (time as any)?.data?.map((time: ITime, index: number) => ({
    key: index.toString(),
    id: time.id,
    time: time.time,
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí giờ chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập giờ chiếu hoặc mã giờ chiếu"
            style={{ width: 600 }}
          />

          <AddTime />
        </div>
      </div>
      <Table columns={columns} dataSource={dataCate} />
    </>
  );
};

export default ListTime;
