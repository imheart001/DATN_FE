import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Button,
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
import { useUpdateCinemaMutation } from "../../../service/brand.service";

const { Option } = Select;
interface DataType {
  id: string;
  name: string;
  address: string;
}
interface EditCinemaProps {
  dataCinema: DataType;
}

const EditBookTicket: React.FC<EditCinemaProps> = ({ dataCinema }) => {
  const [updateCinema] = useUpdateCinemaMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataCinema) {
      form.setFieldsValue({
        name: dataCinema.name,
        address: dataCinema.address,
      });
    }
  }, [dataCinema]);
  const onFinish = async (values: any) => {
    try {
      await updateCinema({ ...values, id: dataCinema.id });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/cinema");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer}>
        <div className="flex ">
          <EditOutlined />
        </div>
      </Button>

      <Drawer
        title="Cập nhật Rạp Chiếu"
        width={720}
        onClose={onClose}
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
                rules={[{ required: true, message: "Please Name" }]}
              >
                <Input placeholder="Please Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Please Địa chỉ" }]}
              >
                <Input placeholder="Please Địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditBookTicket;
