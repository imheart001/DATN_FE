import { useEffect, useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
import { useParams } from "react-router-dom";
import {
  useAddChairsMutation,
  useFetchChairsQuery,
} from "../../../service/chairs.service";
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
}

const BookingSeat = () => {
  const seatStatusByShowtime = new Map();

  const numRows = 7;
  const numColumns = 10;
  const { id } = useParams();
  const [addBooking] = useAddChairsMutation();
  const { data: DataSeatBooked } = useFetchChairsQuery();

  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 5 && column >= 2 && column <= 7;
  };

  const parseSeatNames = (seatNamesString: any) => {
    return seatNamesString.split(",").map((name: any) => name.trim());
  };

  const bookedSeatNames =
    (DataSeatBooked as any)?.data
      .map((item: any) => parseSeatNames(item.name))
      .flat() || [];

  const [seats, setSeats] = useState<SeatInfo[][]>(
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        const type = isVIPSeat(rowIndex, columnIndex)
          ? SeatType.VIP
          : SeatType.normal;
        const seatName = `${String.fromCharCode(65 + rowIndex)}${
          columnIndex + 1
        }`;
        const status = bookedSeatNames.includes(seatName)
          ? SeatStatus.Booked
          : SeatStatus.Available;
        return {
          row: rowIndex,
          column: columnIndex,
          status,
          type,
        };
      })
    )
  );

  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);

  const handleSeatClick = (row: number, column: number) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[row][column];

    if (seat.status === SeatStatus.Available) {
      updatedSeats[row][column] = { ...seat, status: SeatStatus.Selected };
      setSelectedSeats([...selectedSeats, updatedSeats[row][column]]);
    } else if (seat.status === SeatStatus.Selected) {
      updatedSeats[row][column] = { ...seat, status: SeatStatus.Available };
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
    }

    setSeats(updatedSeats);
  };

  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };

  const handleConfirmation = async () => {
    const selectedSeatsData = {
      name: selectedSeats
        .map((seat) => `${getRowName(seat.row)}${seat.column + 1}`)
        .join(", "),
      price: selectedSeats.length * 10, // Giả sử giá mỗi ghế là 10 đơn vị
      id_time_detail: id,
    };

    try {
      const response = await addBooking(selectedSeatsData);

      if ((response as any)?.data) {
        console.log("Đặt ghế thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi đặt ghế:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="title-fim text-center mx-auto space-y-[10px] my-[66px]">
        <img
          src="/openhemer.png/"
          alt=""
          className="block text-center mx-auto"
        />
        <h1 className="text-[40px]  font-bold text-[#FFFFFF]">Oppenheimer</h1>
        <span className="text-[14px] text-[#8E8E8E] block">
          Thứ Hai, ngày 21 tháng 8, 13:00-16:00
        </span>
        <span className="text-[14px] text-[#8E8E8E] block">
          Trung tâm mua sắm Poins - Audi 1
        </span>
      </div>

      <section className="Screen max-w-6xl mx-auto px-5">
        <img src="/ic-screen.png/" alt="" />
        <div className="status Seat flex space-x-[20px] items-center mx-auto justify-center  max-w-5xl">
          <div className="items-center flex">
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
      <div className="text-white mx-auto text-center">
        <h3>Thông tin các ghế đã chọn</h3>
        <ul>
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              Row: {getRowName(seat.row)}, Column: {seat.column + 1}, Loại ghế:{" "}
              {seat.type}
            </li>
          ))}
        </ul>
        <button
          className="bg-white text-black rounded-lg px-4 py-3 my-10"
          onClick={handleConfirmation}
        >
          Xác nhận đặt ghế
        </button>
      </div>
    </>
  );
};

export default BookingSeat;
