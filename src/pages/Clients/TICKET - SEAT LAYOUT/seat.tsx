import { useEffect, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import {
  useAddChairsMutation,
  useFetchChairsQuery,
} from "../../../service/chairs.service";
import {
  useFetchShowTimeQuery,
  useGetShowTimeByIdQuery,
} from "../../../service/show.service";
import { useGetProductByIdQuery } from "../../../service/films.service";
import { IFilms } from "../../../interface/model";
import { Button, Modal, message } from "antd";
import { useSelector } from "react-redux";
import { useGetCinemaByIdQuery } from "../../../service/brand.service";
import { useGetTimeByIdQuery } from "../../../service/time.service";
import Loading from "../../../components/isLoading/Loading";
import { useGetALLCateDetailByIdQuery } from "../../../service/catedetail.service";
import { useFetchPayByAmountQuery } from "../../../service/pay.service";
import { useGetMovieRoomByIdQuery } from "../../../service/movieroom.service";
enum SeatStatus {
  Available = "available",
  Booked = "booked",
  Selected = "selected",
  kepted = "kepted",
  Reserved = "Reserved",
}
enum SeatType {
  normal = "normal",
  VIP = "vip",
}
interface SeatInfo {
  row: number;
  column: number;
  status: SeatStatus;
  type: SeatType;
  price: number;
}
const BookingSeat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const numRows = 7;
  const numColumns = 10;
  const { id } = useParams();
  const selectedCinema = useSelector((state: any) => state.selectedCinema);
  const [addBooking] = useAddChairsMutation();
  const { data: DataSeatBooked, isLoading } = useFetchChairsQuery();
  const { data: TimeDetails } = useFetchShowTimeQuery();
  const { data: TimeDetailbyId } = useGetShowTimeByIdQuery(id as string);
  const { data: CinemaDetailbyId } = useGetCinemaByIdQuery(
    selectedCinema as string
  );
  // const [amount, setAmount] = useState<any>(0);

  console.log(TimeDetailbyId);
  const filterShow = (TimeDetails as any)?.data.filter(
    (show: any) => `${show.id}` === id
  );
  const formatter = (value: number) =>
    `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const idTime = filterShow?.map((time: any) => time.time_id).join(" ");
  const idFilm = filterShow?.map((film: any) => film.film_id).join(" ");
  const idRoom = filterShow?.map((film: any) => film.room_id).join(" ");
  const { data: FilmById } = useGetProductByIdQuery(idFilm);
  const { data: TimeById } = useGetTimeByIdQuery(idTime);
  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 5 && column >= 2 && column <= 7;
  };
  const { data: RoombyId } = useGetMovieRoomByIdQuery(idRoom as string);
  const cateallbyFilmID = useGetALLCateDetailByIdQuery(`${idFilm}` as string);
  console.log((cateallbyFilmID as any)?.error?.data);
  const parseSeatNames = (seatNamesString: any) => {
    return seatNamesString.split(",").map((name: any) => name.trim());
  };
  const seatBooked = (DataSeatBooked as any)?.data || [];

  // Lọc ra các phần tử có id_time_detail trùng với id từ URL params
  const filteredSeats = seatBooked.filter(
    (item: any) => `${item.id_time_detail}` === id
  );

  const bookedSeatNames =
    filteredSeats
      .map((item: any) => parseSeatNames(item.name))
      .flat()
      .flat() || [];

  const [seats, setSeats] = useState<SeatInfo[][]>(
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        const type = isVIPSeat(rowIndex, columnIndex)
          ? SeatType.VIP
          : SeatType.normal;
        const seatName = `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1
          }`;
        const status = bookedSeatNames.includes(seatName)
          ? SeatStatus.Booked
          : SeatStatus.Available;
        const price =
          status === SeatStatus.Booked
            ? 0
            : type === SeatType.VIP
              ? 70000
              : 45000; // Đặt giá cho từng loại ghế
        return {
          row: rowIndex,
          column: columnIndex,
          status,
          type,
          price,
        };
      })
    )
  );



  const handleSeatClick = (row: number, column: number) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[row][column];

    if (seat.status === SeatStatus.Available) {
      const selectedPrice = seat.type === SeatType.VIP ? 70000 : 45000;
      updatedSeats[row][column] = {
        ...seat,
        status: SeatStatus.Selected,
        price: selectedPrice,
      };
      setSelectedSeats([...selectedSeats, updatedSeats[row][column]]);
    } else if (seat.status === SeatStatus.Selected) {
      updatedSeats[row][column] = {
        ...seat,
        status: SeatStatus.Available,
        price: 0,
      };
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
    }

    setSeats(updatedSeats);
  };

  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };
                                                        //! đang lỗi không add được chair
  const handleConfirmation = async () => {
    const totalPrice = selectedSeats.reduce(
      (total, seat) => total + seat.price,
      0
    );
    const selectedSeatsData = {
      name: selectedSeats
        .map((seat) => `${getRowName(seat.row)}${seat.column + 1}`)
        .join(", "),
      price: totalPrice,
      id_time_detail: id,
    };
    try {
      const response = await addBooking(selectedSeatsData as any);

      if ((response as any)?.data) {
        message.success("Đặt ghế thành công!");
        console.log("Tổng giá tiền: " + totalPrice);
        
      }
    } catch (error) {
      console.error("Lỗi khi đặt ghế:", error);
    }
  };
  //! thêm bảng movie_chair
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const paramValue = url.searchParams.get('vnp_ResponseCode');
  if (paramValue === "00") {
    //
    useEffect(() => {
      handleConfirmation();
    }, [])
    message.success("Thêm sản phẩm thành công");
  } else if (paramValue && paramValue !== "00") {
    message.error("Thêm sản phẩm thành công");
  }
  //!lấy giá tiền
  const listPay = {
    amount: selectedSeats.reduce((total, seat) => total + seat.price, 0),
    time_detail_id: id
  }
  const { data: arr } = useFetchPayByAmountQuery(listPay);
  const parseSeatName = (seatName: string) => {
    const row = seatName.charCodeAt(0) - "A".charCodeAt(0);
    const column = parseInt(seatName.slice(1)) - 1;
    return [row, column];
  };
  useEffect(() => {
    const seatBooked = (DataSeatBooked as any)?.data || [];

    // Lọc ra các phần tử có id_time_detail trùng với id từ URL params
    const filteredSeats = seatBooked.filter(
      (item: any) => `${item.id_time_detail}` === id
    );

    // Tạo một danh sách tên ghế từ filteredSeats
    const bookedSeatNames = filteredSeats
      .map((item: any) => parseSeatNames(item.name))
      .flat();

    // Tạo một bản sao mới của mảng ghế
    const updatedSeats = [...seats];

    // Duyệt qua các ghế đã đặt và cập nhật trạng thái của chúng
    bookedSeatNames.forEach((seatName: any) => {
      const [rowIndex, columnIndex] = parseSeatName(seatName);
      if (
        rowIndex >= 0 &&
        rowIndex < numRows &&
        columnIndex >= 0 &&
        columnIndex < numColumns
      ) {
        updatedSeats[rowIndex][columnIndex].status = SeatStatus.Booked;
      }
    });

    // Cập nhật mảng ghế trong trạng thái
    setSeats(updatedSeats);
  }, [(DataSeatBooked as any)?.data]);

  if (isLoading) {
    return <Loading />; // Hoặc bạn có thể hiển thị thông báo "Loading" hoặc hiển thị một spinner
  }
  const date = (TimeDetailbyId as any)?.data.date;
  const dateObject = new Date(date);
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();

  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const formattedDate = `${day}/${month}/${year}`;


  const handleOk = () => {
    console.log(arr);
    
    window.location.href = arr.data;
    setIsModalOpen(false);
  };
  return (
    <>
      <Header />
      <div className="title-fim text-center mx-auto space-y-[10px] my-[66px]">
        <img
          src={(FilmById as any)?.data.image}
          alt=""
          className="block text-center mx-auto w-[201px] rounded-2xl h-[295px]"
        />
        <h1 className="text-[40px]  font-bold text-[#FFFFFF]">
          {(FilmById as any)?.data.name}
        </h1>
        <span className="text-[14px] text-[#8E8E8E] block">
          {dayOfWeek}, ngày {formattedDate}, {(TimeById as any)?.data.time}
        </span>
        <span className="text-[14px] text-[#8E8E8E] block">
          {(CinemaDetailbyId as any)?.data.name} -{" "}
          {(CinemaDetailbyId as any)?.data.address}
        </span>
      </div>

      <section className="Screen max-w-6xl mx-auto px-5">
        <img src="/ic-screen.png/" alt="" />
        <div className="status Seat flex space-x-[20px] items-center mx-auto  justify-center max-w-5xl">
          <div className="items-center flex ">
            <div className=" text-[#FFFFFF] px-6 py-5  bg-[#EE2E24] rounded-lg inline-block"></div>
            <span className="text-[17px] text-[#8E8E8E] mx-2">Ghế đã bán</span>
          </div>
          <div className="items-center flex">
            <div className=" text-[#FFFFFF]  px-6 py-5  bg-[#8E8E8E] rounded-lg inline-block"></div>
            <span className="text-[17px] text-[#8E8E8E] mx-2">Ghế trống</span>
          </div>
          <div className="items-center flex">
            <div className=" text-[#FFFFFF] px-6 py-5  bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg inline-block"></div>{" "}
            <span className="text-[17px] text-[#8E8E8E] mx-2">
              Ghế đang chọn
            </span>
          </div>
        </div>
        <div className="Seat space-x-2 space-y-2 text-center mx-auto my-10">
          <table>
            <tbody>
              <tr>
                <th></th>

                {Array.from({ length: numColumns }, (_, index) => (
                  <th key={index} className="text-white">
                    {index + 1}
                  </th>
                ))}
              </tr>
              {seats.map((row, rowIndex) => (
                <tr key={rowIndex} className="text-white">
                  <th>{getRowName(rowIndex)}</th>
                  {row.map((infoSeat, columnIndex) => (
                    <td
                      style={{ marginLeft: "100px" }}
                      key={columnIndex}
                      className={`seat-${infoSeat.type} ${infoSeat.status}`}
                      onClick={() => handleSeatClick(rowIndex, columnIndex)}
                    >
                      {infoSeat.status === SeatStatus.Available &&
                        infoSeat.type === SeatType.normal && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg=="
                            />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Selected &&
                        infoSeat.type === SeatType.normal && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzElEQVR4nO2UTQrCMBCF3wUUdO/as4gboXhJEbyDvYLQZLryZ6ugF3ilVVGhwSRtpZJ8MJuSvi8zHQpEwiXnBJprCG8Q0rHKdzbIOHWXCs8ews/SvFRZ1tw7bSZ9yVf2Yr/xmsRXFzFbLWvCE2ccQHEBoWrwbQ8QJlWWM3uOHgHu0h3H9iLNOYQnaB6hOKue5Vx6dJwY82opD7zfukQ4dBY/x1uXV4tpKXyXyXrJpG9iX/5PLL/6kUgUM5RRt418F6cQbjsQp53kRnpNAYGXZLhQ5IrJAAAAAElFTkSuQmCC"
                            />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Available &&
                        infoSeat.type === SeatType.VIP && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2SsQ4BMRjHuxhJ2LyKMN0kCMnFU/AaEk+FuMHGargJT3Bn/0npQu6qpT2XuN/UfP33+7VfKkRFGQFqwBzYASmQqPVM7vmStoED+exl5lvJGNgAVz5Hnl0DI1PpEvcsTF7qi6FOLMdrSgfoWuRXOnFqIZC1nkU+0YmxEGCbFxpxHZgAR9xxAkLZW/vB1AWa6oALaStPMgAuKngG+qo+dSAOcx08Fk+3VOGGA/F9vJkOIH5Nv/lsxmj6xLIY/EAcZG4Ix+T2L43YN6IS/9+ohWfIEEfAtgBxVISnohzcAJ9YNflpnJMiAAAAAElFTkSuQmCC"
                            />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Selected &&
                        infoSeat.type === SeatType.VIP && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDklEQVR4nO2SPUoDURRGv8ZSQTu3IlqlEhWF4Cp0G4Kr0mAKGzGN6Lt30mhcQUx/JGNik3kzI/PDgHPgg+G9O/e8P6mnkzyxJeNaxqOcLznz9Dtwlc41wiv7ciZyyIzxnNZUIuFcxkjOIioqzkLGvZyzclLjtoIslpvindYvXec0b7ej0o0SDhQ4LF1v3MXFPy+1nGA5Zhz9YUHzPDGlBbHk1Ud5Y1uBCzmhtrs1PuQM096FvLO7+qG69IW9bIlxIudzVThT4DgdT7isYcfDuMOYbaxyibNTWbw+XstyGNPoI6gqjvUxplJg0Lo4MMieqBuP9e+M2BvOL73Y/81RN41visdyHloQj1vx9HSCb4vVGyTN161SAAAAAElFTkSuQmCC"
                            />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Booked &&
                        infoSeat.type === SeatType.normal && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyElEQVR4nO2UQQrCMBRE5wJW2ua7c+1ZxI1QvKQI3kEv4VrdKtgLTKkpFKSR5hul0gzMJoR5yZAfIGq0ItI5YXaElITQ0yVh9kS+UEDlpgC++l5neYCfN2Ugbz3AqnpdfviAGdIR/KbqfELM1oScPqj4TEhRZ/Wuuj3ANG0CFNAk8wCZFSFXQi6EWTYPbaMAF668TtkN7antWpb4g229XXmdco2Bdnx6jxWHBtbq/8D81dfJCMZYqkZg9QCbIyGH8GDzldyoYasCCEEvQA5QsjIAAAAASUVORK5CYII="
                            />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Booked &&
                        infoSeat.type === SeatType.VIP && (
                          <span>
                            <img
                              style={{
                                marginLeft: "70px",
                                marginTop: "30px",
                                display: "inline-block",
                                transform: "scale(1.5)",
                              }}
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVR4nO2UwWoCMRRF76ZLp6jvDfgroitXpYqC9CvsbxT8Klvqwl3dunBV/YLR/ZU400WpiRMnIwOdCw8CuXknuQkBalVRBB4IfSVkRciB0CQd68zMlQSVDiFrQmmpL+MpCInHhH4QcnSArtR57TvRHuU92fx2mLXe8pw0NPQngaEDbOLN3axLaM/Dv3DFfPAA9Ajpe/gT14npAaCvH3Zwu0HEE0I3Ae/3m9Cp6e18YOkGHpvZggDQqGW712dC95lxR8hTFvtLAPDUyuB58HuXqbkVFQen8V5kELK1PYKiYHsf2ZpPY3B/cDy4OIHAsvavDJglF2ow/13UKFn8C5YloZ/lg+UunFrV0Amvia/Scg88fQAAAABJRU5ErkJggg=="
                            />
                          </span>
                        )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="text-white mx-auto text-center space-y-4">
        <h3>Thông tin các ghế đã chọn</h3>
        <ul className="flex space-x-4 text-center justify-center">
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              {getRowName(seat.row)}
              {seat.column + 1},
            </li>
          ))}
          <p>
            Tổng giá tiền:{" "}
            {formatter(
              selectedSeats.reduce((total, seat) => total + seat.price, 0)
            )}
          </p>
        </ul>
        <Button
          type="primary"
          className="bg-white text-black rounded-lg my-10 hover:danger"
          onClick={showModal}
        >
          Tiếp tục
        </Button>
      </div>
      <Modal
        title="XÁC NHẬN THÔNG TIN VÉ"
        open={isModalOpen}
        onOk={handleConfirmation}
        okButtonProps={{
          style: { backgroundColor: "#007bff", color: "white" },
        }}
        onCancel={handleCancel}
      >
        <hr className="mt-4" />
        <div className="my-10 space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <img
              src={(FilmById as any)?.data.image}
              alt=""
              className="block text-center mx-auto w-[201px] rounded-2xl h-[295px]"
            />
            <div className="space-y-2">
              <h1 className="text-3xl text-[#03599d] font-semibold font-mono">
                {(FilmById as any)?.data.name}
              </h1>
              <span className="block text-center">2D Phụ đề</span>
            </div>
          </div>
          <div className="space-y-1 ">
            <span className="block justify-center mx-5 flex  space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-tags-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
              </svg>
              <h4 className="">
                Thể loại: {(cateallbyFilmID as any)?.error?.data}
              </h4>
            </span>
            <span className="block justify-center  mx-5 flex  space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-alarm"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
              </svg>
              <h4 className="">Thời lượng: {(FilmById as any)?.data.time}</h4>
            </span>
          </div>
          <hr className="border-dashed border-2 border-sky-500" />
          <span className="block   mx-5 flex  space-x-2 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <h4 className="justify-start">Địa điểm: </h4>
            <span className="font-semibold">
              {(CinemaDetailbyId as any)?.data.name} -{" "}
              {(CinemaDetailbyId as any)?.data.address}
            </span>
          </span>
          <span className="block   mx-5 flex  space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-calendar2-week"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            </svg>
            <h4 className="">
              Ngày chiếu:{" "}
              <span className="font-semibold ">{formattedDate}</span>
            </h4>
          </span>
          <span className="block   mx-5 flex  space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-alarm"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
              <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
            </svg>
            <h4 className="">
              Giờ chiếu:{" "}
              <span className="font-semibold">
                {(TimeById as any)?.data.time}
              </span>
            </h4>
          </span>
          <span className="block   mx-5 flex  space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cast"
              viewBox="0 0 16 16"
            >
              <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0z" />
              <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086l-1-1z" />
            </svg>
            <h4 className="">
              Phòng chiếu:{" "}
              <span className="font-semibold">
                {(RoombyId as any)?.data.name}
              </span>
            </h4>
          </span>

          <span className="block   mx-5 flex  space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-inboxes-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1H4.98zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374L3.81.563zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z" />
            </svg>
            <h4 className="flex space-x-1">
              <span>Ghế ngồi</span>:{" "}
              {selectedSeats.map((seat, index) => (
                <li key={index}>
                  <span className="font-semibold">
                    {getRowName(seat.row)}
                    {seat.column + 1}
                  </span>
                </li>
              ))}
            </h4>
          </span>
          <span className="block   mx-5 flex  space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cash"
              viewBox="0 0 16 16"
            >
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
            </svg>
            <h4 className="flex space-x-1">
              <span>Tổng tiền</span>:{" "}
              <span className="font-semibold">
                {formatter(
                  selectedSeats.reduce((total, seat) => total + seat.price, 0)
                )}
              </span>
            </h4>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default BookingSeat;
