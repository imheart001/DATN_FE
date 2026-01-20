import { useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
enum SeatStatus {
  Available = "available",
  Booked = "booked",
  Selected = "selected",
  kepted = "kepted",
  Reserved = "Reserved",
  VIP = "vip",
}

interface SeatInfo {
  row: number;
  column: number;
  status: SeatStatus;
}

const BookingSeat = () => {
  const numRows = 7;
  const numColumns = 10;

  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 5 && column >= 2 && column <= 8;
  };

  const [seats, setSeats] = useState<SeatStatus[][]>(
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        if (isVIPSeat(rowIndex, columnIndex)) {
          return SeatStatus.VIP;
        } else {
          return SeatStatus.Available;
        }
      })
    )
  );
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);

  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };

  const handleSeatClick = (row: number, column: number) => {
    const currentStatus = seats[row][column];
    let newStatus: SeatStatus;
    switch (currentStatus) {
      case SeatStatus.Available:
      case SeatStatus.VIP: // Thêm trạng thái VIP vào trạng thái có thể chọn
        newStatus = SeatStatus.Selected;
        setSelectedSeats((prevSelectedSeats) => [
          ...prevSelectedSeats,
          { row, column, status: newStatus },
        ]);
        break;
      case SeatStatus.Selected:
        newStatus = SeatStatus.Available;
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.filter(
            (seat) => seat.row !== row || seat.column !== column
          )
        );
        break;
      default:
        newStatus = currentStatus;
        break;
    }
    const updatedSeats = [...seats];
    updatedSeats[row][column] = newStatus;
    setSeats(updatedSeats);
  };
  // Tạo một mảng chứa các mã ghế J1
  const j1Seats = Array.from({ length: 20 }, (_, index) => `J${index + 1}`);

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
        <div className="Seat space-x-2 space-y-2 text-center mx-auto my-10">
          {j1Seats.map((seat) => (
            <div
              key={seat}
              className="text-[11px] text-[#FFFFFF] px-4 py-3 font-bold bg-[#EE2E24] rounded-lg inline-block"
            >
              {seat}
            </div>
          ))}
          <table>
            <tbody>
              <tr>
                <th></th>
                {Array.from({ length: numColumns }, (_, index) => (
                  <th key={index}>{index + 1}</th>
                ))}
              </tr>
              {seats.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th>{getRowName(rowIndex)}</th>
                  {row.map((status, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`seat ${status}`}
                      onClick={() => handleSeatClick(rowIndex, columnIndex)}
                    >
                      {status === SeatStatus.Available && (
                        <span>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg==" />
                        </span>
                      )}
                      {status === SeatStatus.Booked && <span>●</span>}
                      {status === SeatStatus.Selected && (
                        <span>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzElEQVR4nO2UTQrCMBCF3wUUdO/as4gboXhJEbyDvYLQZLryZ6ugF3ilVVGhwSRtpZJ8MJuSvi8zHQpEwiXnBJprCG8Q0rHKdzbIOHWXCs8ews/SvFRZ1tw7bSZ9yVf2Yr/xmsRXFzFbLWvCE2ccQHEBoWrwbQ8QJlWWM3uOHgHu0h3H9iLNOYQnaB6hOKue5Vx6dJwY82opD7zfukQ4dBY/x1uXV4tpKXyXyXrJpG9iX/5PLL/6kUgUM5RRt418F6cQbjsQp53kRnpNAYGXZLhQ5IrJAAAAAElFTkSuQmCC" />
                        </span>
                      )}
                      {status === SeatStatus.Reserved && <span>★</span>}
                      {status === SeatStatus.Booked && <span>×</span>}
                      {status === SeatStatus.VIP && (
                        <span>
                          {" "}
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2SsQ4BMRjHuxhJ2LyKMN0kCMnFU/AaEk+FuMHGargJT3Bn/0npQu6qpT2XuN/UfP33+7VfKkRFGQFqwBzYASmQqPVM7vmStoED+exl5lvJGNgAVz5Hnl0DI1PpEvcsTF7qi6FOLMdrSgfoWuRXOnFqIZC1nkU+0YmxEGCbFxpxHZgAR9xxAkLZW/vB1AWa6oALaStPMgAuKngG+qo+dSAOcx08Fk+3VOGGA/F9vJkOIH5Nv/lsxmj6xLIY/EAcZG4Ix+T2L43YN6IS/9+ohWfIEEfAtgBxVISnohzcAJ9YNflpnJMiAAAAAElFTkSuQmCC" />
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
      <div>
        <h3>Thông tin các ghế đã chọn</h3>
        <ul>
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              Row: {getRowName(seat.row)}, Column: {seat.column + 1}, Status:{" "}
              {seat.status}
            </li>
          ))}
        </ul>
      </div>
      <div className="status Seat flex space-x-[20px] items-center mx-auto justify-center mt-[36px] mb-[133px] max-w-5xl">
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
          <span className="text-[17px] text-[#8E8E8E] mx-2">Ghế đang chọn</span>
        </div>
      </div>
    </>
  );
};

export default BookingSeat;
