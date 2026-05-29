import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from "antd";
import { useUpdateUserMutation } from "../../../service/signup_login.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { ICinemas } from "../../../interface/model";

interface DataType {
  id: string;
  name: string;
  phone: number;
  email: string;
  role: number;
  id_cinema: number;
}
interface EditUserProps {
  dataUser: DataType;
}

const EditUser: React.FC<EditUserProps> = ({ dataUser }) => {
  
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: cinemas } = useFetchCinemaQuery();
  const [showIdCinema, setShowIdCinema] = useState(false);
  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        name: dataUser.name,
        phone: dataUser.phone,
        email: dataUser.email,
        role: dataUser.role,
        id_cinema: dataUser.id_cinema !== null ? [dataUser.id_cinema] : undefined,
      });
    }
  }, [dataUser]);

  const onFinish = async (values: any) => {
    
    try {
      const res = await updateUser({ ...values, id: dataUser.id });
      if (res?.error) {
        message.error(res?.error.data.errors.email);

      } else {
        message.success("Cập nhật quyền hạn thành công");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        navigate("/admin/user");
      }

    } catch (error) {
      message.error("Cập nhật quyền hạn thất bại");
    }
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleRoleChange = (value: any) => {
      console.log(value);
  console.log(showIdCinema);
      
    if (value === "2" || value === "3") {
      setShowIdCinema(true);
    }else{
      setShowIdCinema(false);
    }
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
            <Button onClick={onClose}>Trở Về</Button>

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
              Cập Nhật
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
                label="Tên Người Dùng"
              >
                <Input disabled placeholder="Họ và tên" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số Điện Thoại"
              >
                <Input disabled placeholder="Please enter user Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
              >
                <Input disabled placeholder="Please enter user Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="role"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Select onChange={handleRoleChange}>
                  <Select.Option value="1">Admin Tổng</Select.Option>
                  <Select.Option value="3">Admin Theo Rạp</Select.Option>
                  <Select.Option value="2">Nhân Viên</Select.Option>
                  <Select.Option value="0">Người Dùng</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {showIdCinema && (
              <Col span={12}>
                <Form.Item
                  name="id_cinema"
                  label="Rạp Chiếu"
                  rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
                >
                  <Select placeholder="Vui Lòng Chọn Rạp Chiếu">
                    {(cinemas as any)?.data?.map(
                      (cinema: ICinemas, index: number) => {
                        return (
                          <Select.Option key={index} value={cinema.id}>
                            {" "}
                            {cinema.name}{" "}
                          </Select.Option>
                        );
                      }
                    )}
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditUser;
