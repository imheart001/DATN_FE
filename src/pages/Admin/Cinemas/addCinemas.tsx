import React, { useState } from "react";
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
import {  useAddCinemasMutation } from "../../../service/cinemas.service";

const { Option } = Select;

const AddCinemas: React.FC = () => {
  const [addCinemas] = useAddCinemasMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      values.release_date = values.release_date.format("YYYY-MM-DD");
      await addCinemas(values).unwrap();
      message.success("Thêm rạp thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin");
    } catch (error) {
      message.error("Thêm rạp thất bại");
    }
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
        title="Thêm rạp"
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
                name="address"
                label="address"
                rules={[{ required: true, message: "Please select an address" }]}
              >
                <Input placeholder="Please enter user address" />
              </Form.Item>
            </Col>
          </Row>         
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select a status" }]}
              >
                <Select placeholder="Please select a status">
                  <Option value="1">1</Option>
                  <Option value="0">0</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          
        </Form>
      </Drawer>
    </>
  );
};

export default AddCinemas;
