import React, { useEffect, useState } from "react";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
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
import { formatter } from "../../../utils/formatCurrency";
import { format } from "date-fns";
import { useGetAnalyticsMutation } from "../../../service/analytic.service";
import Top5User from "../../../components/Clients/Analytics/Top5user_friendly";
import ChoosePop from "../../Clients/ChoosePop/ChoosePop";

export default function Dashbroad() {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const [dataAlastic, setDataAlastic] = useState([]);
  const [getDataRevenue] = useGetAnalyticsMutation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataRevenue({});
        // Update state with new data
        console.log((response as any)?.data);
        setDataAlastic((response as any)?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getData function to fetch data
    getData();
  }, [getDataRevenue]);

  // Ensure that revenueData is a valid object
  const revenueData = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_in_the_month;
  const revenueDatabyDay = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_on_the_day;

  const revenueDatabyYear = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_cinema_in_the_year;
  const dataTop5Friendly = (dataAlastic as any)?.revenue_month?.user_friendly;
  console.log(dataTop5Friendly);
  // Check if revenueData is undefined or null before further processing
  if (
    !revenueData &&
    revenueDatabyDay !== null &&
    !revenueDatabyYear &&
    !dataTop5Friendly
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
  const chartData = Object.keys(revenueData).map((month) => ({
    name: new Date(month + "-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
    }),
    ...revenueData[month],
  }));
  const dataByDay = Object.keys(revenueDatabyDay).map((day) => ({
    name: format(new Date(day), "dd/MM/yyyy"), // Format as "MM/dd/yyyy"
    ...revenueDatabyDay[day],
  }));
  const dataForPieChart = cinemas.map((cinema, index) => {
    const totalRevenue = Object.keys(revenueDatabyYear).reduce(
      (total, year) => total + revenueDatabyYear[year][cinema],
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
      <div className="grid-cols-3 grid  max-w-full">
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
            <h3 className="mx-auto text-center uppercase font-semibold">
              Doanh thu các rạp theo ngày tháng hiện tại{" "}
            </h3>
            <LineChart
              width={700}
              height={400}
              data={dataByDay}
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
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <Top5User data={dataTop5Friendly} />
        </div>
        <div className="">
          <Top5User data={dataTop5Friendly} />
        </div>
        <div className="">
          <Top5User data={dataTop5Friendly} />
        </div>
        <div className="">
          <Top5User data={dataTop5Friendly} />
        </div>
      </div>
    </>
  );
}
