import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart,
} from "recharts";

import { format } from "date-fns";
import { useGetAnalyticsMutation } from "../../../service/analytic.service";
import Top5User from "../../../components/Clients/Analytics/Top5user_friendly";
import ChoosePop from "../../Clients/ChoosePop/ChoosePop";
import RevenueFilmInMon from "../../../components/Clients/Analytics/revenueFilmInMon";

import RevenueFilmInDay from "../../../components/Clients/Analytics/RevenueFilmInDay";
import ChooseTime from "../../../components/Clients/Analytics/ChooseTime";

import RevenueDayMonYear from "../../../components/Clients/Analytics/RevenueDayMonYear";
import TicketDayByUser from "../../../components/Clients/Analytics/TicketDayByUser";
import TicketMonByUser from "../../../components/Clients/Analytics/TicketMonByUser";
export default function Dashbroad() {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const [dataAlastic, setDataAlastic] = useState([]);
  const [getDataRevenue] = useGetAnalyticsMutation();
  const [day, setDay] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    const dataAdd = {
      day: day,
      month: month,
      year: year,
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

  // Ensure that revenueData is a valid object
  const revenueData = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_in_the_month;
  const revenueDatabyDay = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_on_the_day;

  const revenueDatabyYear = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_in_the_year;
  const dataTop5Friendly = (dataAlastic as any)?.revenue_month?.user_friendly;
  const dataTopRevenaFilmInMon = (dataAlastic as any)?.revenue_month
    ?.revenue_and_refund_month;
  const dataTicketBookByFilmInMon = (dataAlastic as any)?.revenue_month
    ?.book_total_mon;
  const dataDayTicketCheckByStaff = (dataAlastic as any)?.revenue_day
    ?.ticket_day;
  const dataMonTicketCheckByStaff = (dataAlastic as any)?.revenue_day
    ?.ticket_mon;
  const dataRevenueFilmInDay = (dataAlastic as any)?.revenue_day
    ?.revenue_and_refund_day;

  // Check if revenueData is undefined or null before further processing
  if (
    !revenueData &&
    !dataDayTicketCheckByStaff &&
    revenueDatabyDay !== null &&
    !dataMonTicketCheckByStaff &&
    !revenueDatabyYear &&
    !dataTop5Friendly &&
    !dataTopRevenaFilmInMon &&
    !dataTicketBookByFilmInMon
  ) {
    return (
      <>
        <ChoosePop />
      </>
    );
  }

  // Extract unique cinemas from the data
  const cinemas = Object.values(revenueData).reduce(
    (allCinemas: string[], monthlyData: any) => {
      Object.keys(monthlyData).forEach((cinema) => {
        if (!allCinemas.includes(cinema)) {
          allCinemas.push(cinema);
        }
      });
      return allCinemas;
    },
    []
  );

  // Convert the revenue data object into an array of objects for recharts
  const chartData = Object.keys(revenueData).map((month) => {
    const monthlyData = revenueData[month];
    const newData: Record<string, any> = {
      name: new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    };

    cinemas.forEach((cinema) => {
      newData[cinema] = monthlyData[cinema]?.total_amount || 0; // Replace 'total_amount' with the property you want
    });

    return newData;
  });
  const chartDataFoodMonByCinema = Object.keys(revenueData).map((month) => {
    const monthlyData = revenueData[month];
    const newData: Record<string, any> = {
      name: new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    };

    cinemas.forEach((cinema) => {
      newData[cinema] = monthlyData[cinema]?.total_food_price || 0; // Replace 'total_amount' with the property you want
    });

    return newData;
  });
  const chartDataChairMonByCinema = Object.keys(revenueData).map((month) => {
    const monthlyData = revenueData[month];
    const newData: Record<string, any> = {
      name: new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    };

    cinemas.forEach((cinema) => {
      newData[cinema] = monthlyData[cinema]?.total_chair_price || 0; // Replace 'total_amount' with the property you want
    });

    return newData;
  });

  const dataByDay = Object.keys(revenueDatabyDay).map((day) => ({
    name: format(new Date(day), "dd/MM/yyyy"),
    ...revenueDatabyDay[day],
  }));
  const transformedDataByDay = dataByDay.map((item: any) => {
    const transformedItem: Record<string, any> = {
      name: item.name,
    };

    // Iterate over cinemas and set values or default to 0 if not present
    cinemas.forEach((cinema) => {
      transformedItem[cinema] = item[cinema]?.total_amount || 0;
    });

    return transformedItem;
  });

  const dataForPieChart = cinemas.map((cinema, index) => {
    const totalRevenue = Object.values(revenueDatabyYear).reduce(
      (total, yearlyData: any) =>
        total + (yearlyData[cinema]?.total_amount || 0),
      0
    );

    // Mảng màu sẽ được sử dụng để đảm bảo mỗi phần của biểu đồ tròn có một màu khác nhau
    const colors = ["#8884d8", "#82ca9d", "#ffc658"];
    const color = colors[index % colors.length];

    return {
      name: cinema,
      value: totalRevenue,
      fill: color,
    };
  });

  return (
    <>
      <ChooseTime
        day={day}
        setDay={setDay}
        setMonth={setMonth}
        month={month}
        setYear={setYear}
        year={year}
      />
      <h1 className="text-center text-xl pb-10 mb-10 block font-bold uppercase text-red-600 border-b-2 border-red-600">
        -- Dashbroad Admin Tổng --
      </h1>

      <RevenueDayMonYear data={dataAlastic as any} />
      <div className="grid-cols-3 grid mt-10 max-w-full">
        <div className="overflow-y-auto h-[450px] col-span-2 space-y-20 w-[750px]">
          <div className="">
            <h3 className="mx-auto text-center uppercase font-semibold">
              Tổng Doanh thu các rạp theo tháng năm 2023{" "}
            </h3>
            <LineChart
              width={700}
              className="p-4"
              height={400}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis
                tickFormatter={(value) => formatCurrency(value as number)}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              {(cinemas as any).map((cinema: any, index: any) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={cinema}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>

          <div>
            <h3 className="mx-auto mb-4 text-center uppercase font-semibold">
              Doanh thu các rạp theo ngày tháng hiện tại{" "}
            </h3>
            <LineChart
              width={700}
              height={400}
              data={transformedDataByDay}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => formatCurrency(value as number)}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              {(cinemas as any).map((cinema: any, index: any) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={cinema}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>
          <div className="">
            <div className="flex items-center justify-center space-x-4">
              <img
                width="66"
                height="66"
                src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-Chair-stationery-smashingstocks-outline-color-smashing-stocks.png"
                alt="external-Chair-stationery-smashingstocks-outline-color-smashing-stocks"
              />
              <h3 className="mx-auto text-center uppercase font-semibold">
                Tổng Doanh thu ghế các rạp theo tháng năm 2023{" "}
              </h3>
            </div>
            <LineChart
              width={700}
              className="p-4"
              height={400}
              data={chartDataChairMonByCinema}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis
                tickFormatter={(value) => formatCurrency(value as number)}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              {(cinemas as any).map((cinema: any, index: any) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={cinema}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>

          <div className="">
            <div className="flex items-center space-x-4 justify-center">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/external-popcorn-cinema-icongeek26-outline-colour-icongeek26.png"
                alt="external-popcorn-cinema-icongeek26-outline-colour-icongeek26"
              />
              <h3 className="mx-auto text-center uppercase font-semibold">
                Tổng Doanh thu bỏng nước theo tháng của từng rạp{" "}
              </h3>
            </div>
            <LineChart
              width={700}
              className="p-4"
              height={400}
              data={chartDataFoodMonByCinema}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis
                tickFormatter={(value) => formatCurrency(value as number)}
              />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              {(cinemas as any).map((cinema: any, index: any) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={cinema}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>
        </div>
        <div className="col-span-1 my-10">
          <h3 className="mx-auto text-center uppercase font-semibold">
            Tổng Doanh thu theo năm của Các rạp trong năm 2023
          </h3>
          <PieChart width={1000} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataForPieChart}
              cx={200}
              cy={200}
              outerRadius={80}
              label={(props) => {
                const percentage = (props.percent * 100).toFixed(2);
                return (
                  <text
                    x={props.x}
                    y={props.y}
                    fill={props.fill}
                    textAnchor={props.textAnchor}
                  >
                    <tspan x={props.x} dx="0px" dy="0px">
                      {props.name}
                    </tspan>
                    <tspan x={props.x} dx="0px" dy="1.2em">
                      {formatCurrency(props.value)}
                    </tspan>
                    <tspan x={props.x} dy="-40px" fontSize="14" fill="red">
                      {percentage}%
                    </tspan>
                  </text>
                );
              }}
            />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
          </PieChart>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="">
          <Top5User data={dataTop5Friendly} />
        </div>
        <div className="">
          <RevenueFilmInMon data={dataTopRevenaFilmInMon} />
        </div>
        {/* <div className="">
          <TotalBookTicketInMonth data={dataTicketBookByFilmInMon} />
        </div> */}
        <div className="">
          <RevenueFilmInDay data={dataRevenueFilmInDay} />
        </div>
        <div className="space-y-10">
          <TicketDayByUser data={dataDayTicketCheckByStaff} />
          <TicketMonByUser data={dataMonTicketCheckByStaff} />
        </div>
      </div>
    </>
  );
}
