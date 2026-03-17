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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { PieChart, Pie } from "recharts";
import { useEffect, useState } from "react";
import { formatCurrency, formatter } from "../../../utils/formatCurrency";
import { useGetAnalyticsMutation } from "../../../service/analytic.service";

const Dashbroad = (props: any) => {
  const { difference, positive = false, sx, value } = props;
  const [dataReal, setDataReal] = useState<any[]>([]);
  const data1 = [
    { name: "Online", value: 60 },
    { name: "Offline", value: 40 },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  const [getDataRevenue] = useGetAnalyticsMutation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataRevenue({});
        console.log((response as any)?.data);

        // Update state with new data
        setDataReal((prevData) => [...prevData, (response as any)?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the getData function to fetch data
    getData();
  }, [getDataRevenue]);

  const data = (dataReal[0] as any)?.revenue_month_y?.map((item: any) => ({
    name: item.Month,
    value: item.TotalAmount,
  }));

  return (
    <div>
      {dataReal[0] && (
        <div className="dashboard">
          <div className="1">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
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
                              Doanh thu
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                ((dataReal[0] as any)?.revenue_mon)[0]
                                  .TotalAmount
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
                              ((dataReal[0] as any)?.revenue_mon)[0].TotalAmount
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
                      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                        <div className=" rounded-lg ">
                          <Stack spacing={1}>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              Khách hàng mới
                            </Typography>
                            <Typography variant="h6">
                              {(dataReal[0] as any)?.newUsers} KH
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
                            {(dataReal[0] as any)?.newUsers} KH
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
                      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                        <div className=" rounded-lg ">
                          <Stack spacing={1}>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              Tổng số vé bán ra
                            </Typography>
                            <Typography variant="h6">113 Vé</Typography>
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
                      <Stack spacing={2}>
                        <Typography>
                          Tăng thêm{" "}
                          <span
                            style={{ color: "#007BFF", fontWeight: "bold" }}
                          >
                            113 Vé
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
                      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_120px] lg:gap-8">
                        <div className=" rounded-lg ">
                          <Stack spacing={1}>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              Tổng số vé trả lại
                            </Typography>
                            <Typography variant="h6">35 Vé</Typography>
                          </Stack>
                        </div>
                        <div className=" rounded-lg ">
                          {" "}
                          <Avatar
                            sx={{
                              backgroundColor: "primary.main",
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
                      <Stack spacing={2}>
                        <Typography>
                          Tăng thêm{" "}
                          <span
                            style={{ color: "#007BFF", fontWeight: "bold" }}
                          >
                            35 Vé
                          </span>{" "}
                          trong tháng này
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="2 mt-24">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="mt-10 rounded-lg  lg:col-span-2">
                <h1 className="mb-10">Biểu Đồ</h1>
                <LineChart width={600} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatter(value)} />{" "}
                  {/* Apply formatter here */}
                  <Tooltip
                    formatter={(value: any, name) => [formatter(value), name]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
              <div className="rounded-lg ">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data1}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    // fill="#0088FE"
                    label
                  >
                    {data1.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value: any, name) => [formatter(value), name]}
                  />

                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>

          <div className="3">
            <div className="grid grid-cols-1 mt-24 ml-14 gap-4 lg:grid-cols-2 lg:gap-8">
              <div className=" rounded-lg ">
                Tốp 5 bộ phim có doanh thu cao nhất
              </div>
              <div className=" rounded-lg ">Tốp 5 khách hàng thân thiết</div>
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
                      {(dataReal[0] as any)?.revenue_film?.map(
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
                          Tên Khách Hàng
                        </th>

                        <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Tổng tiền
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {(dataReal[0] as any)?.user_friendly?.map(
                        (item: any, index: any) => (
                          <tr>
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
};

export default Dashbroad;
