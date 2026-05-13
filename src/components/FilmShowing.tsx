import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Modal } from "antd";
import { useGetAllCateDetailByFilmQuery } from "../service/catedetail.service";

type Props = {
  data: any;
};

const FilmShowing = ({ data }: Props) => {
  const { data: getCateAll, isLoading } = useGetAllCateDetailByFilmQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const currentDate = new Date();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {getCateAll && (
        <div className="relative w-[245px] h-[420px] group">
          <div className="relative rounded-2xl w-[205px] h-[300px]">
            <img
              srcSet={data.image}
              alt=""
              className="rounded-2xl w-[205px] h-[300px] transition-transform transform scale-100 "
            />
            <button title="..." onClick={showModal}>
              <div className="absolute rounded-2xl h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
              <div className="absolute bg-black m-2 text-white rounded-xl p-1 px-2 right-0 font-bold  top-0">
                {data?.limit_age}+
              </div>
            </button>
          </div>
          <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
            <Link to={`/movie_about/${data.id}`}>
              {data.name.length > 16
                ? `${data.name.slice(0, 14)}...`
                : data.name}
            </Link>
          </h3>
          <div className="space-x-5 text-[#8E8E8E] text-[11px]">
            <span>
              {
                getCateAll.find((film: any) => film.id === data.id)
                  ?.category_names
              }
            </span>
            {/* <span>IMDB 8.6</span> */}
            <span>{data?.limit_age}+</span>
          </div>
          {getCateAll && new Date(data?.release_date) > currentDate && (
            <p className=" text-[#c8c8c8] text-[14px] ">
              <span className="font-semibold text-[12px]">Ngày khởi chiếu</span>{" "}
              : {new Date(data?.release_date).toLocaleDateString("en-GB")}
            </p>
          )}

          <Modal
            className=""
            title="Trailer"
            open={isModalOpen}
            onOk={handleOk}
            okButtonProps={{
              style: { backgroundColor: "#007bff", color: "white" },
            }}
            onCancel={handleCancel}
          >
            <hr className="w-full my-4" />

            <iframe
              width="480"
              height="315"
              allowFullScreen
              src={`https://www.youtube.com/embed/${data.trailer}?autoplay=1`}
              title=" Official Trailer "
              allow="autoplay"
            ></iframe>
          </Modal>
        </div>
      )}
    </>
  );
};

export default FilmShowing;
