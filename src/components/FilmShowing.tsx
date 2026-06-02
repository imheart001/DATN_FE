import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { useGetAllCateDetailByFilmQuery } from "../service/catedetail.service";
import { useGetCommentByUserIdQuery } from "../service/commentfilm.service";

type Props = {
  data: any;
};

const FilmShowing = ({ data }: Props) => {
  const { data: getCateAll } = useGetAllCateDetailByFilmQuery();
  const { data: rating } = useGetCommentByUserIdQuery(`${data.id}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();
  const categoryNames = getCateAll?.find((film: any) => film.id === data.id)
    ?.category_names;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group relative min-h-[470px] w-[245px]">
      <div className="relative h-[300px] w-[205px] rounded-2xl">
        <img
          srcSet={data.image}
          alt={data.name}
          className="h-[300px] w-[205px] rounded-2xl transition-transform transform scale-100"
        />
        <button title="Xem trailer" onClick={showModal}>
          <div className="absolute -bottom-10 flex h-full w-full items-center justify-center rounded-2xl bg-black/20 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            </svg>
          </div>
          <div className="absolute right-0 top-0 m-2 rounded-xl bg-black p-1 px-2 font-bold text-white">
            {data?.limit_age}+
          </div>
        </button>
      </div>

      <h3 className="my-[10px] mb-[7px] text-[26px] font-bold text-[#FFFFFF]">
        <Link
          to={`/movie_about/${data.id}`}
          className="transition hover:text-[#EE2E24]"
        >
          {data.name.length > 16 ? `${data.name.slice(0, 14)}...` : data.name}
        </Link>
      </h3>

      <div className="flex w-[200px] items-center justify-between space-x-5 text-[11px] text-[#8E8E8E]">
        <span>{categoryNames}</span>
        <span>
          {rating?.averageStars ? (
            <div className="flex items-center justify-center space-x-2">
              <div>{rating.averageStars}</div>
              <svg
                className="h-5 w-5"
                fill="#FADB14"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          ) : null}
        </span>
        <span>{data?.limit_age}+</span>
      </div>

      {new Date(data?.release_date) > currentDate && (
        <p className="text-[14px] text-[#c8c8c8]">
          <span className="text-[12px] font-semibold">Ngày khởi chiếu</span> :{" "}
          {new Date(data?.release_date).toLocaleDateString("en-GB")}
        </p>
      )}

      <div className="mt-4 w-[205px]">
        <Link
          to={`/movie_about/${data.id}`}
          className="inline-flex w-full items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-[#EE2E24] hover:bg-slate-900"
        >
          Xem chi tiết
        </Link>
      </div>

      <Modal
        title="Trailer"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{
          style: { backgroundColor: "#007bff", color: "white" },
        }}
        onCancel={handleCancel}
      >
        <hr className="my-4 w-full" />

        <iframe
          width="480"
          height="315"
          allowFullScreen
          src={`https://www.youtube.com/embed/${data.trailer}?autoplay=1`}
          title="Official Trailer"
          allow="autoplay"
        ></iframe>
      </Modal>
    </div>
  );
};

export default FilmShowing;