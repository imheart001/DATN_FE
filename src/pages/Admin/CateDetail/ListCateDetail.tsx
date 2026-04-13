
import  { useState } from "react";

import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";


import {
  useFetchCateDetailQuery,
  useRemoveCateDetailMutation,
} from "../../../service/catedetail.service";
import { ICateDetail, ICategorys, IFilms } from "../../../interface/model";
import { useFetchCateQuery } from "../../../service/cate.service";
import { useFetchProductQuery } from "../../../service/films.service";
import AddCateDetail from "./AddCateDetail";
import EditCateDetail from "./EditCateDetail";
import { FilterValue } from "antd/es/table/interface";
interface DataType {

  id: string;
  category_id: string;
  film_id: string
}

const { Search } = Input;

const ListCateDetail: React.FC = () => {
  const { data: catedetails } = useFetchCateDetailQuery();
  const { data: cates } = useFetchCateQuery();
  const { data: films } = useFetchProductQuery();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [removeCateDetail] = useRemoveCateDetailMutation();
  console.log(catedetails);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Chi Tiết Danh Mục",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "category_id",
      key: "category_id",
      filters: cates?.data?.map((item) => ({ text: item.name, value: item.name})),
      filteredValue: filteredInfo.category_id || null,
      onFilter: (value, record) => record.category_id === value,
    },

    {
      title: "Phim",
      dataIndex: "film_id",
      key: "film_id",
      filters: films?.data?.map((item) => ({ text: item.name, value: item.name})),
      filteredValue: filteredInfo.film_id || null,
      onFilter: (value, record) => record.film_id === value,
    },

    {

      render: (_, record) => (
        <Space size="middle">
          <EditCateDetail dataCateDetail={record} />

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeCateDetail(record.id)}
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

  const dataCateDetail = (catedetails as any)?.data?.map(
    (catedetail: ICateDetail, index: number) => ({
      key: index.toString(),
      id: +catedetail?.id,
      category_id: (cates as any)?.data?.find((cates: ICategorys) => cates.id === catedetail.category_id)?.name,

      film_id: (films as any)?.data?.find((films: IFilms) => films.id === catedetail.film_id)?.name

    })
  );
  
  const [dataList, setDataList] = useState<any>(null)

  const onSearch = (value: any, _e: any) => {
    const results =dataCateDetail.filter((item: any) => item.category_id.toLowerCase().includes(value.toLowerCase()))
    setDataList(results)
  }
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản Lý Chi Tiết Danh Mục</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên đồ ăn hoặc mã đồ ăn"
            style={{ width: 600 }}
            onSearch={onSearch}
          />


          <AddCateDetail />
        </div>
      </div>
      {
        dataList ? (
          <Table columns={columns} dataSource={dataList} onChange={handleChange} />

        ) : (

          <Table columns={columns} dataSource={dataCateDetail} onChange={handleChange} />
        )
      }
    </>
  );
};


export default ListCateDetail;
