import Header from "../../../Layout/LayoutUser/Header";
import { IFood } from "../../../interface/model";
import { useFetchFoodQuery } from "../../../service/food.service";

const F_B = () => {
  const { data: foods } = useFetchFoodQuery()
  const formatter = (value: number) =>
  `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <>
      <section
        style={{
          backgroundImage: "url(/bannerFB.png/)",
          opacity: 0.8,
        }}
        className="relative   bg-cover w-full bg-center bg-no-repeat"
      >
        <Header />

        <div className="text-center my-10 px-10 h-screen py-[200px]  max-w-screen-xl mx-auto">
          <h2 className="text-[#FFFFFF] mx-auto text-5xl font-bold">
            Nâng cao trải nghiệm xem phim của bạn với lựa chọn đồ ăn và đồ uống
            của chúng tôi!
          </h2>
          <p className="text-[#FFFFFF] mx-auto px-20 py-10">
            Đặt món trên website CGV và tận hưởng những phút giây xem phim với
            những miếng cắn ngon.
          </p>
        </div>
      </section>
      <div className="popcorn mx-auto max-w-5xl mb-20">
        <div className="space-x-[10px] text-center mt-[100px] mb-[60px]">
        </div>
        <div className="menu grid grid-cols-4 gap-7">
          {
            foods?.data.map((item: IFood, index: number) => {
              return <div key={index} className="pop w-[246px] h-[384px]">
                <img src={item.image} alt="" className="rounded-lg " />
                <h3 className="text-[#FFFFFF] my-2 font-bold text-[25px]">
                {item.name}
                </h3>
                <span className="block text-[17px] mt-2 mb-5 text-[#8E8E8E]">
                {formatter(item.price)}
                </span>
              </div>
            })
          }

        </div>
      </div>
    </>
  );
};
export default F_B;
