import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { PieChart, Pie } from 'recharts';
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




const Dashbroad:FC = (props: any) => {
    const { difference, positive = false, sx, value } = props;
    const data = [
        { name: 'Tháng 1', value: 400 },
        { name: 'Tháng 2', value: 300 },
        { name: 'Tháng 3', value: 600 },
        { name: 'Tháng 4', value: 800 },
        { name: 'Tháng 5', value: 700 },
    ];
    const data1 = [
        { name: 'Online', value: 60 },
        { name: 'Offline', value: 40 },
    ];
    const COLORS = ['#0088FE', '#00C49F'];

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
                                                <Typography variant="h6">8,765,000</Typography>

                                            </Stack>
                                        </div>
                                        <div className=" rounded-lg "> <Avatar
                                            sx={{
                                                backgroundColor: 'error.main',
                                                height: 56,
                                                width: 56
                                            }}
                                        >
                                            <SvgIcon>
                                                <CurrencyDollarIcon />
                                            </SvgIcon>
                                        </Avatar></div>
                                    </div> <br />

                                    <Stack spacing={2}>

                                        <Typography variant="h7">
                                            Tăng thêm <span style={{ color: '#007BFF', fontWeight: 'bold' }}>8,765,000</span> trong tháng này
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
                                                <Typography variant="h6">11 KH</Typography>


                                            </Stack>
                                        </div>
                                        <div className=" rounded-lg ">  <Avatar
                                            sx={{
                                                backgroundColor: 'success.main',
                                                height: 56,
                                                width: 56
                                            }}
                                        >
                                        </Avatar></div>
                                    </div> <br />

                                    <Stack spacing={2}>

                                        <Typography variant="h7">
                                            Tăng thêm <span style={{ color: '#007BFF', fontWeight: 'bold' }}>11 KH</span> trong tháng này
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
                                        <div className=" rounded-lg ">   <Avatar
                                            sx={{
                                                backgroundColor: 'warning.main',
                                                height: 56,
                                                width: 56
                                            }}
                                        >
                                            <SvgIcon>
                                                <ListBulletIcon />
                                            </SvgIcon>
                                        </Avatar></div>
                                    </div> <br />

                                    <Stack spacing={2}>

                                        <Typography variant="h7">
                                            Tăng thêm <span style={{ color: '#007BFF', fontWeight: 'bold' }}>113 Vé</span> trong tháng này
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
                                        <div className=" rounded-lg "> <Avatar
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                height: 56,
                                                width: 56
                                            }}
                                        >
                                            <SvgIcon>
                                                <ListBulletIcon />
                                            </SvgIcon>
                                        </Avatar></div>
                                    </div> <br />

                                    <Stack spacing={2}>

                                        <Typography variant="h7">
                                            Tăng thêm <span style={{ color: '#007BFF', fontWeight: 'bold' }}>35 Vé</span> trong tháng này
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
                        <h1 >Biểu Đồ</h1>
                        <LineChart width={600} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                    <div className=" rounded-lg ">Tốp 5 bộ phim có doanh thu cao nhất</div>
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
                                            Mã phim
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Tên phim
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Thể loại
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Doanh thu
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            1
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">mov10001</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Người vợ cuối cùng</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Hành động</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">4,987,000 đ</td>

                                    </tr>

                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            1
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">mov10001</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Người vợ cuối cùng</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Hành động</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">4,987,000 đ</td>

                                    </tr><tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            1
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">mov10001</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Người vợ cuối cùng</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Hành động</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">4,987,000 đ</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className=" rounded-lg ">

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Name
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Date of Birth
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Role
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Salary
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            John Doe
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                                    </tr>

                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Jane Doe
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                                    </tr>

                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Gary Barlow
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                                    </tr>
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
