import { useState } from "react";
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
import type { MenuProps } from "antd";

import { Layout, Menu, theme } from "antd";
import { itemStaffs, itemsAdmin, itemsAdmin3 } from "./staff";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Link, NavLink } from "react-router-dom";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Dashboard",
    "5",
    <NavLink to="/admin">
      <PieChartOutlined />
    </NavLink>
  ),
  getItem("Đặt vé", "6", <AppstoreOutlined />, [
    getItem(
      "Vé đã đặt",
      "8",
      <NavLink to="/admin/book_ticket">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phòng chiếu", "10", <AppstoreOutlined />, [
    getItem(
      "Quản lí suất chiếu",
      "11",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
    getItem(
      "Phòng chiếu",
      "12",
      <NavLink to="/admin/movieroom">
        <FormOutlined />
      </NavLink>
    ),
  ]),

  getItem("Quản lí phim", "13", <AppstoreOutlined />, [
    getItem(
      "Danh sách phim",
      "14",
      <NavLink to="/admin/listfilm">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Loại phim",
      "15",
      <NavLink to="/admin/listcate">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí rạp", "17", <HomeOutlined />, [
    getItem(
      "Rạp",
      "18",
      <NavLink to="/admin/cinema">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí đồ ăn", "19", <HomeOutlined />, [
    getItem(
      "Food",
      "20",
      <NavLink to="/admin/food">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khuyến mãi", "21", <ThunderboltOutlined />, [
    getItem(
      "List",
      "22",
      <NavLink to="/admin/vouchers">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khách hàng", "23", <TeamOutlined />, [
    getItem(
      "User",
      "24",
      <NavLink to="/admin/user">
        <CopyOutlined />
      </NavLink>
    ),
  ]),

  getItem(<Link to="/admin/members">Hội viên</Link>, "31", <TeamOutlined />),
  getItem(
    "Blogs",
    "27",
    <NavLink to="/admin/blogs">
      <PieChartOutlined />
    </NavLink>
  ),
];

interface SideBarAdminProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const SideBarAdmin: React.FC<SideBarAdminProps> = ({
  header,
  content,
}: SideBarAdminProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <svg
          width="200"
          className="m-3"
          height="60"
          xmlns="http://www.w3.org/2000/svg"
          href="http://www.w3.org/1999/xlink"
          viewBox="0 0 269.231 50"
        >
          <defs>
            <pattern
              id="patternLogo"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              viewBox="0 0 530 95"
            >
              <img src="" alt="" />
            </pattern>
          </defs>{" "}
          <rect
            id="header__logo--bg"
            width="269.231"
            height="50"
            fill="url(#patternLogo)"
          ></rect>
        </svg>

        {role === 3 && (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemsAdmin3}
          />
        )}
        {role === 2 && (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemStaffs}
          />
        )}
        {role === 1 && (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        )}
      </Sider>

      <Layout className="site-layout">
        {header}

        <Content>
          <div
            style={{
              margin: "16px 16px",
              padding: 24,
              minHeight: 900,
              background: colorBgContainer,
            }}
          >
            {content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
