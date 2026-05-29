import { useState } from "react";

import { Space, Table, Input, Button, Image, Popconfirm, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import { IVoucher } from "../../../interface/model";
import {
  useFetchVoucherQuery,
  useRemoveVoucherMutation,
} from "../../../service/voucher.service";
import AddVoucher from "./AddVouchers";
import { formatter } from "../../../utils/formatCurrency";
import { FilterValue } from "antd/es/table/interface";

interface DataType {
  id: string;
  code: string;
  start_time: string;
  end_time: string;
  usage_limit: number;
  price_voucher: number;
  remaining_limit: number;
  limit: number;
  status: string
}

const { Search } = Input;

const ListVouchers: React.FC = () => {
  const { data: vouchers } = useFetchVoucherQuery();
  const [removeVoucher] = useRemoveVoucherMutation();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});

  function kiemTraHetHan(ngayKetThucStr: any, ngayBatDauStr:  any) {
    const ngayKetThuc = new Date(ngayKetThucStr);
    const ngayBatDau = new Date(ngayBatDauStr);
    const ngayHienTai = new Date();
    if(ngayBatDau > ngayHienTai){
      return 0; // Chưa áp dụng
    }
    else if (ngayHienTai > ngayKetThuc) {
      return 1; // Hết hạn
    } else {
      return 2; // Đang sử dụng
    }
  }
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Chưa Áp Dụng", value: 0 },
        { text: "Đã Hết Hạn", value: 1 },
        { text: "Đang Sử Dụng", value: 2 },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value: any, record) => record.status === value,
      render: (item: any) => {
        if (item === 0) {
          return <Tag color="warning">Chưa Áp Dụng</Tag>;
        }
        else if (item === 1) {
          return <Tag color="error">Đã Hết Hạn</Tag>;
        } else {
          return <Tag color="success">Đang Sử Dụng</Tag>;
        }
      },
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
      status: kiemTraHetHan(voucher?.end_time, voucher?.start_time),

    })
  );

  const [dataList, setDataList] = useState<any>(null);
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  const onSearch = (value: any, _e: any) => {
    const results = dataVoucher.filter((item: any) =>
      item.code.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí khuyến mãi</h2>
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
        <Table columns={columns} dataSource={dataList} onChange={handleChange} />
      ) : (
        <Table columns={columns} dataSource={dataVoucher} onChange={handleChange} />
      )}
    </>
  );
};

export default ListVouchers;
