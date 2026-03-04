import React from 'react';
import { Row, Col, Anchor, Modal } from 'antd';  // Import các thành phần cần thiết từ antd
// import 'antd/dist/antd.css';  // Import CSS của antd
import Header from '../../../Layout/LayoutUser/Header';
import { LineOutlined, PlusOutlined, ShopOutlined } from '@ant-design/icons';
import Footer from '../../../Layout/LayoutUser/Footer';
import { Link, useParams } from 'react-router-dom';
import { useFetchFoodQuery, useGetFoodByIdQuery } from '../../../service/food.service';

const App = () => {
    const { price } = useParams();
    const formatter = (value: any) =>
        `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const { data: food, error, isLoading } = useFetchFoodQuery();
    console.log(food);
    return (
        <div className="bg-white">
            <section className=" text-secondary p-4">
                <Header />
            </section>
            {/* <body> */}

            <Row className='ml-60'>
                <Col span={16} className=''>
                    <div id="part-1" >
                        <h1 className='mb-10'>THÔNG TIN THANH TOÁN</h1>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                            <div className="h-20 rounded-lg ">
                                <h3 >Họ Tên:</h3>
                                <p>nguyen duc nam</p>
                            </div>
                            <div className="h-20 rounded-lg ">
                                <h3 >Số điện thoại:</h3>
                                <p>123456789</p>
                            </div>
                            <div className="h-20 rounded-lg ">
                                <h3 >Email:</h3>
                                <p>nguyenducnam864@gmail.com</p>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className=" rounded-lg  lg:col-span-2">GHẾ THƯỜNG</div>
                            <div className=" rounded-lg ">3 x 50.000 = 45.000 vnđ </div>
                            {/* <hr  /> */}
                            <div className="h-20 rounded-lg  lg:col-span-2">GHẾ VIP</div>
                            <div className="h-20 rounded-lg ">3 x 50.000 = 45.000 vnđ </div>
                        </div>

                    </div>
                    <div id="part-2 " className='mb-10'>

                        <h1 className=''>COMBO ƯU ĐÃI</h1>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                            <div className="h-32 rounded-lg "></div>
                            <div className="h-32 rounded-lg ">Tên Combo</div>
                            <div className="h-32 rounded-lg ">Mô tả</div>
                            <div className="h-32 rounded-lg ">Số lượng</div>
                        </div>
                        {food.data?.map((data: any, index: any) => {
                            return <div key={index} className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                            <div className="round-image ">
                                <img src="https://files.betacorp.vn/files/media/images/2023/06/15/beta-combo-154428-150623-83.png" alt="Your Image" />
                            </div>
                            <div className="h-32 rounded-lg ">{data.name}</div>
                            <div className="h-32 rounded-lg ">TIẾT KIỆM 28K!!! Gồm: 1 Bắp (69oz) + 1 Nước có gaz (22oz)</div>
                            <div className="h-32 rounded-lg ">
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-2">
                                    <div className="h-32 rounded-lg ">0</div>
                                    <div className="h-32 rounded-lg "> <button><PlusOutlined /></button></div>
                                    <div className="h-32 rounded-lg "><button><LineOutlined /></button></div>
                                </div>
                            </div>
                        </div>
                        })}
                        <div className="">

                            <div className=" rounded-lg">
                                <ShopOutlined style={{ fontSize: '30px' }} className='mr-6' />
                                GIẢM GIÁ</div>
                            <div className='mt-10'>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary>
                                        <h1 className="">Beta Voucher  <span className='text-blue-500 cursor-pointer'>(Nhấn vào đây để xem danh sách voucher của bạn) </span></h1>
                                    </summary>
                                    <form action="#" className="mt-8 grid  gap-6">
                                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                                            <div className=" rounded-lg ">
                                                <label
                                                    htmlFor="UserEmail"
                                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="nhập điểm"
                                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                                    />

                                                    <span
                                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                                    >
                                                        Mã Voucher
                                                    </span>
                                                </label>
                                            </div>
                                            <div className=" rounded-lg ">
                                                <label
                                                    htmlFor="UserEmail"
                                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="nhập điểm"
                                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                                    />

                                                    <span
                                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                                    >
                                                        Mã PIN
                                                    </span>
                                                </label>
                                            </div>
                                            <div className=" rounded-lg ">


                                                <button
                                                    className="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500"
                                                >
                                                    Đăng ký
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <h1 className='mt-10'>VOUCHER CỦA BẠN</h1>

                                    <div className="grid grid-cols-1 mt-3 gap-4 lg:grid-cols-4 lg:gap-8">
                                        <div className="h-32 rounded-lg "></div>
                                        <div className="h-32 rounded-lg ">Mã voucher</div>
                                        <div className="h-32 rounded-lg ">Nội dung voucher</div>
                                        <div className="h-32 rounded-lg ">Ngày hết hạn</div>
                                    </div>
                                </details>
                                <hr className='mt-6' />




                                <details className="group [&_summary::-webkit-details-marker]:hidden mt-10">
                                    <summary>
                                        <h1 className="">Điểm Beta <span className='text-blue-500 cursor-pointer'>(Nhấn vào đây để xem điểm tích lũy của bạn) </span></h1>
                                    </summary>
                                    <form action="#" className="mt-8 grid  gap-6">
                                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                                            <div className="h-32 rounded-lg ">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="FirstName"
                                                        className="block text-sm font-medium "
                                                    >
                                                        Điểm hiện có
                                                    </label>

                                                    0
                                                </div>
                                            </div>
                                            <div className="h-32 rounded-lg ">

                                                <label
                                                    htmlFor="UserEmail"
                                                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                                >
                                                    <input
                                                        type="number"
                                                        placeholder="nhập điểm"
                                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                                    />

                                                    <span
                                                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                                    >
                                                        Mời bạn nhập điểm
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="h-32 rounded-lg ">
                                                <div className="h-32 rounded-lg ">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="FirstName"
                                                            className="block text-sm font-medium "
                                                        >
                                                            Số tiền được giảm
                                                        </label>

                                                        =0 vnđ
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-32 rounded-lg ">

                                                <button
                                                    className="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500"
                                                >
                                                    Đổi điểm
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <h1 className='mt-10'>VOUCHER CỦA BẠN</h1>

                                    <div className="grid grid-cols-1 mt-3 gap-4 lg:grid-cols-4 lg:gap-8">
                                        <div className="h-32 rounded-lg "></div>
                                        <div className="h-32 rounded-lg ">Mã voucher</div>
                                        <div className="h-32 rounded-lg ">Nội dung voucher</div>
                                        <div className="h-32 rounded-lg ">Ngày hết hạn</div>
                                    </div>
                                </details>
                                <hr className='mt-6' />
                                <hr className='mt-10' />


                                <div className="grid grid-cols-4 mt-10 gap-4 lg:grid-cols-3 lg:gap-8">
                                    <div className=" rounded-lg  lg:col-span-2"></div>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
                                        <div className=" rounded-lg ">Tổng tiền:</div>
                                        <div className=" rounded-lg ">{formatter(price)}</div>
                                    </div>

                                    <div className=" lg:col-span-2"></div>
                                    <div className="grid grid-cols-2 gap-4  ">
                                        <div className=" rounded-lg ">Số tiền được giảm:</div>
                                        <div className=" rounded-lg ">0 vnđ</div>
                                    </div>

                                    <div className=" rounded-lg  lg:col-span-2"></div>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
                                        <div className=" rounded-lg ">Số tiền thanh toán:</div>
                                        <div className=" rounded-lg ">{formatter(price)}</div>
                                    </div>

                                </div>




                                <div className="grid grid-cols-1 mt-16 gap-4 lg:grid-cols-3 lg:gap-8">
                                    <div className=" rounded-lg  lg:col-span-2"> <ShopOutlined style={{ fontSize: '30px' }} className='mr-6' />
                                        PHƯƠNG THỨC THANH TOÁN</div>
                                    <div className=" text-blue">
                                        <Link to="##" >Hướng dẫn thanh toán</Link>
                                    </div>

                                    <h1>Chọn thẻ thanh toán</h1>
                                </div>
                                <hr className='mt-6' />

                                <div>
                                    <h2>Phương thức thanh toán</h2>
                                    <div className="grid grid-cols-1 mt-3 gap-4 lg:grid-cols-4 lg:gap-8">

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value="creditCard"
                                                />
                                                Thẻ nội địa
                                                <img src="path/to/creditCardImage.png" alt="Credit Card" style={{ marginLeft: '8px', height: '24px' }} />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value="creditCard"
                                                />
                                                Thẻ quốc tế
                                                <img src="path/to/creditCardImage.png" alt="Credit Card" style={{ marginLeft: '8px', height: '24px' }} />
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value="creditCard"
                                                />
                                                Ví ShopeePay
                                                <img src="path/to/creditCardImage.png" alt="Credit Card" style={{ marginLeft: '8px', height: '24px' }} />
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value="creditCard"
                                                />
                                                Ví MoMo
                                                <img src="path/to/creditCardImage.png" alt="Credit Card" style={{ marginLeft: '8px', height: '24px' }} />
                                            </label>
                                        </div>

                                    </div>
                                </div>

                                {/* <div>
                                    <p></p>
                                    <p>*Vé mua rồi không hoàn trả lại dưới mọi hình thức.</p>
                                </div> */}

                                <div className="grid grid-cols-1 p-14 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                                    <div className="h-32 rounded-lg ">
                                        <p>Vui lòng kiểm tra thông tin đầy đủ trước khi qua bước tiếp theo.</p>
                                        <p>*Vé mua rồi không hoàn trả lại dưới mọi hình thức.</p>
                                    </div>
                                    <div className="h-32 rounded-lg ">
                                        Thời gian còn lại
                                        10:00
                                    </div>
                                </div>


                            </div>


                        </div>

                    </div>

                </Col>
                <Col span={8} className=' '>


                    <div className="my-10 space-y-4 ">
                        <div className="grid grid-cols-2 gap-8">
                            <img
                                //   src={(FilmById as any)?.data.image}
                                alt=""
                                className="block text-center mx-auto w-[201px] rounded-2xl h-[295px]"
                            />
                            <div className="space-y-2">
                                <h1 className="text-3xl text-[#03599d] font-semibold font-mono">
                                    {/* {(FilmById as any)?.data.name} */} name
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
                                    Thể loại:
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
                                <h4 className="">Thời lượng: </h4>
                            </span>
                        </div>
                        <hr className="border-dashed border-2 " />
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
                                {/* {(CinemaDetailbyId as any)?.data.name} -{" "}
                                     {(CinemaDetailbyId as any)?.data.address} */}
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
                                {/* <span className="font-semibold ">{formattedDate}</span> */}
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
                                    {/* {(TimeById as any)?.data.time} */}
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
                                    {/* {(RoombyId as any)?.data.name} */}
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
                                {/* {selectedSeats.map((seat, index) => (
                                        <li key={index}>
                                        <span className="font-semibold">
                                            {getRowName(seat.row)}
                                            {seat.column + 1}
                                        </span>
                                        </li>
                                    ))} */}
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
                                    {/* {formatter(
                                                selectedSeats.reduce((total, seat) => total + seat.price, 0)
                                            )} */}
                                </span>
                            </h4>
                        </span>
                        <a
                            className="inline-block rounded mr-4 bg-indigo-600 px-8 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            href="/download"
                        >
                            Quay lại
                        </a>


                        <a
                            className="inline-block rounded bg-indigo-600 px-8 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                            href="/download"
                        >
                            Tiếp tục
                        </a>
                    </div>

                </Col>
            </Row>
            <section className=" text-secondary p-4">
                <Footer />
            </section>
        </div>
    );
};

export default App;
