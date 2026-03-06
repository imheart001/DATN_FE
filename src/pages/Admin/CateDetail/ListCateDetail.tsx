
import React, { useState } from "react";

import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
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


  const [removeCateDetail] = useRemoveCateDetailMutation();
  console.log(catedetails);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã MovieRoom",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Category theo id",
      dataIndex: "category_id",
      key: "category_id",
    },

    {
      title: " Film id",
      dataIndex: "film_id",
      key: "film_id",
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


          <AddCateDetail />
        </div>
      </div>
      {
        dataList ? (
          <Table columns={columns} dataSource={dataList} />

        ) : (

          <Table columns={columns} dataSource={dataCateDetail} />
        )
      }
    </>
  );
};


export default ListCateDetail;
