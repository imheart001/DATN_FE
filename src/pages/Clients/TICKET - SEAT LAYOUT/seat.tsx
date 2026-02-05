import { useState } from "react";
import Header from "../../../Layout/LayoutUser/Header";
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
  const numRows = 7;
  const numColumns = 10;

  const isVIPSeat = (row: number, column: number): boolean => {
    return row >= 1 && row <= 5 && column >= 2 && column <= 7;
  };

  const [seats, setSeats] = useState<SeatInfo[][]>(
    [...Array(numRows)].map((_, rowIndex) =>
      Array.from({ length: numColumns }, (_, columnIndex) => {
        const type = isVIPSeat(rowIndex, columnIndex)
          ? SeatType.VIP
          : SeatType.normal;
        return {
          row: rowIndex,
          column: columnIndex,
          status: SeatStatus.Available,
          type,
        };
      })
    )
  );
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);
  const handleSeatClick = (row: any, column: any) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[row][column];

    if (seat.status === SeatStatus.Available) {
      // Nếu ghế trống, bạn có thể đặt nó
      updatedSeats[row][column] = { ...seat, status: SeatStatus.Selected };
      setSelectedSeats([...selectedSeats, updatedSeats[row][column]]);
    } else if (seat.status === SeatStatus.Selected) {
      // Nếu ghế đang chọn, bạn có thể bỏ chọn nó
      updatedSeats[row][column] = { ...seat, status: SeatStatus.Available };
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
    } else if (seat.status === SeatStatus.Booked) {
      // Nếu ghế đã được đặt, không làm gì cả
      return;
    }

    setSeats(updatedSeats);
  };
  const getRowName = (row: number): string => {
    return String.fromCharCode(65 + row);
  };

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
                <tr key={rowIndex} >
                  <th >{getRowName(rowIndex)}</th>
                  {row.map((infoSeat, columnIndex) => (
                    <td style={{ marginLeft: '100px' }}
                      key={columnIndex}
                      className={`seat-${infoSeat.type} ${infoSeat.status}`}
                      onClick={() => handleSeatClick(rowIndex, columnIndex)}
                    >
                      {infoSeat.status === SeatStatus.Available &&
                        infoSeat.type === SeatType.normal && (
                          <span >
                            <img style={{ marginLeft: '70px', marginTop: '30px', display: 'inline-block', transform: 'scale(1.5)' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg==" />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Selected &&
                        infoSeat.type === SeatType.normal && (
                          <span  >
                            <img style={{ marginLeft: '70px', marginTop: '30px',display: 'inline-block', transform: 'scale(1.5)' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzElEQVR4nO2UTQrCMBCF3wUUdO/as4gboXhJEbyDvYLQZLryZ6ugF3ilVVGhwSRtpZJ8MJuSvi8zHQpEwiXnBJprCG8Q0rHKdzbIOHWXCs8ews/SvFRZ1tw7bSZ9yVf2Yr/xmsRXFzFbLWvCE2ccQHEBoWrwbQ8QJlWWM3uOHgHu0h3H9iLNOYQnaB6hOKue5Vx6dJwY82opD7zfukQ4dBY/x1uXV4tpKXyXyXrJpG9iX/5PLL/6kUgUM5RRt418F6cQbjsQp53kRnpNAYGXZLhQ5IrJAAAAAElFTkSuQmCC" />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Available &&
                        infoSeat.type === SeatType.VIP && (
                          <span >
                            <img style={{ marginLeft: '70px', marginTop: '30px' ,display: 'inline-block', transform: 'scale(1.5)'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2SsQ4BMRjHuxhJ2LyKMN0kCMnFU/AaEk+FuMHGargJT3Bn/0npQu6qpT2XuN/UfP33+7VfKkRFGQFqwBzYASmQqPVM7vmStoED+exl5lvJGNgAVz5Hnl0DI1PpEvcsTF7qi6FOLMdrSgfoWuRXOnFqIZC1nkU+0YmxEGCbFxpxHZgAR9xxAkLZW/vB1AWa6oALaStPMgAuKngG+qo+dSAOcx08Fk+3VOGGA/F9vJkOIH5Nv/lsxmj6xLIY/EAcZG4Ix+T2L43YN6IS/9+ohWfIEEfAtgBxVISnohzcAJ9YNflpnJMiAAAAAElFTkSuQmCC" />
                          </span>
                        )}
                      {infoSeat.status === SeatStatus.Selected &&
                        infoSeat.type === SeatType.VIP && (
                          <span >
                            <img style={{ marginLeft: '70px', marginTop: '30px',display: 'inline-block', transform: 'scale(1.5)' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDklEQVR4nO2SPUoDURRGv8ZSQTu3IlqlEhWF4Cp0G4Kr0mAKGzGN6Lt30mhcQUx/JGNik3kzI/PDgHPgg+G9O/e8P6mnkzyxJeNaxqOcLznz9Dtwlc41wiv7ciZyyIzxnNZUIuFcxkjOIioqzkLGvZyzclLjtoIslpvindYvXec0b7ej0o0SDhQ4LF1v3MXFPy+1nGA5Zhz9YUHzPDGlBbHk1Ud5Y1uBCzmhtrs1PuQM096FvLO7+qG69IW9bIlxIudzVThT4DgdT7isYcfDuMOYbaxyibNTWbw+XstyGNPoI6gqjvUxplJg0Lo4MMieqBuP9e+M2BvOL73Y/81RN41visdyHloQj1vx9HSCb4vVGyTN161SAAAAAElFTkSuQmCC" />
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
              Row: {getRowName(seat.row)}, Column: {seat.column + 1}, Loại ghế:{" "}
              {seat.type}
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
