import { useState } from "react";

import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAddMovieRoomMutation } from "../../../service/movieroom.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { ICinemas } from "../../../interface/model";
const { Option } = Select;

const AddMovieRoom: React.FC = () => {
  const [addMovieRoom] = useAddMovieRoomMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: cinemas } = useFetchCinemaQuery();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      await addMovieRoom(values).unwrap();
      message.success("Thêm phòng chiếu thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/movieroom");
    } catch (error) {
      message.error("Thêm phòng chiếu thất bại");
    }
    console.log(values);
  };

  const [form] = Form.useForm(); // Tạo một Form instance để sử dụng validate

  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user.role;
  const id_cinema = user.id_cinema;

  const optionRole3 = (cinemas as any)?.data?.filter(
    (item: any) => item.id === id_cinema
  );
  const optionRole1 = (cinemas as any)?.data?.map((item: any) => item);

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
        title="Thêm  phòng chiếu"
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
            <Button onClick={onClose}>Cancel</Button>

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
              Submit
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
                name="name"
                label="Tên phòng"
                rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
              >
                <Input placeholder="Vui lòng nhập tên phòng" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="id_cinema"
                label="Rạp"
                rules={[{ required: true, message: "Vui lòng chọn rạp " }]}
              >
                <Select placeholder="Vui lòng chọn rạp ">
                  {/* {
                    (cinemas as any)?.data?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>{cinema.name}</Option>
                      )
                    })
                  } */}
                  {role === 2 &&
                    optionRole3?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>
                          {cinema.name}
                        </Option>
                      );
                    })}
                  {role === 1 &&
                    optionRole1?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>
                          {cinema.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddMovieRoom;
