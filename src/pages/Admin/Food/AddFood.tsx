import { useState } from "react";

import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  // Select,
  Space,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAddFoodMutation } from "../../../service/food.service";
// const { Option } = Select;

const AddFood: React.FC = () => {
  const [addFood] = useAddFoodMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [imageFileList, setImageFileList] = useState<any>([]);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      if (imageFileList.length > 0) {
        formData.append('image', imageFileList[0].originFileObj);
      }
      console.log(imageFileList[0].originFileObj);
      console.log(values.image);
      
    // try {
    //   await addFood(values).unwrap();
    //   message.success("Thêm sản phẩm thành công");
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
    //   navigate("/admin/food");
    // } catch (error) {
    //   message.error("Thêm sản phẩm thất bại");
    // }
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
                label="Tên đồ ăn"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Tên đồ ăn" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình Ảnh"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  beforeUpload={() => false}
                  onChange={({ fileList }) => setImageFileList(fileList)}
                >
                  {imageFileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá tiền"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  {
                    validator: (_, value) => {
                      if (isNaN(value)) {
                        return Promise.reject('Vui lòng nhập một số hợp lệ');
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    validator: (_, value) => {
                      if (value < 0) {
                        return Promise.reject("Giá không thể là số âm");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Giá tiền" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddFood;
