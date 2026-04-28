import { useEffect, useState } from "react";
import {
  useGetAnalyticsAdminCinemaMutation,
  useGetAnalyticsMutation,
} from "../../../service/analytic.service";
import { formatter } from "../../../utils/formatCurrency";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { RootState } from "../../../store/store";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import moment from "moment";
import { useAppSelector } from "../../../store/hooks";

export const DashboardAdminCinema = (props: any) => {
  const [getDataRevenue] = useGetAnalyticsMutation();
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user?.role;

  const day = moment().get("date");

  const [dataReal, setDataReal] = useState<any[]>([]);
  const [getCinemas] = useGetAnalyticsAdminCinemaMutation();
  const [data, setData] = useState<any>();

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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
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
                              Doanh thu theo ngayf
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {
                                data?.revenue_staff?.revenue_staff_day[0]
                                  ?.cinema_name
                              }
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(
                                data?.revenue_staff?.revenue_staff_day[0]
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

              {data?.revenue_staff?.tickets_total?.map(
                (item: any, index: number) => (
                  <div key={index} className="h-32 rounded-lg ">
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
                                  Doanh thu vé
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="overline"
                                >
                                  {item?.name}
                                </Typography>
                                <Typography variant="h6" className="w-full">
                                  {item?.total_tickets}
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
                )
              )}

              {data?.revenue_staff?.revenue_staff_day_filter &&
                data?.revenue_staff?.revenue_staff_day_filter.length > 0 &&
                data?.revenue_staff?.revenue_staff_day_filter?.map(
                  (item: any, index: number) => (
                    <div key={index} className="h-32 rounded-lg ">
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
                                    Doanh thu lọc
                                  </Typography>
                                  <Typography
                                    color="text.secondary"
                                    variant="overline"
                                  >
                                    {item?.cinema_name}
                                  </Typography>
                                  <Typography variant="h6" className="w-full">
                                    {formatter(item?.total_amount)}
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
                  )
                )}

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
                              Doanh thu theo đồ ăn theo tháng
                            </Typography>
                            <Typography variant="h6" className="w-full">
                              {formatter(data?.revenue_staff?.revenue_food)}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
