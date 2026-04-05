import { Space, Table, Input, Button, Popconfirm, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  useFetchBookTicketQuery,
} from "../../../service/book_ticket.service";
import AddBookTicket from "./AddBookTicket";

import { useFetchShowTimeQuery } from "../../../service/show.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import {
  useFetchChairsQuery,
} from "../../../service/chairs.service";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../../../service/signup_login.service";
// import { useFetchUsersQuery } from "../../../service/signup_login.service";

interface DataType {
  id: string;
  user_id: string;
  id_time_detail_date: string;
  id_time_detail_room: string;
  payment: string;
  amount: string;
  id_chair: string;
  time: string;
  id_code: string;
  status : number
}

const { Search } = Input;

const ListBookTicket: React.FC = () => {
  const { data: bookticket } = useFetchBookTicketQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const { data: users } = useFetchUsersQuery();
  const { data: roomBrand } = useFetchMovieRoomQuery();
  const { data: times } = useFetchTimeQuery();
  const { data: films } = useFetchProductQuery();
  const formatter = (value: number) =>
    `${value} Vn₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const { data: chairs } = useFetchChairsQuery();

  const [selectedIdCode, setSelectedIdCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const handlePrintTicket = (idCode: string) => {
    // console.log(`In vé với id_code: ${idCode}`);

    // const { data: qrCodeData } = useGetQRcodeByIdQuery(idCode);

    // console.log("Dữ liệu từ useGetQRcodeByIdQuery:", qrCodeData);
    // window.location.href = `http://127.0.0.1:8000/api/print-ticket/${idCode}`;
    window.open(`http://127.0.0.1:8000/api/print-ticket/${idCode}`, '_blank');
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a className="text-blue-700">{text}</a>,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "namefilm",
      key: "namefilm",
      width: "10%",
      align: "center",
      render: (text) => (
        <span>
          {text && text.length > 20 ? `${text.slice(0, 15)}...` : text}
        </span>
      ),
    },

    {
      key: "imgfilm",
      title: "Hình ảnh",
      dataIndex: "imgfilm",
      align: "center",
      width: "5%",
      render: (text: string) => <Image width={50} src={text} />,
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Ngày chiếu",
      dataIndex: "dateSee",
      key: "dateSee",
    },
    {
      title: "Giờ chiếu",
      dataIndex: "timeSee",
      key: "timeSee",
    },

    {
      title: "Ghế đặt",
      dataIndex: "ifseat",
      key: "ifseat",
      width: "10%",
      align: "center",
      render: (text) => (
        <span>{text?.length > 20 ? `${text.slice(0, 10)}...` : text}</span>
      ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: "15%",
      render: (text) => <span>{formatter(Number(text))}</span>,
    },
    {
      title: "Mã vé",
      dataIndex: "id_code",
      key: "id_code",
      align: "center",
      width: "5%",
      render: (text) => (
        <span>{text?.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
      ),
    },
    {
      title: "Phương Thức Thanh Toán",
      dataIndex: "payment",
      key: "payment",
      align: "center",
      width: "10%",
      render: (payment) => {
        let paymentName = "";
        if (payment == "1") {
          paymentName = "Vnpay";
        } else if (payment == "2") {
          paymentName = "Momo";
        } else {
          paymentName = "Khác";
        }
        return paymentName;
      },
    },
    {
      title: "Thời gian mua",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: "5%",
    },
    {
      title: "Check in",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (status) => {
        let statusTag = null;
    
        if (status === 0) {
          statusTag = (
            <Tag color="warning">
              Chưa in vé
            </Tag>
          );
        } else if (status === 1) {
          statusTag = (
            <Tag color="success">
              Đã in vé
            </Tag>
          );
        }
    
        return statusTag;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
           onClick={() => handlePrintTicket(record.id_code)}>
            In vé
            
          </Button>
        </Space>
      ),
    },
  ];
// console.log(bookticket);

  const dataBookTicket = (bookticket as any)?.data?.map(
    (bookticket: any, index: number) => {
      // const findChairbyBook_ticket = (chairs as any)?.data?.find(
      //   (chair: any) => chair.id === bookticket.id_chair
      // );
      // const findShowbyChair = (shows as any)?.data?.find(
      //   (show: any) => show.id === findChairbyBook_ticket?.id
      // );
      // console.log(findShowbyChair);
      // const filmName = films?.data?.find(
      //   (film: any) => film.id === id_time_detail?.id
      // );

      return {
        key: index.toString(),
        id: bookticket.id,
        user_id: (users as any)?.data?.find(
          (users: any) => users.id === bookticket.user_id
        )?.name,

        payment: bookticket.payment,
        status : bookticket.status,
        amount: (chairs as any)?.data?.find(
          (chair: any) => chair.id === bookticket.id_chair
        )?.price,
        ifseat: (chairs as any)?.data?.find(
          (chair: any) => chair.id === bookticket.id_chair
        )?.name,
        id_chair: bookticket.id_chair,
        time: bookticket.time,
        id_code: bookticket.id_code,
        namefilm: (films as any)?.data.find(
          (film: any) =>
            film.id ===
            (shows as any)?.data?.find(
              (show: any) =>
                show.id ===
                (chairs as any)?.data?.find(
                  (chair: any) => chair.id === bookticket.id_chair
                )?.id_time_detail
            )?.film_id
        )?.name,
        imgfilm: (films as any)?.data.find(
          (film: any) =>
            film.id ===
            (shows as any)?.data?.find(
              (show: any) =>
                show.id ===
                (chairs as any)?.data?.find(
                  (chair: any) => chair.id === bookticket.id_chair
                )?.id_time_detail
            )?.film_id
        )?.image,
        room: (roomBrand as any)?.data.find(
          (room: any) =>
            room.id ===
            (shows as any)?.data?.find(
              (show: any) =>
                show.id ===
                (chairs as any)?.data?.find(
                  (chair: any) => chair.id === bookticket.id_chair
                )?.id_time_detail
            )?.room_id
        )?.name,
        timeSee: (times as any)?.data.find(
          (time: any) =>
            time.id ===
            (shows as any)?.data?.find(
              (show: any) =>
                show.id ===
                (chairs as any)?.data?.find(
                  (chair: any) => chair.id === bookticket.id_chair
                )?.id_time_detail
            )?.time_id
        )?.time,
        dateSee: (shows as any)?.data?.find(
          (show: any) =>
            show.id ===
            (chairs as any)?.data?.find(
              (chair: any) => chair.id === bookticket.id_chair
            )?.id_time_detail
        )?.date,
        // namefilm: filmName ? filmName.name : "", // Lấy tên phim từ films
      };
      // console.log(amount);

    }
  );
  const [movies, setMovise] = useState<any>(null);
  const onSearch = (value: any, _e: any) => {
    const results = dataBookTicket.filter((item: any) => {
      return item?.id_code?.toLowerCase().includes(value.toLowerCase()) || item?.namefilm?.toLowerCase().includes(value.toLowerCase());
    });
    setMovise(results);
  };
  console.log("🚀 ~ file: ListBookTicket.tsx:260 ~ results ~ dataBookTicket:", dataBookTicket)
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Vé Đã Đặt</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập thông tin tìm kiếm"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          <AddBookTicket />
        </div>
      </div>
      {/* <Table columns={columns} dataSource={dataBookTicket} /> */}
      {!movies && <Table columns={columns} dataSource={dataBookTicket} />}
      {movies && <Table columns={columns} dataSource={movies} />}
    </>
  );
};

export default ListBookTicket;