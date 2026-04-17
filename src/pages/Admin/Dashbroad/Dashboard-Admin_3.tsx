import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import {
  useGetAnalyticsAdminCinemaMutation,
  useGetAnalyticsMutation,
} from "../../../service/analytic.service";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { formatter } from "../../../utils/formatCurrency";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";

export const DashboardAdmin3 = () => {
  const [getDataRevenue] = useGetAnalyticsMutation();
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;

  const day = moment().get("date");
  const months = moment().get("month");
  const years = moment().get("year");

  const [dataReal, setDataReal] = useState<any[]>([]);
  const [getCinemas] = useGetAnalyticsAdminCinemaMutation();
  const [data, setData] = useState<any>();
  console.log(
    "🚀 ~ file: Dashboard-Admin_3.tsx:29 ~ DashboardAdmin3 ~ data:",
    data
  );

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

  useEffect(() => {
    const getchData = async () => {
      try {
        const id_cinema = localStorage.getItem("ic_cinema");
        if (id_cinema) {
          const formData = new FormData();
          formData.append("id_cinema", id_cinema);
          formData.append("day", day);
          formData.append("month", months + 1);
          formData.append("year", years);
          const reponse = await getCinemas(formData);
          setData((reponse as any).data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getchData();
  }, []);

  return (
    <div>
      {dataReal[0] && (
        <div className="">
          <div className="1">
            <div className="grid grid-cols-1 gap-4 gap-y-10 lg:grid-cols-4 lg:gap-8">
              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng tiền doanh thu theo ngày theo rạp
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_day_filter[0]?.cinema_name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_day_filter[0]?.total_amount ||
                                  0
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng tiền doanh thu theo tháng theo rạp
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_mon_filter[0]?.cinema_name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_mon_filter[0]?.total_amount ||
                                  0
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>
              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổmg tiền ngày hiện tại
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_year_filter[0]?.cinema_name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema
                                  ?.revenue_admin_year_filter[0]
                                  ?.total_amount || 0
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổmg tiền tháng hiện tại
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema?.revenue_admin_mon[0]
                                  ?.cinema_name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema?.revenue_admin_mon[0]
                                  ?.total_amount || 0
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé bán ra theo ngày theo từng tên film
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema?.tickets_total_day[0]
                                  ?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema?.tickets_total_day[0]
                                ?.total_tickets || 0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>
              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé bán ra theo tháng theo từng film
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema?.tickets_total_mon[0]
                                  ?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema?.tickets_total_mon[0]
                                ?.total_tickets || 0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé nhân viên check vé theo ngày
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.ticket_staff_total_day[0]?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema
                                ?.ticket_staff_total_day[0]?.total_tickets ||
                                0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé nhân viên check vé theo tháng
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.ticket_staff_total_mon[0]?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema
                                ?.ticket_staff_total_mon[0]?.total_tickets ||
                                0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé nhân viên check vé theo ngày
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.ticket_staff_fill_day[0]?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema
                                ?.ticket_staff_fill_day[0]?.total_tickets ||
                                0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng số vé nhân viên check vé theo tháng
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_admin_cinema
                                  ?.ticket_staff_fill_mon[0]?.name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {data?.revenue_admin_cinema
                                ?.ticket_staff_fill_mon[0]?.total_tickets ||
                                0}{" "}
                              vé
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>
              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              TỔNG TIỀN ĂN THEO NGÀY
                            </Typography>

                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema?.revenue_food || 0
                              )}{" "}
                              vnđ
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              TỔNG TIỀN ĐỒ ĂN THEO THÁNG
                            </Typography>

                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema?.total_food_mon || 0
                              )}{" "}
                              vnđ
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>

              <div className={`${role === 2 ? "hidden" : "h-32 rounded-lg"}`}>
                <Card>
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
                              tổng tiền đồ ăn theo năm
                            </Typography>

                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_admin_cinema?.total_food_year || 0
                              )}{" "}
                              vnđ
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
                    </Stack>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
