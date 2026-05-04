import "../../../App.css";
import { useFetchMembersQuery } from "../../../service/member.service";
const MemberInfo = () => {
  const { data } = useFetchMembersQuery();

  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const user_id = IfUser.id;
  const dataUser = data?.data?.filter(
    (item) => item.id_user === Number(user_id)
  );

  return (
    <div className="bg-white rounded-lg mx-auto px-10 text-black">
      <h1 className="mb-10" style={{ textAlign: "center", fontWeight: "bold" }}>
        Thẻ thành viên
      </h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-5 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                SÔ THẺ
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                HẠNG THẺ
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                NGÀY KÍCH HOẠT
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                TỔNG CHI TIÊU
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                ĐIỂM TÍCH LŨY
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                ĐIỂM ĐÃ TIÊU
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                ĐIỂM KHẢ DỤNG
              </th>
            </tr>
          </thead>
          {/* <hr /> */}
          <tbody className="divide-y divide-gray-200">
            {dataUser &&
              dataUser.length > 0 &&
              dataUser.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.id_card}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.card_class === 1 ? "Bình Thường" : "Vip"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.activation_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.total_spending.toLocaleString()}vnd
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.accumulated_points}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.points_used}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.usable_points}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h1 className="mt-10" style={{ textAlign: "center", fontWeight: "bold" }}>
        Bạn cần tích lũy 3.000.000đ để nâng hạng khách hàng VIP
      </h1>
      <hr className="mt-5" />
      <div className="grid grid-cols-1 gap-4 mt-3 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg ">0</div>
        <div className="h-32 rounded-lg  lg:col-span-2"></div>
        <div className="h-32 rounded-lg ">3.000.000</div>
      </div>
    </div>
  );
};

export default MemberInfo;
