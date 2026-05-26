import { useEffect, useState } from "react";

import { formatter } from "../../../utils/formatCurrency";

import { useGetAnalyticsStaffByCinemaMutation } from "../../../service/analytic.service";
import ChoosePop from "../../Clients/ChoosePop/ChoosePop";

import ChooseTime from "../../../components/Clients/Analytics/ChooseTime";
import { Card, Col, Row } from "antd";

import RevenueFilmInDayForStaff from "../../../components/Clients/Analytics/RevenueFilmInDayForStaff";
export default function Dashboard_Staff() {
  const [dataAlastic, setDataAlastic] = useState([]);
  const [getDataRevenue] = useGetAnalyticsStaffByCinemaMutation();
  const [day, setDay] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  console.log(dataAlastic as any);
  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  useEffect(() => {
    const dataAdd = {
      day: day,
      month: month,
      year: year,
      id_cinema: IfUser?.id_cinema,
    };
    const getData = async () => {
      try {
        const response = await getDataRevenue(dataAdd);
        // Update state with new data

        setDataAlastic((response as any)?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getData function to fetch data
    getData();
  }, [getDataRevenue, day, month, year]);

  const dataRevenueFilmInDay = (dataAlastic as any)?.revenue_staff
    ?.tickets_total_day;

  if (!dataAlastic && !dataRevenueFilmInDay) {
    return (
      <>
        <ChoosePop />
      </>
    );
  }

  return (
    <>
      {IfUser?.role !== 3 && (
        <ChooseTime
          day={day}
          setDay={setDay}
          setMonth={setMonth}
          month={month}
          setYear={setYear}
          year={year}
        />
      )}

      <h1 className="text-center text-xl pb-10 mb-10 block font-bold uppercase text-red-600 border-b-2 border-red-600">
        -- Dashboard_Staff --
      </h1>
      <Row gutter={16} className="bg-[#F0F2F5] p-10 overflow-y-auto h-[200px]">
        <Col span={12}>
          <Card
            className="text-base"
            title="Tổng doanh thu theo ngày"
            bordered={false}
          >
            {(dataAlastic as any)?.revenue_staff?.revenue_staff_day[0]
              ? formatter(
                  (dataAlastic as any)?.revenue_staff?.revenue_staff_day[0]
                    ?.total_amount
                )
              : "0 đ"}
          </Card>
        </Col>

        <Col span={12}>
          <Card
            className="text-base"
            title="Tổng doanh thu đồ ăn theo ngày"
            bordered={false}
          >
            {(dataAlastic as any)?.revenue_staff?.revenue_food
              ?.total_food_price > 0
              ? formatter(
                  (dataAlastic as any)?.revenue_staff?.revenue_food
                    ?.total_food_price
                )
              : "0 đ"}
          </Card>
        </Col>
      </Row>
      <div className="">
        <RevenueFilmInDayForStaff data={dataRevenueFilmInDay} />
      </div>
    </>
  );
}
