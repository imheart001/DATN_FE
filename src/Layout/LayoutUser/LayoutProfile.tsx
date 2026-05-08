import { Link, Outlet } from "react-router-dom"
import { Menu } from "antd";
import Header from "./Header";
import { useState } from "react";

const LayoutProfile = () => {
    const [activeKey, setActiveKey] = useState<string>('');
    const handleMenuClick = (key: string) => {
        setActiveKey(key);
      };
    const activeStyle = {
        borderRadius: '8px',
        backgroundColor: '#f04848', // Màu nền khi mục được chọn
        color: 'white', // Màu chữ khi mục được chọn
    };
    return (
        <div className="max-w-7xl  mx-auto px-10 text-white">
            <Header />
            <Menu className="mt-[30px] bg-white "  mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item  key="1" >
                    <Link to={`profile`}>Thông Tin Khách Hàng</Link>
                </Menu.Item>
                <Menu.Item key="2" style={activeKey === '2' ? activeStyle : {}}  onClick={() => handleMenuClick('2')}>
                    <Link to={`BookTicketUser`}>Hành Trình Điện Ảnh</Link>
                </Menu.Item>
                <Menu.Item key="3" style={activeKey === '3' ? activeStyle : {}}  onClick={() => handleMenuClick('3')}>
                    <Link to={`member-info`}>Thông Tin Hội Viên</Link>
                </Menu.Item>
            </Menu>
            <Outlet/>
        </div>
    )
}

export default LayoutProfile