import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../../service/book_ticket.service";
import { useUpdateUserMutation } from "../../../service/signup_login.service";
import { message } from "antd";

const Profile = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState(0);
    const [date_of_birth, setDdate_of_birth] = useState("");
    const [email, setEmail] = useState("");
    const [old_password, setPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirmPassWord, setConfirmPassWord] = useState("");
    const idUser = localStorage.getItem("user_id");
    const { data: user } = useGetUserByIdQuery(idUser || "");
    const [changePassword, setChangePassword] = useState(false);
    const [upadteUser] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
            setPhone(user.phone || 0);
            setDdate_of_birth(user.date_of_birth || "");
            setEmail(user.email || "");
        }
    }, [user])

    const handleClick = async (e: any) => {
        try {
            e.preventDefault();
            if (!name || !phone || !date_of_birth || !email) {
                message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                message.error("Địa chỉ email không hợp lệ.");
                return;
            }
            if (changePassword) {
                if (!old_password || !new_password || !confirmPassWord) {
                    message.error("Vui lòng điền đầy đủ thông tin mật khẩu.");
                    return;
                }
                if (new_password !== confirmPassWord) {
                    message.error("Mật khẩu mới không trùng khớp. Vui lòng kiểm tra lại.");
                    return;
                }
            }
            const newUser: any = {
                id: idUser,
                name,
                date_of_birth,
                phone,
                email,
                image,
                ...(changePassword && { old_password, new_password }), // Thêm mật khẩu khi cần
            };

            const res: any = await upadteUser(newUser);
            console.log(res);

            if (res.error) {
                message.error(res.error.data.msg);
                return;
            }
            console.log(newUser);
            
            message.success("Cập nhật thành công");
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
        }
    }
    const handleCheckboxChange = () => {
        setChangePassword(!changePassword);

    };
    return (
        <section className=" p-4 bg-white rounded-lg">
            <main
                className=" flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div className=" max-w-xl lg:max-w-3xl">
                    <div className="p-4 rounded-lg w-44 h-44 flex items-center justify-center">
                        <img className="rounded-lg max-w-44 max-h-44" src={image ? image : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='} alt="" />
                    </div>
                    <form action="#" className="mt-8 grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Ảnh Đại Diện
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full h-[30px] rounded-md bg-gray-200 border-gray-500 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Họ Tên
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full h-[30px] rounded-md bg-gray-200 border-gray-500 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Số Điện Thoại
                            </label>

                            <input
                                type="text"
                                value={phone || ''}
                                onChange={(e) => setPhone(+e.target.value)}
                                className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Ngày Sinh
                            </label>

                            <input
                                type="date"
                                value={date_of_birth || ''}
                                onChange={(e) => setDdate_of_birth(e.target.value)}
                                className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>

                        <div className="col-span-6">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                disabled
                                value={email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="MarketingAccept" className="flex gap-4">
                                <input
                                    type="checkbox"
                                    checked={changePassword}
                                    onChange={handleCheckboxChange}
                                    className="h-5 w-5 rounded-md border-gray-200 bg-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Đổi mật khẩu
                                </span>
                            </label>
                        </div>
                        {changePassword && (
                            <>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Nhập Lại Mật Khẩu Cũ
                                    </label>

                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Nhập Mật Khẩu Mới
                                    </label>

                                    <input
                                        type="password"
                                        value={new_password ? new_password : ''}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Nhập Lại Mật Khẩu Mới
                                    </label>

                                    <input
                                        type="password"
                                        onChange={(e) => setConfirmPassWord(e.target.value)}
                                        className="mt-1 w-full h-[30px] rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                </div>
                            </>
                        )}
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                onClick={handleClick}
                                className="ml-[210px] inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white"
                            >
                                Cập Nhật
                            </button>


                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
};
export default Profile