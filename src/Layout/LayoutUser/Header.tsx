import { Cascader, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFetchCinemaQuery } from "../../service/brand.service";
import { useEffect, useState } from "react";
import { ICinemas } from "../../interface/model";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCinema } from "../../components/CinemaSlice/selectedCinemaSlice";
import { Modal } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, Space, Divider, Button, theme } from "antd";
import { useFetchProductQuery } from "../../service/films.service";
import { setUserId, updateToken } from "../../components/CinemaSlice/authSlice";

import { formatter } from "../../utils/formatCurrency";
import Recharge from "../../components/Clients/NapTien/naptien";
import { useGetUserByIdQuery } from "../../service/book_ticket.service";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const displayRender = (labels: string[]) => labels[labels.length - 1];
const Header: React.FC = () => {
  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const { data: dataUserbyId } = useGetUserByIdQuery(`${IfUser?.id}`);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Chào {IfUser?.name}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Link rel="noopener noreferrer" to={`/info_account/profile`}>
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link rel="noopener noreferrer" to={`/info_account/BookTicketUser`}>
          Lịch sử đặt vé
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link rel="noopener noreferrer" to={`/info_account/BookTicketUser`}>
          Số dư: {formatter((dataUserbyId as any)?.coin)}
        </Link>
      ),
    },
    {
      key: "5",
      label: <Recharge />,
    },
    {
      key: "6",
      label: <Link to={`/info_account/member-info`}>Thông tin hội viên</Link>,
    },
    {
      key: "8",
      label: (
        <div className="">
          {(IfUser as any)?.role === 1 ? (
            <Link to="/admin">Admin</Link>
          ) : (
            "User"
          )}
        </div>
      ),
    },
    {
      key: "7",
      danger: true,
      label: (
        <button
          onClick={() => {
            message.success("Đăng xuất thành công!");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user");
            localStorage.clear();
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

  const dispatch = useDispatch();
  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const user = useSelector((state: any) => state.auth?.token);
  const { data: cinemas } = useFetchCinemaQuery();
  const [movies, setMovies] = useState<any>([]);
  const [matchingNames, setMatchingNames] = useState([]);

  const [search, setSearch] = useState<string>("");
  const [cinemaOptions, setCinemaOptions] = useState<Option[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  const { data: films } = useFetchProductQuery();
  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSearch("");
      setMatchingNames([]);
      return;
    }
    setSearch(e.target.value);
    const matches = movies.filter((movie: any) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMatchingNames(matches);
  };

  useEffect(() => {
    if (films) {
      setMovies((films as any).data);
    }
  }, [films]);
  useEffect(() => {
    if (cinemas) {
      const cinemaData = (cinemas as any)?.data
        ?.filter((cinema: ICinemas) => {
          if (cinema?.status === 1) {
            return {
              value: cinema?.id.toString(),
              label: cinema?.name,
              status: cinema?.status,
            };
          }
        })
        .map((item: any) => ({
          value: item?.id.toString(),
          label: item?.name,
          status: item?.status,
        }));
      setCinemaOptions(cinemaData);
    }
  }, [cinemas]);
  const onChange = (value: any) => {
    dispatch(setSelectedCinema(value));
    handleCancel();
  };
  const linkTo = user ? "/admin" : "/login";
  return (
    <>
      {!selectedCinema && (
        <Modal
          title="Chọn chi nhánh rạp "
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          className="top-[180px] text-center"
        >
          <Cascader
            className=" mt-2"
            options={cinemaOptions}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          />
        </Modal>
      )}
      <header className="max-w-5xl mx-auto px-10 ">
        <div className="flex justify-between text-[18px]  items-center py-8 text-[#8E8E8E]">
          <Link to={"/"}>
            <img srcSet="/lg.png/ 8x" alt="" />
          </Link>
          <Cascader
            options={cinemaOptions}
            placeholder={"Beta Thanh Xuân"}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
            value={selectedCinema}
          />
          <Link to={"/"} className=" hover:text-[#EE2E24]">
            Trang chủ
          </Link>
          <Link to={"/movies"} className="hover:text-[#EE2E24]">
            Phim
          </Link>
          <Link to={"/ticket"} className="hover:text-[#EE2E24]">
            Đặt vé
          </Link>
          <Link to={"/F&B"} className="hover:text-[#EE2E24]">
            Giá vé
          </Link>

          {(IfUser as any)?.role === 2 && (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
            >
              <Link to={linkTo}>
                <img srcSet="/person-circle.png/ 1.2x" alt="" />
              </Link>
            </Dropdown>
          )}
          {(IfUser as any)?.role === 3 && (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
            >
              <Link to={linkTo}>
                <img srcSet="/person-circle.png/ 1.2x" alt="" />
              </Link>
            </Dropdown>
          )}
          {(IfUser as any)?.role === 1 && (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
            >
              <Link to={linkTo}>
                <img srcSet="/person-circle.png/ 1.2x" alt="" />
              </Link>
            </Dropdown>
          )}
          {(IfUser as any)?.role === 0 && (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={{ pointAtCenter: true }}
            >
              <button title="...">
                <img srcSet="/person-circle.png/ 1.2x" alt="" />
              </button>
            </Dropdown>
          )}
          {(IfUser as any)?.role !== 1 &&
            (IfUser as any)?.role !== 2 &&
            (IfUser as any)?.role !== 3 &&
            (IfUser as any)?.role !== 0 && (
              <Link to={linkTo}>
                <img srcSet="/person-circle.png/ 1.2x" alt="" />
              </Link>
            )}
        </div>
        <div className="flex items-center my-2">
          <div className="relative w-full">
            <label htmlFor="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              className="bg-transparent border-2 w-full text-[#FFFFFF] border-gray-300 rounded-full pl-8 pr-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Tìm kiếm"
              name="search"
              value={search}
              onChange={(e) => handleOnChange(e)}
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="#8E8E8E"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
          <div className="mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              className="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </div>
        <ul className="bg-white">
          {matchingNames.map((movie: any) => (
            <li
              className="flex items-start justify-start gap-3 py-2 px-3 cursor-pointer hover:bg-gray-100"
              key={movie.id}
              onClick={() => {
                navigate(`/movie_about/${movie.id}`);
              }}
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="h-10 w-10 rounded"
              />
              {movie.name}
            </li>
          ))}
        </ul>
      </header>
    </>
  );
};

export default Header;
