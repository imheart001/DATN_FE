import type { MenuProps } from "antd";
import {
  BookOutlined,
  UserOutlined,
  ShopOutlined,
  TeamOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  FormOutlined,
  InboxOutlined,
  CopyOutlined,
  PieChartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];

export const itemStaffs = [
  getItem(
    "Dashboard",
    "1",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),

  getItem("Đặt vé", "2", <AppstoreOutlined />, [
    getItem(
      "Vé đã đặt",
      "4",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "5", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "4",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "MovieRoom",
      "5",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "6", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "7",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí đồ ăn", "12", <HomeOutlined />, [
    getItem(
      "Food",
      "10",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),

];

export const itemsAdmin: MenuItem[] = [
  getItem(
    "Dashboard",
    "1",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),
  getItem("Đặt vé", "2", <AppstoreOutlined />, [
    getItem(
      "Đặt vé",
      "3",
      <NavLink to="/admin/Tiketbookingdetail">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Vé đã đặt",
      "4",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "Hóa đơn trả",
      "5",
      <NavLink to="/admin/product/create">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "5", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "4",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "MovieRoom",
      "5",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "6", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "7",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Loại phim",
      "8",
      <NavLink to="/admin/listcate">
        <CopyOutlined />
      </NavLink>
    ),

    getItem(
      "CateDetail",
      "12",
      <NavLink to="/admin/category_detail">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí rạp", "11", <HomeOutlined />, [
    getItem(
      "Rạp",
      "12",
      <NavLink to="/admin/cinema">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí đồ ăn", "12", <HomeOutlined />, [
    getItem(
      "Food",
      "10",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khuyến mãi", "13", <ThunderboltOutlined />),
  getItem("Quản lí khách hàng", "14", <TeamOutlined />),
  getItem("Sản phẩm", "15", <ShopOutlined />, [
    getItem(
      "Sản phẩm",
      "16",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Bảng giá",
      "17",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Hệ thống", "18", <InboxOutlined />, [
    getItem(
      "Nhân viên",
      "19",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem(
    "Thống kê",
    "20",
    <NavLink to="/admin/user">
      <PieChartOutlined />
    </NavLink>
  ),
];


export const itemsAdmin3: MenuItem[] = [
  getItem(
    "Dashboard",
    "1",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),
  getItem("Đặt vé", "2", <AppstoreOutlined />, [
    getItem(
      "Đặt vé",
      "3",
      <NavLink to="/admin/Tiketbookingdetail">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Vé đã đặt",
      "4",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "Hóa đơn trả",
      "5",
      <NavLink to="/admin/product/create">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "5", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "4",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "MovieRoom",
      "5",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "6", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "7",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Loại phim",
      "8",
      <NavLink to="/admin/listcate">
        <CopyOutlined />
      </NavLink>
    ),

    getItem(
      "CateDetail",
      "12",
      <NavLink to="/admin/category_detail">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí đồ ăn", "12", <HomeOutlined />, [
    getItem(
      "Food",
      "10",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khách hàng", "14", <TeamOutlined />),
];
