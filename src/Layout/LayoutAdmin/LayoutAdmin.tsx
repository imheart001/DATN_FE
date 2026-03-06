import { HeaderAdmin } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { SideBarAdmin } from "./Menu";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { message } from "antd";

const LayoutAdmin = () => {
  const auth = useAppSelector((state: RootState) => state.auth)
 
    if (!auth || auth.token === null || auth.user_id === null) {
      return <Navigate to={'/error'} />
    }

    if (!auth || auth.role === 0 ) {
      message.error('Bạn không có quyền!')
      return <Navigate to={'/'} />
    }

  return (
    <div>
      <SideBarAdmin header={<HeaderAdmin />} content={<Outlet />} />
    </div>
  );
};

export default LayoutAdmin;
