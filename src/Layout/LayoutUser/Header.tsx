import { Cascader } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFetchCinemaQuery } from "../../service/brand.service";
import { useCallback, useEffect, useState } from "react";
import { ICinemas } from "../../interface/model";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCinema } from "../../components/CinemaSlice/selectedCinemaSlice";
import { Modal, Button } from "antd";
import {
  useFetchProductQuery,
  useGetFilmCinemeByIdQuery,
} from "../../service/films.service";
import { useFetchCateDetailQuery } from "../../service/catedetail.service";
import { useFetchCateQuery } from "../../service/cate.service";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const displayRender = (labels: string[]) => labels[labels.length - 1];
const Header = () => {
  const dispatch = useDispatch();
  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const { data: listCateDetail } = useFetchCateDetailQuery();
  const { data: cateList } = useFetchCateQuery();
  const { data: cinemas } = useFetchCinemaQuery();
  const [movies, setMovies] = useState<any>([]);
  const [matchingNames, setMatchingNames] = useState([]);

  const [search, setSearch] = useState<string>("");
  const [cinemaOptions, setCinemaOptions] = useState<Option[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const { data: filmCinemaData } = useGetFilmCinemeByIdQuery(
    selectedCinema // Sử dụng selectedCinema làm tham số
  );
  const { data: films } = useFetchProductQuery();
  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };
  useEffect(() => {
    if (cinemas) {
      const cinemaData = (cinemas as any)?.data?.map((cinema: ICinemas) => ({
        value: cinema.id.toString(),
        label: cinema.name,
      }));
      setCinemaOptions(cinemaData);
    }
  }, [cinemas]);
  const onChange = (value: any) => {
    dispatch(setSelectedCinema(value));
    handleCancel();
  };

  useEffect(() => {
    const timeoutDuration = 1000 * 15 * 60;

    const timeoutId = setTimeout(() => {
      navigate("/");
      dispatch(setSelectedCinema(null));
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);
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

  const [dropdownActive, setDropDownActive] = useState(false);
  const [filmItem, setFilmItem] = useState(null);
  const [selectCategory, setSelectCategory] = useState<any>(null);

  const handleGetFilms = (id: string) => {
    const filmItem = movies.filter((film: any) => {
      return film.id === id;
    });
    setFilmItem(filmItem);
  };

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
            value={selectedCinema}
          />
        </Modal>
      )}
      <header className="max-w-5xl mx-auto px-10 ">
        <div className="flex justify-between text-[18px]  items-center py-8 text-[#8E8E8E]">
          <Link to={"/"}>
            <img srcSet="/logo.png/" alt="" />
          </Link>
          {/* <Cascader
            options={cinemaOptions}
            placeholder={"Beta Thanh Xuân"}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
            value={selectedCinema}
          /> */}
          <div className="relative p-3 bg-transparent rounded cursor-pointer w-[260px]">
            <span
              onClick={() => {
                setDropDownActive(!dropdownActive), setFilmItem(null);
              }}
              className="w-full max-w-[400px] truncate"
            >
              {selectCategory ? selectCategory.name : "tìm kiếm sản phẩm"}
            </span>
            {dropdownActive && (
              <div className="top-[calc(100%_+_8px)] z-10 absolute left-0 w-full bg-gray-400 flex gap-1 flex-col">
                {(films as any)?.data?.map((filmItemData: any) => {
                  return (
                    <p
                      onMouseOver={() => handleGetFilms(filmItemData.id)}
                      className="py-2 px-4 bg-red-100 truncate"
                      onClick={() => {
                        setSelectCategory({
                          id: filmItemData.id,
                          name: filmItemData.name,
                        }),
                        setDropDownActive(false);
                        setFilmItem(null);
                      }}
                      key={filmItemData.id}
                    >
                      {filmItemData.name}
                    </p>
                  );
                })}
              </div>
            )}
            {filmItem && (
              <div
                className="top-[calc(100%_+_8px)] z-10 left-[calc(100%_+_8px)] absolute w-[350px] bg-gray-500"
                onClick={() => {
                  navigate(`/movie_about/${(filmItem[0] as any).id}`),
                  setSelectCategory({
                    id: (filmItem[0] as any).id,
                    name: (filmItem[0] as any).name,
                  }),
                    setFilmItem(null),
                    setDropDownActive(false);
                }}
              >
                <img
                  src={(filmItem[0] as any).image}
                  alt={(filmItem[0] as any).name}
                  className="h-10 w-10 rounded"
                />
                {(filmItem[0] as any).name}
              </div>
            )}
          </div>
          <Link to={"/"} className="text-[#EE2E24] hover:text-[#EE2E24]">
            Home
          </Link>
          <Link to={"/movies"} className="hover:text-[#EE2E24]">
            Movie
          </Link>
          <Link to={"/ticket"} className="hover:text-[#EE2E24]">
            Ticket
          </Link>
          <Link to={"/F&B"} className="hover:text-[#EE2E24]">
            F&B
          </Link>
          <Link to={"/cinema"} className="hover:text-[#EE2E24]">
            Cinema
          </Link>
          <Link to={"/orther"} className="hover:text-[#EE2E24]">
            Other
          </Link>
          <Link to={"/login"}>
            <img srcSet="/person-circle.png/ 1.2x" alt="" />
          </Link>
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
