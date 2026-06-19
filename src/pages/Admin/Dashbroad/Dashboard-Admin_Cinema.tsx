import { useEffect, useState, useMemo } from "react";

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
import { useGetAnalyticsAdminCinemaMutation } from "../../../service/analytic.service";

import ChoosePop from "../../Clients/ChoosePop/ChoosePop";
import RevenueFilmInMon from "../../../components/Clients/Analytics/revenueFilmInMon";

import RevenueFilmInDay from "../../../components/Clients/Analytics/RevenueFilmInDay";
import ChooseTime from "../../../components/Clients/Analytics/ChooseTime";

import TicketDayByUser from "../../../components/Clients/Analytics/TicketDayByUser";
import TicketMonByUser from "../../../components/Clients/Analytics/TicketMonByUser";
import RevenueDayMonYearByAdminCinema from "../../../components/Clients/Analytics/RevenueDayMonYearByAdminCinema";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { useFetchCinemaQuery } from "../../../service/brand.service";

const COLORS = [
  "#1890ff", "#2f54eb", "#722ed1", "#eb2f96", "#f5222d", 
  "#fa541c", "#fa8c16", "#faad14", "#a0d911", "#52c41a", 
  "#13c2c2", "#0050b3", "#391085", "#ad2102", "#1d39c4"
];
export default function Dashbroad_Admin_Cinema() {
  const { cinemaId } = useParams();
  const navigate = useNavigate();
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const { data: cinemass } = useFetchCinemaQuery();
  const [dataAlastic, setDataAlastic] = useState([]);
  const [getDataRevenue] = useGetAnalyticsAdminCinemaMutation();
  const [day, setDay] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const getIfUser = localStorage.getItem("user");
  const IfUser = JSON.parse(`${getIfUser}`);
  const Name_Cinema = (cinemass as any)?.data?.find(
    (c: any) => c.id == IfUser.id_cinema
  )?.name;
  const Name_CinemaByAdmin1 = (cinemass as any)?.data?.find(
    (c: any) => c.id == cinemaId
  )?.name;
  console.log(Name_CinemaByAdmin1);

  const role = IfUser?.role;
  useEffect(() => {
    const dataAdd = {
      day: day,
      month: month,
      year: year,
      id_cinema: IfUser?.id_cinema,
      start_date: startDate,
      end_date: endDate,
    };
    const dataAddAdmin = {
      day: day,
      month: month,
      year: year,
      id_cinema: cinemaId,
      start_date: startDate,
      end_date: endDate,
    };
    const getData = async () => {
      try {
        const response = await getDataRevenue(
          role === 1 ? dataAddAdmin : dataAdd
        );
        // Update state with new data

        setDataAlastic((response as any)?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getData function to fetch data
    getData();
  }, [getDataRevenue, day, month, year, cinemaId, startDate, endDate]);

  // Ensure that revenueData is a valid object
  const revenueData = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_in_months_of_the_year || {};
  const revenueDatabyDay = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_on_days_in_the_month || {};

  const revenueDatabyYear = (dataAlastic as any)?.statistical_cinema
    ?.Revenue_by_year || {};
  const dataTop5Friendly = (dataAlastic as any)?.revenue_month?.user_friendly || [];
  const dataTopRevenaFilmInMon = (dataAlastic as any)?.revenue_admin_cinema
    ?.revenue_and_refund_month_cinema || [];

  const dataTicketBookByFilmInMon = (dataAlastic as any)?.revenue_month
    ?.book_total_mon || [];
  const dataDayTicketCheckByStaff = (dataAlastic as any)?.revenue_admin_cinema
    ?.ticket_staff_fill_day || [];
  const dataMonTicketCheckByStaff = (dataAlastic as any)?.revenue_admin_cinema
    ?.ticket_staff_fill_mon || [];
  const dataRevenueFilmInDay = (dataAlastic as any)?.revenue_admin_cinema
    ?.revenue_and_refund_day_cinema || [];

  // Extract unique cinemas from the data
  const cinemas = useMemo(() => {
    return Object.values(revenueData).reduce(
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
  }, [revenueData]);

  // Convert the revenue data object into an array of objects for recharts
  const chartData = useMemo(() => {
    return Object.keys(revenueData).map((month) => {
      const monthlyData = revenueData[month];
      const newData: Record<string, any> = {
        name: new Date(month + "-01").toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
        }),
      };

      cinemas.forEach((cinema: string) => {
        newData[cinema] = monthlyData[cinema] || 0;
      });

      return newData;
    });
  }, [revenueData, cinemas]);

  const dataByDay = useMemo(() => {
    return Object.keys(revenueDatabyDay).map((day) => ({
      name: format(new Date(day), "dd/MM/yyyy"),
      ...revenueDatabyDay[day],
    }));
  }, [revenueDatabyDay]);

  const transformedDataByDay = useMemo(() => {
    return dataByDay.map((item: any) => {
      const transformedItem: Record<string, any> = {
        name: item.name,
      };

      // Iterate over cinemas and set values or default to 0 if not present
      cinemas.forEach((cinema: string) => {
        transformedItem[cinema] = item[cinema] || 0;
      });

      return transformedItem;
    });
  }, [dataByDay, cinemas]);

  const dataForPieChart = useMemo(() => {
    return cinemas.map((cinema: string, index: number) => {
      const totalRevenue = Object.values(revenueDatabyYear).reduce(
        (total: number, yearlyData: any) => total + (yearlyData[cinema] || 0),
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
  }, [revenueDatabyYear, cinemas]);

  // Check if dataAlastic is undefined or null before further processing
  if (!dataAlastic || Object.keys(dataAlastic).length === 0) {
    return (
      <>
        <ChoosePop />
      </>
    );
  }
  const currentMonthDisplay = month || new Date().getMonth() + 1;
  const currentYearDisplay = year || new Date().getFullYear();

  const dateRangeTitle = startDate && endDate
    ? `từ ngày ${format(new Date(startDate), "dd/MM/yyyy")} đến ngày ${format(new Date(endDate), "dd/MM/yyyy")}`
    : `trong tháng ${currentMonthDisplay}/${currentYearDisplay}`;

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
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        {role === 1 && (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Doanh thu theo rạp:</span>
            <Select 
              className="w-[250px]" 
              value={cinemaId ? String(cinemaId) : "admin"}
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
        )}
      </div>

      <h1 className="text-center pt-4 text-2xl pb-6 mb-8 block font-bold uppercase text-red-600 border-b-2 border-red-500 tracking-wide">
        -- Dashboard Admin Cinema Rạp {Name_Cinema ? Name_Cinema : Name_CinemaByAdmin1} --
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <RevenueDayMonYearByAdminCinema data={dataAlastic as any} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 w-full">
        {/* Line Charts Column */}
        <div className="lg:col-span-2 space-y-8 w-full">
          {/* Chart 1: Doanh thu theo ngày */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="mb-4 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
              Doanh thu theo ngày {dateRangeTitle}
            </h2>
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
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Doanh thu theo tháng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="mb-4 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
              Doanh thu theo tháng năm {currentYearDisplay}
            </h2>
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
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Column (Sticks to right on desktop) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center h-fit">
          <h2 className="mb-6 text-center uppercase font-semibold text-gray-700 text-sm tracking-wider">
            Tổng Doanh thu theo năm {currentYearDisplay}
          </h2>
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
          <RevenueFilmInMon data={dataTopRevenaFilmInMon} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <RevenueFilmInDay data={dataRevenueFilmInDay} />
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
