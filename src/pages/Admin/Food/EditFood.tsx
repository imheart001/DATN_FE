import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

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
  Image,
} from "antd";

import { useUpdateFoodMutation } from "../../../service/food.service";

interface DataType {
  id: string;
  name: string;
  image: string;
  price: number;
}
interface EditFoodProps {
  dataFood: DataType;
}

const UpdateCategory: React.FC<EditFoodProps> = ({ dataFood }) => {
  const [updateFood] = useUpdateFoodMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataFood) {
      form.setFieldsValue({
        name: dataFood.name,
        image: dataFood.image,
        price: dataFood.price,
      });
    }
  }, [dataFood]);
  const onFinish = async (values: any) => {
    try {
      await updateFood({ ...values, id: dataFood.id });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/food");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };
  const [open, setOpen] = useState(false);
  console.log(dataFood);

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
        title="Thêm Loại Đồ Ăn"
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
                name="image"
                label="Image"
                rules={[{ required: true, message: "Please enter Image" }]}
              >
                <Input placeholder="Please enter user Image" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please select a Price" }]}
              >
                <Input placeholder="Please enter user Price" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default UpdateCategory;
