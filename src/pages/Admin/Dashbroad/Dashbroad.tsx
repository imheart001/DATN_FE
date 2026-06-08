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
  ResponsiveContainer,
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
import VocuherByUserAnalytics from "../../../components/Clients/Analytics/VoucherByUser";
import { Select } from "antd";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { Link, useNavigate } from "react-router-dom";
export default function Dashbroad() {
  const navigate = useNavigate();
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const { data: cinemass } = useFetchCinemaQuery();

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
  const dataUsedByUser = (dataAlastic as any)?.revenue_voucher_is_onl;
  console.log(dataUsedByUser);

  // Check if revenueData is undefined or null before further processing
  if (
    !revenueData &&
    !dataUsedByUser &&
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
  const RevenueByCinemaDataPriceChairByDay = dataByDay.map((item: any) => {
    const transformedItem: Record<string, any> = {
      name: item.name,
    };

    // Iterate over cinemas and set values or default to 0 if not present
    cinemas.forEach((cinema) => {
      transformedItem[cinema] = item[cinema]?.total_chair_price || 0;
    });

    return transformedItem;
  });
  const RevenueByCinemaDataPriceFoodByDay = dataByDay.map((item: any) => {
    const transformedItem: Record<string, any> = {
      name: item.name,
    };

    // Iterate over cinemas and set values or default to 0 if not present
    cinemas.forEach((cinema) => {
      transformedItem[cinema] = item[cinema]?.total_food_price || 0;
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

  const handleSelectChange = (value: any) => {
    if (value === "admin") {
      // Handle the case when the demo option is selected
      navigate("/admin");
    } else {
      // Handle the case when a cinema is selected
      navigate(`/admin/dashboards/${value}`);
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <ChooseTime
          day={day}
          setDay={setDay}
          setMonth={setMonth}
          month={month}
          setYear={setYear}
          year={year}
        />
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700">Doanh thu theo rạp:</span>
          <Select 
            className="w-[250px]" 
            value="admin"
            onChange={handleSelectChange}
          >
            <Select.Option key="demo" value="admin">
              Doanh thu tổng
            </Select.Option>
            {((cinemass as any)?.data || []).map((c: any) => (
              <Select.Option key={c.id} value={String(c.id)}>
                Doanh thu rạp {c.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <h1 className="text-center pt-4 text-2xl pb-6 mb-8 block font-bold uppercase text-red-600 border-b-2 border-red-500 tracking-wide">
        -- Dashboard Admin Tổng --
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <RevenueDayMonYear data={dataAlastic as any} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 w-full">
        {/* Line Charts Column */}
        <div className="lg:col-span-2 space-y-8 w-full">
          {/* Chart 1: Doanh thu các rạp theo ngày */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="mb-4 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
              Doanh thu các rạp theo ngày tháng hiện tại
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
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
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Doanh thu ghế theo ngày */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 justify-center gap-3">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-Chair-stationery-smashingstocks-outline-color-smashing-stocks.png"
                alt="chair-icon"
              />
              <h3 className="text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
                Tổng Doanh thu ghế các rạp theo ngày trong tháng {month}/{year}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={RevenueByCinemaDataPriceChairByDay}
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
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Doanh thu bỏng nước theo ngày */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 justify-center gap-3">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/external-popcorn-cinema-icongeek26-outline-colour-icongeek26.png"
                alt="popcorn-icon"
              />
              <h3 className="text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
                Tổng Doanh thu bỏng nước theo ngày của các rạp ngày trong tháng {month}/{year}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={RevenueByCinemaDataPriceFoodByDay}
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
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Doanh thu các rạp theo tháng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="mb-4 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
              Tổng Doanh thu các rạp theo tháng năm {year}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </ResponsiveContainer>
          </div>

          {/* Chart 5: Doanh thu ghế theo tháng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 justify-center gap-3">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-Chair-stationery-smashingstocks-outline-color-smashing-stocks.png"
                alt="chair-icon"
              />
              <h3 className="text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
                Tổng Doanh thu ghế các rạp theo tháng năm {year}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartDataChairMonByCinema} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </ResponsiveContainer>
          </div>

          {/* Chart 6: Doanh thu bỏng nước theo tháng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 justify-center gap-3">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/external-popcorn-cinema-icongeek26-outline-colour-icongeek26.png"
                alt="popcorn-icon"
              />
              <h3 className="text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
                Tổng Doanh thu bỏng nước theo tháng của từng rạp năm {year}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartDataFoodMonByCinema} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Column (Sticks to right on desktop) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center h-fit">
          <h3 className="mb-6 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
            Tổng Doanh thu theo năm của Các rạp trong năm {year}
          </h3>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataForPieChart}
                cx="50%"
                cy="50%"
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
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid for tables - Natural height, no nested scroll */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 bg-gray-100 p-6 rounded-xl mt-12 border border-gray-200">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <RevenueFilmInDay data={dataRevenueFilmInDay} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <RevenueFilmInMon data={dataTopRevenaFilmInMon} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <Top5User data={dataTop5Friendly} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <VocuherByUserAnalytics data={dataUsedByUser} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <TicketDayByUser data={dataDayTicketCheckByStaff} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <TicketMonByUser data={dataMonTicketCheckByStaff} />
        </div>
      </div>
    </div>
  );
}
