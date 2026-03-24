import { useState } from "react";

import { Space, Table, Input, Button, Image, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import { IVoucher } from "../../../interface/model";
import {
  useFetchVoucherQuery,
  useRemoveVoucherMutation,
} from "../../../service/voucher.service";
import AddVoucher from "./AddVouchers";
import { formatter } from "../../../utils/formatCurrency";

interface DataType {
  id: string;
  code: string;
  start_time: string;
  end_time: string;
  usage_limit: number;
  price_voucher: number;
  remaining_limit: number;
  limit: number;
}

const { Search } = Input;

const ListVouchers: React.FC = () => {
  const { data: vouchers } = useFetchVoucherQuery();
  const [removeVoucher] = useRemoveVoucherMutation();

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Food",
      dataIndex: "id",
      key: "key",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Mã Voucher Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Price",
      dataIndex: "price_voucher",
      key: "price_voucher",
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      title: "Số lượng ban đầu",
      dataIndex: "usage_limit",
      key: "usage_limit",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "remaining_limit",
      key: "remaining_limit",
    },
    {
      render: (_, record) => (
        <Space size="middle">
          {/* <EditFood dataFood={record} /> */}

          <Popconfirm
            placement="topLeft"
            title="Bạn muốn xóa sản phẩm?"
            description="Xóa sẽ mất sản phẩm này trong database!"
            onConfirm={() => removeVoucher(record.id)}
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

  const dataVoucher = (vouchers as any)?.data?.map(
    (voucher: IVoucher, index: number) => ({
      key: index.toString(),
      id: voucher.id,
      code: voucher?.code,
      start_time: voucher?.start_time,
      end_time: voucher?.end_time,
      usage_limit: voucher?.usage_limit,
      price_voucher: voucher?.price_voucher,
      remaining_limit: voucher?.remaining_limit,
      //   tags: [food.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
    })
  );

  const [dataList, setDataList] = useState<any>(null);

  const onSearch = (value: any, _e: any) => {
    const results = dataVoucher.filter((item: any) =>
      item.code.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };

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

          <AddVoucher />
        </div>
      </div>
      {dataList ? (
        <Table columns={columns} dataSource={dataList} />
      ) : (
        <Table columns={columns} dataSource={dataVoucher} />
      )}
    </>
  );
};

export default ListVouchers;
