import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { PieChart, Pie } from "recharts";
import { useEffect, useState } from "react";
import { useGetAnalyticsMutation } from "../../../service/analytic.service";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { Select, message } from "antd";
import { formatter } from "../../../utils/formatCurrency";
import { DashboardAdminCinema } from "./Dashboard-Admin_Cinema";
import { DashboardAdmin3 } from "./Dashboard-Admin_3";

const Dashbroad = (props: any) => {
  const { difference, positive = false, sx, value } = props;
  const [dataReal, setDataReal] = useState<any[]>([]);
  const [infoRole, setInfoRole] = useState("");
  const id_cinema = useAppSelector((state: RootState) => state.selectedCinema);
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;
  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      const { role: authRole } = JSON.parse(auth as string);
      setInfoRole(authRole);
    }
  }, [auth]);

  const COLORS = ["#0088FE", "#00C49F"];

  const [getDataRevenue] = useGetAnalyticsMutation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataRevenue({});
        // Update state with new data
        setDataReal((prevData) => [...prevData, (response as any)?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getData function to fetch data
    getData();
  }, [getDataRevenue]);

  const data = (dataReal[1] as any)?.revenue_month_y?.map((item: any) => ({
    name: item.Month,
    value: item.TotalAmount,
  }));

  const [money, setMoney] = useState<number>(0);

  const handleChange = (value: string) => {
    switch (value) {
      case "Day": {
        setMoney((dataReal[0] as any)?.revenue_day?.revenueToday);
        break;
      }
      case "Month": {
        setMoney((dataReal[0] as any)?.revenue_month?.comparison);
        break;
      }
      case "Yaer": {
        setMoney((dataReal[0] as any)?.revenue_month?.revenue_month_y);
        break;
      }
    }
  };

  const dataAnalytics = (dataReal[0] as any)?.revenue_month?.revenue_mon?.map(
    (item: any) => ({ name: item.Month, "doanh thu": item.TotalAmount })
  );

  useEffect(() => {
    if (!infoRole) return;
    if (infoRole && Number(infoRole) !== 1) {
      message.info(`bạn đang ở rạp chiếu phim ${id_cinema}`);
    }
  }, [infoRole]);

  if (Number(infoRole) === 3) {
    return <DashboardAdmin3 />;
  }

  switch (id_cinema) {
    case "1":
    case "2":
      return <DashboardAdminCinema />;

    default:
      return (
        <div className="flex flex-col gap-32">
          <div className={`${role === 2 ? "hidden" : ""}`}>
            <Select
              defaultValue="Day"
              style={{ width: 260 }}
              onChange={handleChange}
              options={[
                { value: "Day", label: "Doanh thu theo ngày" },
                { value: "Month", label: "Doanh thu theo tháng" },
                { value: "Year", label: "Doanh thu theo năm" },
              ]}
            />
            <div>
              <div className="h-32 rounded-lg ">
                <Card sx={sx}>
                  <CardContent>
                    <Stack
                      alignItems="flex-start"
                      // direction="row"
                      justifyContent="space-between"
                      // spacing={}
                    >
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                        <div className=" rounded-lg ">
                          <Stack spacing={1}>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              Doanh thu theo ngày
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(money)}
                            </Typography>
                          </Stack>
                        </div>
                        <div className=" rounded-lg ">
                          {" "}
                          <Avatar
                            sx={{
                              backgroundColor: "error.main",
                              height: 56,
                              width: 56,
                            }}
                          >
                            <SvgIcon>
                              <CurrencyDollarIcon />
                            </SvgIcon>
                          </Avatar>
                        </div>
                      </div>{" "}
                      <br />
                      {/* <Stack spacing={2}>
                        <Typography>
                          Tăng thêm{" "}
                          <span style={{ color: "#007BFF", fontWeight: "bold" }}>
                            {formatter(
                              (dataReal[0] as any)?.revenue_day?.revenueToday
                            )}
                          </span>{" "}
                          trong tháng này
                        </Typography>
                      </Stack> */}
                    </Stack>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className={`${role === 2 ? "hidden" : ""}`}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 h-[500px]">
              <div className="mt-10 rounded-lg  lg:col-span-2">
                <div className="flex justify-between items-center">
                  <h1 className="mb-10">Biểu Đồ</h1>
                </div>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={dataAnalytics}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="doanh thu"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-lg ">
                <PieChart width={400} height={400}>
                  <Tooltip
                    formatter={(value: any, name) => [formatter(value), name]}
                  />

                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>
          {dataReal[0] && (
            <div className="">
              <div className="1">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                  <div
                    className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}
                  >
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Doanh thu theo tháng
                                </Typography>
                                <Typography variant="h6" className="w-full">
                                  {formatter(
                                    dataReal[0]?.revenue_month?.revenue_month_y
                                  )}
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "error.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <CurrencyDollarIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {formatter(
                                  ((dataReal[0] as any)?.revenue_month)
                                    .comparison
                                )}
                              </span>{" "}
                              trong tháng này
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-32 rounded-lg ">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Doanh thu theo ngày
                                </Typography>
                                <Typography variant="h6" className="w-full">
                                  {formatter(
                                    ((dataReal[0] as any)?.revenue_day)
                                      .revenueToday
                                  )}
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "error.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <CurrencyDollarIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {formatter(
                                  ((dataReal[0] as any)?.revenue_day)
                                    .revenueToday
                                )}
                              </span>{" "}
                              trong tháng này
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}
                  >
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Doanh thu theo đồ ăn theo tháng
                                </Typography>
                                <Typography variant="h6" className="w-full">
                                  {formatter(
                                    ((dataReal[0] as any)?.revenue_month)
                                      .totalPricefoodmon
                                  )}
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "error.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <CurrencyDollarIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {formatter(
                                  ((dataReal[0] as any)?.revenue_month)
                                    .totalPricefoodmon
                                )}
                              </span>{" "}
                              trong tháng này
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-32 rounded-lg ">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Doanh thu theo đồ ăn theo ngày
                                </Typography>
                                <Typography variant="h6" className="w-full">
                                  {formatter(
                                    ((dataReal[0] as any)?.revenue_day)
                                      .totalPricefoodday
                                  )}
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "error.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <CurrencyDollarIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {formatter(
                                  ((dataReal[0] as any)?.revenue_day)
                                    .totalPricefoodday
                                )}
                              </span>{" "}
                              trong ngày
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-32 rounded-lg ">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Khách hàng mới theo ngày
                                </Typography>
                                <Typography variant="h6">
                                  {(dataReal[0] as any)?.revenue_day?.newUsers}{" "}
                                  KH
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "success.main",
                                  height: 56,
                                  width: 56,
                                }}
                              ></Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {(dataReal[0] as any)?.revenue_day?.newUsers} KH
                              </span>{" "}
                              trong ngày này
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}
                  >
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Khách hàng mới theo tháng
                                </Typography>
                                <Typography variant="h6">
                                  {
                                    (dataReal[0] as any)?.revenue_month
                                      ?.newUsers
                                  }{" "}
                                  KH
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "success.main",
                                  height: 56,
                                  width: 56,
                                }}
                              ></Avatar>
                            </div>
                          </div>{" "}
                          <br />
                          <Stack spacing={2}>
                            <Typography>
                              Tăng thêm{" "}
                              <span
                                style={{ color: "#007BFF", fontWeight: "bold" }}
                              >
                                {(dataReal[0] as any)?.revenue_month?.newUsers}{" "}
                                KH
                              </span>{" "}
                              trong tháng này
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-32 rounded-lg">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Tổng số vé bán ra
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_day[0]?.name
                                  }{" "}
                                </Typography>
                                <Typography variant="h6">
                                  {" "}
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_day[0]?.total_tickets
                                  }{" "}
                                  vé
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "warning.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <ListBulletIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="h-32 rounded-lg">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Tổng số vé bán ra theo tháng
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_mon[0]?.name
                                  }{" "}
                                </Typography>
                                <Typography variant="h6">
                                  {" "}
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_mon[0]?.total_tickets
                                  }{" "}
                                  vé
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "warning.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <ListBulletIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="h-32 rounded-lg">
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        >
                          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                            <div className=" rounded-lg ">
                              <Stack spacing={1}>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  Tổng số vé bán ra theo nam
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_year[0]?.name
                                  }{" "}
                                </Typography>
                                <Typography variant="h6">
                                  {" "}
                                  {
                                    (dataReal[0] as any)?.revenue_day
                                      ?.ticket_year[0]?.total_tickets
                                  }{" "}
                                  vé
                                </Typography>
                              </Stack>
                            </div>
                            <div className=" rounded-lg ">
                              {" "}
                              <Avatar
                                sx={{
                                  backgroundColor: "warning.main",
                                  height: 56,
                                  width: 56,
                                }}
                              >
                                <SvgIcon>
                                  <ListBulletIcon />
                                </SvgIcon>
                              </Avatar>
                            </div>
                          </div>{" "}
                          <br />
                        </Stack>
                      </CardContent>
                    </Card>
                  </div>
                  <div
                    className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}
                  >
                    <Card sx={sx}>
                      <CardContent>
                        <Stack
                          alignItems="flex-start"
                          // direction="row"
                          justifyContent="space-between"
                          // spacing={}
                        ></Stack>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-1 mt-24 ml-14 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className=" rounded-lg ">
                    Tốp 5 bộ phim có doanh thu cao nhất theo ngày
                  </div>
                  <div className=" rounded-lg ">Tốp 5 bộ phim bán vé chạy</div>
                </div>
                <div className="grid grid-cols-1 mt-10 ml-14 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className=" rounded-lg ">
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Stt
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tên phim
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {(
                            dataReal[0] as any
                          )?.revenue_day?.revenue_film_day?.map(
                            (item: any, index: any) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {formatter(Number(item.TotalAmount))}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className=" rounded-lg ">
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                          <tr>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Stt
                            </th>

                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tên phim
                            </th>

                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              tong so ve duoc ban
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {(
                            dataReal[0] as any
                          )?.revenue_month?.book_total_mon?.map(
                            (item: any, index: any) => (
                              <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {item.TotalTickets} số vé
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 mt-24 ml-14 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className={`${role === 2 ? "hidden" : "rounded-lg"}`}>
                    Tốp 5 bộ phim có doanh thu cao nhất theo tháng
                  </div>
                  <div className={`${role === 2 ? "hidden" : "rounded-lg"}`}>
                    Tốp 5 khách hàng thân thiết
                  </div>
                </div>
                <div className="grid grid-cols-1 mt-10 ml-14 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className={`${role === 2 ? "hidden" : "rounded-lg"}`}>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Stt
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tên phim
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {(
                            dataReal[0] as any
                          )?.revenue_month?.revenue_film?.map(
                            (item: any, index: any) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {formatter(Number(item.TotalAmount))}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className={`${role === 2 ? "hidden" : "rounded-lg"}`}>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                          <tr>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Stt
                            </th>

                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tên Khách Hàng
                            </th>

                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              Tổng tiền
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {(
                            dataReal[0] as any
                          )?.revenue_month?.user_friendly?.map(
                            (item: any, index: any) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                  {formatter(Number(item.TotalAmount))}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
};

export default Dashbroad;
