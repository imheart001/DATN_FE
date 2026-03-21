import { useState } from "react";

import { Layout, Menu, theme } from "antd";
import { itemStaffs, itemsAdmin } from "./staff";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const { Content, Sider } = Layout;

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

  const {role} = useAppSelector((state: RootState) => state.auth)

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
          items={role === 1 ? itemsAdmin : itemStaffs}
        />
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
