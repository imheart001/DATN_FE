import { Link, Outlet } from "react-router-dom"
import { Menu } from "antd";
import Header from "./Header";

const LayoutProfile = () => {
    return (
        <div className="max-w-7xl mx-auto px-10 text-white">
            <Header />
            <Menu  className="mt-[30px] " style={{ backgroundColor: '#121212' }} theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" >
                    <Link to={`profile`}>Thông Tin Khách Hàng</Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to={`BookTicketUser`}>Hành Trình Điện Ảnh</Link>
                </Menu.Item>

            </Menu>
            <Outlet />
        </div>
    )
}

export default LayoutProfile