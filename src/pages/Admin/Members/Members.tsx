import { useState } from "react";
import { Space, Table, Button, Popconfirm, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useFetchMembersQuery } from "../../../service/member.service";
import { IUser } from "../../../interface/model";
import { FilterValue } from "antd/es/table/interface";
import Search from "antd/es/input/Search";
import { useFetchUsersQuery } from "../../../service/signup_login.service";
interface DataType {
  id_card: string;
  card_class: string;
  activation_date: string;
  total_spending: number;
  accumulated_points: number;
  points_used: number;
  usable_points: number;
  id_user: number;
}
const MemberInfoAdmin = () => {
  const { data: member } = useFetchMembersQuery();
  const { data: user } = useFetchUsersQuery();
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Lọc ra các giá trị duy nhất từ danh sách rạp chiếu
  const getUniqueValues = (dataList:any, key:any) => {
    return Array.from(new Set(dataList?.data?.map(item => item[key])));
  };
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Người Dùng",
      dataIndex: "id_user",
      key: "id_user",
      filters: getUniqueValues(user, "name")?.map(item => ({ text: item, value: item })),
      filteredValue: filteredInfo.id_user || null,
      onFilter: (value: any, record) => record.id_user === value,
    },
    {
      title: "Số Thẻ",
      dataIndex: "id_card",
      key: "id_card",
    },
    {
      title: "Hạng Thẻ",
      dataIndex: "card_class",
      key: "card_class",
      filters: [
        { text: "Bình Thường", value: "Bình Thường" },
        { text: "V.I.P", value: "V.I.P" }
      ],
      filteredValue: filteredInfo.card_class || null,
      onFilter: (value: any, record) => record.card_class.includes(value),
      render: (text, record) => {
        return <Tag color={record.card_class.includes("Bình Thường") ? "blue" : record.card_class.includes("V.I.P") ? "gold" : "default"}>
        {text}
      </Tag>
      },
    },

    {
      title: "Ngày Kích Hoạt",
      dataIndex: "activation_date",
      key: "activation_date",
    },

    {
      title: "Tổng Chi Tiêu",
      dataIndex: "total_spending",
      key: "total_spending",
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      title: "Điểm Tích Lũy",
      dataIndex: "accumulated_points",
      key: "accumulated_points",
    },
    {
      title: "Điểm Đã Tiêu",
      dataIndex: "points_used",
      key: "points_used",
    },
    {
      title: "Điểm Khả Dụng",
      dataIndex: "usable_points",
      key: "usable_points",
    },
  ];
  
  const dataUser = (member as any)?.data?.map((member: DataType, index: number) => ({
    key: index.toString(),
    id_card: member.id_card,
    card_class: [(member as any)?.card_class === 1 ? "Bình Thường" : (member as any).card_class === 2 ? "V.I.P" : "Không xác định"],
    activation_date: member.activation_date,
    total_spending: member.total_spending,
    accumulated_points: member.accumulated_points,
    points_used: member.points_used,
    usable_points: member.usable_points,
    id_user: (user as any)?.data?.find(
      (user: any) => user.id === member.id_user
    )?.name,
  }));
  const [dataList, setDataList] = useState<any>(null);
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  const onSearch = (value: any, _e: any) => {
    const results = dataUser.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataList(results);
  };
  
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí hội viên</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Tìm kiếm"
            style={{ width: 600 }}
            onSearch={onSearch}
          />
        </div>
      </div>
      {dataList ? (
        <Table columns={columns} dataSource={dataList} onChange={handleChange} />
      ) : (
        <Table columns={columns} dataSource={dataUser} onChange={handleChange} />
      )}
    </>
  );
};

export default MemberInfoAdmin;
