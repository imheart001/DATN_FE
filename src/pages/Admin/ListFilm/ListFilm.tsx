import { useState } from "react";
import {
  Space,
  Table,
  Tag,
  Input,
  DatePicker,
  Button,
  Popconfirm,
  message,
  Image,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import AddFilm from "../Films/AddFilm";

import EditFilm from "../Films/EditFilm";
import {
  useFetchProductQuery,
  useRemoveProductMutation,
} from "../../../service/films.service";
import { IFilms } from "../../../interface/model";
import Loading from "../../../components/isLoading/Loading";
import { compareDates, compareReleaseDate, extractNumber } from "../../../utils";
import { FilterValue } from "antd/es/table/interface";
interface DataType {
  key: string;
  name: string;
  slug: string;
  nameFilm: string;
  images: string;
  time: string;
  trailer: string;
  status: string;
  description: string;
  release_date: string;
  end_date: string;
  dateSt: Date;
  dateEnd: Date;
  releaseCount: number;
  tags: string[];
}
const { Search } = Input;
const { RangePicker } = DatePicker;

const ListFilm: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const { data: films, isLoading } = useFetchProductQuery();
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);
  const [removeProduct] = useRemoveProductMutation();
  if (isLoading) {
    return <Loading />;
  }
  const dataFilm = (films as any)?.data?.map((film: IFilms, index: number) => {
    let activeRelease = (film as any).releases?.find((r: any) => compareDates(r.release_date, r.end_date));
    
    if (!activeRelease) {
      activeRelease = (film as any).releases?.find((r: any) => compareReleaseDate(r.release_date));
    }
    
    const effectiveRelease = activeRelease || ((film as any).releases && (film as any).releases.length > 0
      ? [...(film as any).releases].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())[0]
      : null);

    const relDate = effectiveRelease ? effectiveRelease.release_date : film.release_date;
    const endDate = effectiveRelease ? effectiveRelease.end_date : film.end_date;

    return {
      key: index.toString(),
      name: film?.id,
      slug: film.slug,
      trailer: film.trailer,
      status: film.status,
      description: film.description,
      release_date: relDate,
      end_date: endDate,
      nameFilm: film?.name,
      limit_age: film?.limit_age,
      poster: film?.poster,
      time: film?.time,
      images: film?.image,
      dateSt: new Date(relDate),
      dateEnd: new Date(endDate),
      releaseCount: (film as any).releases?.length ?? 1,
      tags: [film.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
    };
  });
  console.log(films);

  const user = JSON.parse(localStorage.getItem("user")!);

  const role = user.role;

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã phim",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên phim",
      dataIndex: "nameFilm",
      key: "nameFilm",
      filters: (films as any)?.data?.map((item: any) => ({
        text: item.name,
        value: item.name,
      })),
      filteredValue: filteredInfo.nameFilm || null,
      onFilter: (value, record) => record.nameFilm === value,
    },
    {
      title: "Thời lượng",
      dataIndex: "time",
      key: "time",
      render: (time) => <span>{extractNumber(time)} phút</span>,
    },
    {
      title: "Ngày phát hành",
      dataIndex: "dateSt",
      key: "dateSt",
      render: (date) => <span>{date.toLocaleDateString()}</span>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "dateEnd",
      key: "dateEnd",
      render: (date) => <span>{date.toLocaleDateString()}</span>,
    },
    {
      key: "images",
      title: "Hình ảnh",
      dataIndex: "images",
      align: "center",
      width: "20%",
      render: (text: string) => <Image width={50} src={text} />,
    },
    {
      title: "Đợt chiếu",
      dataIndex: "releaseCount",
      key: "releaseCount",
      align: "center",
      render: (count: number) => (
        <Tag color={count > 1 ? "blue" : "default"}>
          {count} đợt
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "tags",
      dataIndex: "tags",
      filters: [
        { text: "Ngưng Hoạt Động", value: "Ngừng hoạt động" },
        { text: "Đang Hoạt Động", value: "Hoạt động" },
      ],
      filteredValue: filteredInfo.tags || null,
      onFilter: (value: any, record) => record.tags.includes(value),
      render: (_, { release_date, end_date }) => {
        return (
          <Tag
            color={
              compareDates(release_date, end_date)
                ? "success"
                : !compareReleaseDate(release_date) &&
                  !compareDates(release_date, end_date)
                ? "error"
                : "warning"
            }
          >
            {compareDates(release_date, end_date) && "Đang Hoạt Động"}
            {!compareReleaseDate(release_date) &&
              !compareDates(release_date, end_date) &&
              "Ngừng Hoạt Động"}
            {compareReleaseDate(release_date) &&
              !compareDates(release_date, end_date) &&
              "Sắp Chiếu"}
          </Tag>
        );
      },
    },

    {
      title: role === 1 && "Action",
      key: "action",
      render: (_, record) => {
        if (role === 1) {
          return (
            <Space size="middle">
              <EditFilm dataID={record as any} />

              <Popconfirm
                placement="topLeft"
                title="Bạn muốn xóa sản phẩm?"
                description="Xóa sẽ mất sản phẩm này trong database!"
                onConfirm={() => {
                  removeProduct(record.name);
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
  ];

  /* tim kien san pham */
  const onSearch = (value: any) => {
    setSearchText(value);
  };
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    setFilteredInfo(filters);
  };

  const filteredData = dataFilm.filter((item: any) => {
    // 1. Filter by Search Query
    const matchesSearch =
      item.nameFilm.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toString().toLowerCase().includes(searchText.toLowerCase());

    // 2. Filter by Date Range
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return matchesSearch;
    }
    const [start, end] = dateRange;
    const filmStart = new Date(item.release_date);
    const filmEnd = new Date(item.end_date);

    const filterStart = start.toDate();
    const filterEnd = end.toDate();
    filterStart.setHours(0, 0, 0, 0);
    filterEnd.setHours(23, 59, 59, 999);

    const overlaps = filmStart <= filterEnd && filmEnd >= filterStart;
    return matchesSearch && overlaps;
  });

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí phim</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
            onSearch={onSearch}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
          />
          {role === 1 && <AddFilm />}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={handleChange}
      />
    </>
  );
};

export default ListFilm;
