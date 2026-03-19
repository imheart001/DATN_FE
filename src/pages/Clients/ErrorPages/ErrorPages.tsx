import { NavLink } from "react-router-dom"

export const ErrorPage = () => {
    return (
        <main className="bg-red-500 flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-5xl text-white mb-4">Khu vực bị hạn chế!</h1>
                <p className="text-white mb-8">
                    Xin lỗi, bạn không có quyền truy cập vào đây!!!
                </p>
                <NavLink to="/" className="bg-white text-red-500 font-bold py-2 px-4 rounded-full inline-block" > Quay lại </NavLink>
            </div>
        </main>
    );
};