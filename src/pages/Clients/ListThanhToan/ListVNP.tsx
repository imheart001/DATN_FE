import React, { useEffect, useState } from 'react'
import Header from '../../../Layout/LayoutUser/Header'
import { Link, useLocation } from 'react-router-dom'

const ListVNP = () => {
    const location = useLocation();
    const [vnpAmount, setVnpAmount] = useState("");
    const [vnp_TransactionStatus, setVnp_TransactionStatus] = useState("");
    useEffect (() => {
        const params = new URLSearchParams(location.search);
        const amount = params.get("vnp_Amount") || "";
        const TransactionStatus = params.get("vnp_TransactionStatus") || "";
    
        setVnpAmount(amount);
        setVnp_TransactionStatus(TransactionStatus);
        console.log("vnp_Amount: ", amount);
        console.log("vnp_TransactionStatus: ", TransactionStatus);
    }, [location]);

    let content;
    if (vnp_TransactionStatus == "00") {
        content = (
            <div className="bg-white p-10 rounded-lg shadow-lg">
                {/* <Header /> */}
                <section className="rounded-3xl shadow-2xl">
                    <div className="p-8 text-center sm:p-12">
                        <h1 className="text-2xl mb-6">Thanh toán thành công</h1>
                        <p className="text-gray-700 mb-4">Cảm ơn bạn đã đặt vé tại rạp của chúng tôi. Vé của bạn sẽ được gửi qua email trong thời gian sớm nhất.</p>
                        <p className="text-gray-700 mb-4">Số tiền đã thanh toán: {parseFloat(vnpAmount) / 100} VND</p>
                        <p className="text-gray-700 mb-6">Trạng thái:{vnp_TransactionStatus} </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Quay lại trang chủ
                        </button>
                    </div>
                </section>
            </div>
        );
    } else {
        content = (
            <div className="bg-white p-10 rounded-lg shadow-lg">
                {/* <Header /> */}
                <section className="rounded-3xl shadow-2xl">
                    <div className="p-8 text-center sm:p-12">
                        <h1 className="text-2xl mb-6">Thanh toán thất bại</h1>
                        <p className="text-gray-700 mb-4">Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Quay lại trang chủ
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return content;
}

export default ListVNP;
