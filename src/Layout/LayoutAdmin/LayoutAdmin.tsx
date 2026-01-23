import React from "react";
import { HeaderAdmin } from "./Header";
import { Outlet } from "react-router-dom";
import { SideBarAdmin } from "./Menu";

const LayoutAdmin = () => {
  return (
    <div>
      <SideBarAdmin header={<HeaderAdmin />} content={<Outlet />} />
    </div>
  );
};

export default LayoutAdmin;
