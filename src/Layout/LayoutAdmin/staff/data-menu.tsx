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
    "32",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),

  getItem("Đặt vé", "2", <AppstoreOutlined />, [
    getItem(
      "Vé đã đặt",
      "33",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "34", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "35",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "Phòng chiếu",
      "36",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "37", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "38",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí đồ ăn", "39", <HomeOutlined />, [
    getItem(
      "Food",
      "40",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),
];

export const itemsAdmin: MenuItem[] = [
  getItem(
    "Dashboard",
    "41",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),
  getItem("Đặt vé", "42", <AppstoreOutlined />, [
    getItem(
      "Vé đã đặt",
      "44",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "46", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "47",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "Phòng chiếu",
      "48",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "49", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "50",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Loại phim",
      "51",
      <NavLink to="/admin/listcate">
        <CopyOutlined />
      </NavLink>
    ),

    getItem(
      "CateDetail",
      "52",
      <NavLink to="/admin/category_detail">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí rạp", "53", <HomeOutlined />, [
    getItem(
      "Rạp",
      "54",
      <NavLink to="/admin/cinema">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí đồ ăn", "55", <HomeOutlined />, [
    getItem(
      "Food",
      "56",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khuyến mãi", "57", <ThunderboltOutlined />),
  getItem("Quản lí khách hàng", "58", <TeamOutlined />),
  getItem("Sản phẩm", "59", <ShopOutlined />, [
    getItem(
      "Sản phẩm",
      "60",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Bảng giá",
      "61",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
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
      "Phòng chiếu",
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
