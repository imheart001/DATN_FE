import { useState } from "react";
import { Space, Table, Input, Button, Popconfirm, Switch, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useFetchCinemaQuery,
  useRemoveCinemaMutation,
  useUpdateCinemaMutation,
} from "../../../service/brand.service";
import EditCinema from "./EditCinema";
import { ICinemas } from "../../../interface/model";
import AddCinema from "./AddCinema";
import { FilterValue } from "antd/es/table/interface";

interface DataType {
  id: string;
  name: string;
  address: string;
  status: string;
}

const { Search } = Input;

const ListCinema: React.FC = () => {
  const { data: cinemas } = useFetchCinemaQuery();
  const [removeCinema] = useRemoveCinemaMutation();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [updateCinema] = useUpdateCinemaMutation();

  // Lọc ra các giá trị duy nhất từ danh sách rạp chiếu
  // const uniqueCinemaValues = Array.from(new Set(cinemas?.data?.map(item => item.name)));

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Rạp",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Rạp",
      dataIndex: "name",
      key: "name",
      filters: cinemas?.data?.map((item) => ({ text: item.name, value: item.name })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      filters: cinemas?.data?.map((item) => ({ text: item.address, value: item.address })),
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address === value,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditCinema dataCinema={record} />

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
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => {
          return (
            <Switch
              checked={record.status === 1 ? true : false}
              onChange={(value: boolean) => onChange(value, record)}
            />
          );
      },
    },
  ];

  const onChange = async (checked: boolean, item: any) => {
    try {
      const status = checked ? 1 : 0;

      const data = {
        name: item.name,
        address: item.address,
        id: item.id,
        status,
      };
      const result = await updateCinema({ ...data });
      console.log("🚀 ~ file: ListCinema.tsx:113 ~ onChange ~ result:", result)
      message.success("cập nhật thành công!");
    } catch (error) {
      message.error(
        "Lỗi"
      );
    }
  };

  const dataCate = (cinemas as any)?.data?.map((cinema: ICinemas, index: number) => ({
    key: index.toString(),
    id: cinema.id,
    name: cinema?.name,
    address: cinema?.address,
    status: cinema?.status
  }));
  console.log("🚀 ~ file: ListCinema.tsx:82 ~ dataCate ~ dataCate:", dataCate)
  const [dataList, setDataList] = useState<any>(null)

  const onSearch = (value: any, _e: any) => {
    const results = dataCate.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()))
    setDataList(results)
  }
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Rạp Chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          <AddCinema />
        </div>
      </div>
      {dataList ? (
        <Table columns={columns} dataSource={dataList} onChange={handleChange} />

      ) : (

        <Table columns={columns} dataSource={dataCate} onChange={handleChange} />
      )}
    </>
  );
};

export default ListCinema;
