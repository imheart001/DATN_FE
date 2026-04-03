
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { useUpdateUserMutation } from "../../../service/signup_login.service";



interface DataType {
    id: string;
    name: string;
    phone: number;
    email: string;
}
interface EditUserProps {
  dataUser: DataType;
}

const EditUser: React.FC<EditUserProps> = ({ dataUser }) => {
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log(dataUser);

  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        name: dataUser.name,
        phone: dataUser.phone,
        email: dataUser.email,

      });
    }
  }, [dataUser]);
  const onFinish = async (values: any) => {
    try {
      await updateUser({ ...values, id: dataUser.id });

      message.success("Cập nhật User thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/user");
    } catch (error) {
      message.error("Cập nhật user thất bại");
    }
  };
  const [open, setOpen] = useState(false);
  console.log(dataUser);

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
        title="Update user"
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
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter Phone" }]}
              >
                <Input placeholder="Please enter user Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please select a Email" }]}
              >
                <Input placeholder="Please enter user Email" />
              </Form.Item>
            </Col>
          </Row>
         
        </Form>
      </Drawer>
    </>
  );
};

export default EditUser;
