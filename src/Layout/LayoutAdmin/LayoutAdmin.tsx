import { HeaderAdmin } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { SideBarAdmin } from "./Menu";

import { message } from "antd";

const LayoutAdmin = () => {
  let auth = JSON.parse(localStorage.getItem("user")!);
  // || auth.token === null || auth.user_id === null
  console.log(auth);

  if (!auth) {
    return <Navigate to={"/login"} />;
  }
  if (auth.role !== 1 && auth.role !== 2 && auth.role !== 3) {
    return <Navigate to={"/"} />;
  }
  // if ((auth && auth.role == 1) || auth.role == 2 || auth.role == 3) {
  //   return <Navigate to={"/admin"} />;
  // }
  return (
    <div>
      <SideBarAdmin header={<HeaderAdmin />} content={<Outlet />} />
    </div>
  );
};

export default LayoutAdmin;
