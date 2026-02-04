import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";

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
    "1",
    <NavLink to="/admin/dashboard">
      <PieChartOutlined />
    </NavLink>
  ),
  getItem("Đặt vé", "2", <AppstoreOutlined />, [
    getItem(
      "Đặt vé",
      "3",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Vé đã đặt",
      "4",
      <NavLink to="/admin/product/create">
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
      "Quản lí suất chiếu",
      "9",
      <NavLink to="/admin/show">
        <FormOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí rạp", "10", <HomeOutlined />, [
    getItem(
      "Rạp",
      "11",
      <NavLink to="/admin/cinema">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Quản lí khuyến mãi", "12", <ThunderboltOutlined />),
  getItem("Quản lí khách hàng", "13", <TeamOutlined />),
  getItem("Sản phẩm", "14", <ShopOutlined />, [
    getItem(
      "Sản phẩm",
      "15",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
    getItem(
      "Bảng giá",
      "16",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem("Hệ thống", "17", <InboxOutlined />, [
    getItem(
      "Nhân viên",
      "18",
      <NavLink to="/admin/product">
        <CopyOutlined />
      </NavLink>
    ),
  ]),
  getItem(
    "Thống kê",
    "19",
    <NavLink to="/admin/user">
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
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout className="site-layout">
        {header}

        <Content>
          <div
            style={{
              margin: "16px 16px",
              padding: 24,
              minHeight: 360,
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
