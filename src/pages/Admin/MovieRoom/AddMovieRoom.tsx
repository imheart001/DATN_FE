
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
      message.success("Thêm sản phẩm thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/movieroom");
    } catch (error) {
      message.error("Thêm sản phẩm thất bại");
    }
  console.log(values);

  };
  

  const [form] = Form.useForm(); // Tạo một Form instance để sử dụng validate

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

        title="Thêm Loại MovieRoom"
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
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="id_cinema"
                label="Id_cinema"
                rules={[{ required: true, message: "Please enter id_cinema" }]}
              >
                  <Select placeholder="Please select a film_id">
                  {
                    (cinemas as any)?.data?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>{cinema.name}</Option>
                      )
                    })
                  }

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
