import React from "react";
import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
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
import { useGetAnalyticsQuery } from "../../../service/analytic.service";
import { formatCurrency } from "../../../utils/formatCurrency";
// import {
//     Box,
//     CardHeader,
//     useTheme
// } from '@mui/material';

// import { Chart } from 'react-charts';

// import PropTypes from 'prop-types';

// import { ComputerDesktopIcon, DeviceTabletIcon, PhoneIcon } from './YourIconPath';

// const useChartOptions = (labels: any) => {
//     const theme = useTheme();

//     return {
//         data: {
//             colors: [
//                 theme.palette.primary.main,
//                 theme.palette.success.main,
//                 theme.palette.warning.main
//             ],
//             labels
//         },
//         pie: {
//             expandOnClick: false
//         },
//         tooltip: {
//             fillSeriesColor: false
//         },
//         stroke: {
//             width: 0
//         }
//     };
// };

//   const iconMap = {
//     Desktop: <ComputerDesktopIcon />,
//     Tablet: <DeviceTabletIcon />,
//     Phone: <PhoneIcon />
//   };

const Dashbroad = (props: any) => {
  const { difference, positive = false, sx, value } = props;

  const data1 = [
    { name: "Online", value: 60 },
    { name: "Offline", value: 40 },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  const dataFake = {
    revenue_month_y: [
      {
        Month: "2023-11",
        TotalAmount: "6667",
      },
      {
        Month: "2023-12",
        TotalAmount: "67",
      },
      {
        Month: "2023-1",
        TotalAmount: "05",
      },
      {
        Month: "2023-2",
        TotalAmount: "99",
      },
      {
        Month: "2023-3",
        TotalAmount: "80",
      },
    ],
    revenue_mon: [
      {
        Month: "2023-11",
        TotalAmount: 666799999,
      },
    ],
    newUsers: 2,
    revenue_film: [
      {
        name: "The Wolverine",
        TotalAmount: "2223",
      },
      {
        name: "Spider-Man: No Way Home",
        TotalAmount: "2222",
      },
      {
        name: "The Batman",
        TotalAmount: "2222",
      },
    ],
    user_friendly: [
      {
        name: "Duy",
        TotalAmount: "2223",
      },
      {
        name: "John Doe",
        TotalAmount: "2222",
      },
      {
        name: "Jane Doe",
        TotalAmount: "2222",
      },
    ],
  };

  const { dataAnalytic, isLoading } = useGetAnalyticsQuery();
  console.log("🚀 ~ file: Dashbroad.tsx:85 ~ data:", dataAnalytic);

  if (isLoading) {
    return <div className="">Loading....</div>;
  }

  const handleCaculator = (moneyMoney: any) => {
    const result = moneyMoney.reduce((total: number, item: any) => {
      return (total += item.TotalAmount);
    }, 0);
    return formatCurrency(result);
  };

  const data = dataFake.revenue_month_y.map((item) => ({
    name: item.Month,
    value: item.TotalAmount,
  }));

  return (
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
                        <Typography color="text.secondary" variant="overline">
                          Doanh thu
                        </Typography>
                        <Typography variant="h6">
                          {handleCaculator(dataFake.revenue_mon)}
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
                    <Typography variant="h7">
                      Tăng thêm{" "}
                      <span style={{ color: "#007BFF", fontWeight: "bold" }}>
                        {handleCaculator(dataFake.revenue_mon)}
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
                        <Typography color="text.secondary" variant="overline">
                          Khách hàng mới
                        </Typography>
                        <Typography variant="h6">
                          {dataFake.newUsers} KH
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
                    <Typography variant="h7">
                      Tăng thêm{" "}
                      <span style={{ color: "#007BFF", fontWeight: "bold" }}>
                        {dataFake.newUsers} KH
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
                        <Typography color="text.secondary" variant="overline">
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
                    <Typography variant="h7">
                      Tăng thêm{" "}
                      <span style={{ color: "#007BFF", fontWeight: "bold" }}>
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
                        <Typography color="text.secondary" variant="overline">
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
                    <Typography variant="h7">
                      Tăng thêm{" "}
                      <span style={{ color: "#007BFF", fontWeight: "bold" }}>
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
          <div className="mt-24 rounded-lg  lg:col-span-2">
            <h1>Biểu Đồ</h1>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
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

              <Tooltip />

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
                  {dataFake.revenue_film.map((item, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {formatCurrency(Number(item.TotalAmount))}
                      </td>
                    </tr>
                  ))}
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
                  {dataFake.user_friendly.map((item, index) => (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {formatCurrency(Number(item.TotalAmount))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashbroad.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,

  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default Dashbroad;
