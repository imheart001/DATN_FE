import { MenuProps, message } from "antd";
import { Dropdown, Space, Layout } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserId, updateToken } from "../../components/CinemaSlice/authSlice";
import { useDispatch } from "react-redux";
import { useFetchCinemaQuery } from "../../service/brand.service";

export const HeaderAdmin = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);
  const role = user?.role;
  const { data: cinemass } = useFetchCinemaQuery();
  const Name_Cinema = (cinemass as any)?.data?.find(
    (c: any) => c.id == user?.id_cinema
  )?.name;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="grid border-b p-3 text-center">
          <span>{user ? user.name : "Admin"}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: <span>Setting</span>,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <NavLink target="_blank" to="/">
          Client
        </NavLink>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <button
          onClick={() => {
            message.success("Đăng xuất thành công!");

            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            // localStorage.clear();
            dispatch(updateToken(null)),
              dispatch(setUserId(null)),
              setTimeout(() => {
                navigate("/");
              }, 1000);
          }}
        >
          {" "}
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <Header className="bg-white text-center text-black flex justify-end items-center">
      {role === 3 && (
        <h1 className="mx-auto text-base font-semibold">
          Nhân viên chi nhánh {Name_Cinema}
        </h1>
      )}
      {role === 2 && (
        <h1 className="mx-auto text-base font-semibold">
          Admin chi nhánh {Name_Cinema}
        </h1>
      )}
      {role === 1 && (
        <h1 className="mx-auto text-base font-semibold">Xin Chào Admin Tổng</h1>
      )}
      <Dropdown menu={{ items }}>
        <Space className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 flex justify-center">
          <i className="fa-solid fa-user-tie text-[20px]"></i>
        </Space>
      </Dropdown>
    </Header>
  );
};
