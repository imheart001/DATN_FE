import { Link, useParams } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";
import { useGetProductByIdQuery } from "../../../service/films.service";
import MovieTrailer from "../MovieTrailer/MovieTrailer";
const Movie_About = () => {
  const { id } = useParams<string>();
  const { data: film, error, isLoading } = useGetProductByIdQuery(id);
  console.log(film);
  return (
    <div className=" text-center bg-primary">
      {/* <section className=" text-secondary p-4 relative bg-[url(/HeadermvAB.png/)] bg-cover w-full bg-center bg-no-repeat"> */}
      <section className=" text-secondary p-4">
        <Header />
      </section>
      <body>
        <div className="items-center  mt-[70px] ">
          <h1 className="text-4xl font-bold text-white mb-[20px]">Tóm tắt</h1>
          <section>
            <div
              className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                  className="relative h-200 overflow-hidden rounded-lg sm:h-200 lg:order-last lg:h-full"
                >
                  <img
                    alt="Party"
                    srcSet={film?.data.image}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="lg:py-24 flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-white sm:text-4xl mt-4"> {film?.data.name}</h2>

                  <p className="text-center text-white my-4">ĐẠO DIỄN : {film?.data.trailer}</p>

                  <p className="text-center text-white my-4">THỜI LƯỢNG: : {film?.data.time}</p>

                  <p className="text-center text-white my-4">NGÀY KHỞI CHIẾU : {film?.data.release_date}</p>

                  <p className="text-center text-white my-4">MÔ TẢ: {film?.data.description}</p>
                  <div className="col-md-16 tab-style-1 margin-bottom-35">
                    <span
                      className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm"
                    >
                      <button
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                      >
                        16/10/2023
                      </button>

                      <button
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                      >
                        16/10/2023
                      </button>

                      <button
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                      >
                        16/10/2023
                      </button>
                    </span>

                  </div>

                  <div className="flex justify-center mt-8">
                    <Link
                      to={"/book-ticket"}
                      className="px-10 rounded-3xl bg-red-600 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none active:bg-red-500 sm:w-auto"
                    >
                      Đặt vé
                    </Link>
                    <Link to={"#"}>
                      <div className="px-6 hover:bg-tertiary border-tertiary text-white border p-2 rounded-[48px] ml-4 text-gray">
                        Trailer
                      </div>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <h1 className="text-4xl font-bold text-white mb-[20px]">Movie Trailer</h1>

          <iframe
            width="1470"
            height="600"
            src="https://www.youtube.com/embed/HyuykY4fOxA"
            title="Embedded Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />



        </div>

        <h1 className="text-4xl font-bold text-white mt-[50px]">
          Dàn diễn viên
        </h1>

        <div className="flex justify-center items-center  mt-[15px]">
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob1.png/"}
              alt="Image 1"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Cillian Murphy
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">
              J. Robert Oppenheimer
            </p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob2.png/"}
              alt="Image 2"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Florence Pugh
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">Jean Tatlock</p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob3.png/"}
              alt="Image 3"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Robert Downey Jr.
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">Lewis Strauss</p>
          </div>
          <div className="w-294 h-448 rounded-lg  p-4 m-4">
            <img
              width={302}
              height={454}
              src={"/ob4.png/"}
              alt="Image 4"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl text-white font-semibold mt-4">
              Rami Malek
            </h2>
            <p className="mt-2 text-secondary text-[#8E8E8E]">David L. Hill</p>
          </div>
        </div>
        <p className="underline mt-[30px] text-secondary text-[#8E8E8E]">
          Xem thêm
        </p>
      </body>
    </div>
  );
};

export default Movie_About;
