import { useGetBookTicketByUserQuery } from "../../../service/book_ticket.service"
import { Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface DataType {
    time: string;
    total_price: string;
    film_name: string;
    film_image: string;
    id_code: string;
    date: string;
    time_td: string;
    food_names: string | undefined;
    chair_name: string;
    chair_price: string;
    cinema_name: string;
}

const BookTicketUser = () => {
    const idUser = localStorage.getItem("user_id");
    const { data: fetchBookTicket } = useGetBookTicketByUserQuery(idUser);
    console.log("alo",idUser);
    const formatter = (value: number) =>
        `${value} Vn₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // const { Search } = Input;
    const columns: ColumnsType<DataType> = [
        {
            title: "MÃ HÓA ĐƠN",
            dataIndex: "id_code",
            key: "id_code",
            render: (text) => (
                <span>
                    {text && text.length > 20 ? `${text.slice(0, 10)}...` : text}
                </span>
            ),
        },
        {
            title: "PHIM",
            dataIndex: "film_name",
            key: "film_name",
            align: "center",
            width: "10%",
            render: (text: any) => <span>
                {text && (
                    <div>
                        <p className="whitespace-nowrap">
                            <Image width={50} src={text.img} />
                        </p>
                        <p className="whitespace-nowrap">
                            <b>{text.name}</b>
                        </p>
                    </div>
                )}
            </span>
        },
        {
            title: "RẠP CHIẾU",
            dataIndex: "cinema_name",
            key: "cinema_name",
            width: "10%",
            align: "center",
            render: (text) => (
                <span>
                    {text && text.length > 20 ? `${text.slice(0, 15)}...` : text}
                </span>
            ),
        },

        {
            key: "time_td",
            title: "SUẤT CHIẾU",
            dataIndex: "time_td",
            align: "center",
            width: "5%",
            render: (text: any) => <span>
                {text && (
                    <div>
                        <p className="whitespace-nowrap">
                            Ngày: {text.date}
                        </p>
                        <p className="whitespace-nowrap">
                            Giờ: {text.time}
                        </p>
                    </div>
                )}
            </span>
            ,
        },
        {
            title: "GHẾ ĐÃ ĐẶT",
            dataIndex: "chair_name",
            key: "chair_name",
            render: (text: any) => <span>
                {text && (
                    <div>
                        <p className="whitespace-nowrap">
                            {text.name}
                        </p>
                        <p className="whitespace-nowrap">
                            <b>Tổng Tiền</b>: {formatter(Number(text.price))}
                        </p>
                    </div>
                )}
            </span>
        },
        {
            title: "COMBO/PACKAGE",
            dataIndex: "food_names",
            key: "food_names",
            render: (text: any) => <span>
                {text && (
                    <div>
                        <p className="whitespace-nowrap">
                            {text.data}
                        </p>
                    </div>
                )}
            </span>
        },
        {
            title: "NGÀY ĐẶT",
            dataIndex: "time",
            key: "time",
        },
    ];
    const dataBookTicket = (fetchBookTicket as any)?.map(
        (bookticket: any, index: number) => {
            return {
                key: index.toString(),
                time: bookticket.time,
                film_name: {
                    name: bookticket.film_name,
                    img: bookticket.film_image
                },
                id_code: bookticket.id_code,
                time_td: {
                    date: bookticket.date,
                    time: bookticket.time_td,
                },
                food_names: {
                    data: bookticket.food_names,
                    price: bookticket.chair_price,
                },
                chair_name: {
                    name: bookticket.chair_name,
                    price: bookticket.total_price,
                },
                cinema_name: bookticket.cinema_name
            };
        }
    );
    console.log(dataBookTicket);
    return (
        <div >
            <Table className="bg-white rounded-lg max-w-6xl mx-auto px-10" columns={columns} dataSource={dataBookTicket} />
        </div>
    )
}

export default BookTicketUser