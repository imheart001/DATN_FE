import { useState } from "react";
import { useGetPointByIdUserQuery } from "../../../service/member.service";
import { InputNumber, Space, message } from "antd";
import { formatter } from "../../../utils/formatCurrency";
import { setChangePoint } from "../../CinemaSlice/selectSeat";

interface ChangepointProps {
  point: any;
  setPoint: any;
}
const Changepoint: React.FC<ChangepointProps> = ({ point, setPoint }) => {
  const getuserId = localStorage.getItem("user");
  const userId = JSON.parse(`${getuserId}`);

  const { data: PointUser } = useGetPointByIdUserQuery(userId?.id);

  const onChange = (value: string | number | null) => {
    if (
      PointUser &&
      value !== null &&
      value >= (PointUser as any).data.usable_points
    ) {
      message.warning("Bạn không đủ điểm");
    }
    setPoint(value as any);
  };

  return (
    <div>
      <span className="block font-medium text-lg text-red-600 border-b-2 border-red-600">
        ĐIỂM KHẢ DỤNG ({(PointUser as any)?.data.usable_points})
      </span>
      <InputNumber
        defaultValue={0}
        className="mt-6"
        min={0}
        max={(PointUser as any)?.data.usable_points}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
        onChange={onChange}
      />
      <span>
        {point !== null && <span className="mx-4">= {formatter(point)}</span>}
      </span>
    </div>
  );
};

export default Changepoint;
