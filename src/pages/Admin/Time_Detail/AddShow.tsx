import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { useAddShowTimeMutation } from "../../../service/show.service";
import {
  useAddTimeMutation,
  useFetchTimeQuery,
} from "../../../service/time.service";
import { IFilms, IMovieRoom, ITime } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import dayjs from "dayjs";
const AddShow: React.FC = () => {
  const [addShow] = useAddShowTimeMutation();
  let user = JSON.parse(localStorage.getItem("user")!);
  const role = user?.role;
  const cinema_admin = user?.id_cinema;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: films } = useFetchProductQuery();
  const { data: times } = useFetchTimeQuery();
  const { data: cinemas } = useFetchCinemaQuery();
  const { data: roomBrand } = useFetchMovieRoomQuery();
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [roomByCinema, setRoomByCinema] = useState([]);
  const roomByCinemaaa = (roomBrand as any)?.data?.filter(
    (room: any) => room.id_cinema == cinema_admin
  );
  console.log(
    (cinemas as any)?.data?.find((c: any) => c.id == cinema_admin)?.name
  );

  const sortedTimes = (times as any)?.data
    .slice()
    .sort((a: any, b: any) => a.time.localeCompare(b.time));

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      for (const time of values.time_id) {
        const dataAddShow = {
          date: values.date.format("YYYY-MM-DD"),
          time_id: time,
          film_id: values.film_id,
          room_id: values.room_id,
        };
        const response = await addShow(dataAddShow).unwrap();
        console.log(response);
        if (response) {
          message.success("Thêm mới suất chiếu thành công  ");
        }
      }
    } catch (error) {
      console.log(error);

      message.error("Thêm sản phẩm thất bại  " + (error as any).data.message);
    }
  };

  const [form] = Form.useForm(); // Tạo một Form instance để sử dụng validate
  const handleCinemaChange = (value: any) => {
    console.log(value);
    const roomByCinema = (roomBrand as any).data.filter(
      (room: any) => room.id_cinema == value
    );
    console.log(roomByCinema);

    setRoomByCinema(roomByCinema);
    setSelectedCinema(value);
    form.setFieldsValue({ room_id: roomByCinema }); // Đặt lại giá trị phòng chiếu khi chọn rạp mới
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={showDrawer}
        icon={<UserAddOutlined />}
      >
        Thêm
      </Button>
      <Drawer
        title="Thêm Rạp Chiếu"
        width={720}
        onClose={() => {
          onClose();
          form.resetFields(); // Reset trường dữ liệu khi đóng Drawer
        }}
        open={open}
        style={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>

            <Button
              danger
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.validateFields().then((values) => {
                  onFinish(values);
                });
              }}
            >
              Thêm Mới
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="film_id"
                label="Phim"
                rules={[{ required: true, message: "Vui lòng Chọn Phim" }]}
              >
                <Select placeholder="Vui lòng Chọn Phim">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (films as any)?.data?.map((time: IFilms, index: number) => {
                      const isExpired = dayjs(time.end_date).isBefore(dayjs());
                      const isExpired2 = dayjs(time.release_date).isAfter(
                        dayjs()
                      );
                      if (isExpired) {
                        return null;
                      }
                      if (isExpired2) {
                        return null;
                      }
                      return (
                        <Option key={index} value={time.id}>
                          {" "}
                          {time.name}{" "}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="w-full">
              <Form.Item
                className="w-full"
                name="date"
                label="Ngày Chiếu"
                rules={[
                  { required: true, message: "Please choose the release date" },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12} className="w-full">
              <Form.Item
                className="w-full"
                name="cinemas"
                label="Rạp Chiếu"
                rules={[
                  {
                    required: role === 1, // Nếu role là 1 thì mới yêu cầu chọn rạp
                    message: "Vui Lòng Chọn Rạp Chiếu",
                  },
                ]}
              >
                {role === 1 ? (
                  <Select
                    placeholder="Vui Lòng Chọn Rạp Chiếu"
                    onChange={handleCinemaChange}
                  >
                    {(cinemas as any)?.data?.map(
                      (cinema: IMovieRoom, index: number) => {
                        return (
                          <Option key={index} value={cinema.id}>
                            {cinema.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                ) : (
                  <Input
                    value={cinema_admin}
                    placeholder={
                      (cinemas as any)?.data.find(
                        (c: any) => c.id == cinema_admin
                      ).name
                    }
                    disabled
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="room_id"
                label="Phòng Chiếu"
                rules={[
                  { required: true, message: "Vui Lòng Chọn Phòng Chiếu" },
                ]}
              >
                <Select
                  className=""
                  placeholder="Vui Lòng Chọn Rạp Chiếu trước"
                >
                  {role !== 1
                    ? (roomByCinemaaa as any)?.map(
                        (room: IMovieRoom, index: number) => {
                          return (
                            <Option key={index} value={room.id}>
                              {" "}
                              {room.name}{" "}
                            </Option>
                          );
                        }
                      )
                    : (roomByCinema as any)?.map(
                        (room: IMovieRoom, index: number) => {
                          return (
                            <Option key={index} value={room.id}>
                              {" "}
                              {room.name}{" "}
                            </Option>
                          );
                        }
                      )}
                  {/* {(roomByCinema as any)?.map(
                    (room: IMovieRoom, index: number) => {
                      return (
                        <Option key={index} value={room.id}>
                          {" "}
                          {room.name}{" "}
                        </Option>
                      );
                    }
                  )} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="time_id" label="Thời gian">
            <Checkbox.Group>
              <Row gutter={100} key={"times"}>
                {sortedTimes?.map((time: any) => (
                  <Col key={time.id} span={3}>
                    <Checkbox value={time.id} style={{ lineHeight: "32px" }}>
                      {time.time}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default AddShow;
