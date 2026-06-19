import { useState } from "react";

import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  // Select,
  Space,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAddFoodMutation } from "../../../service/food.service";
import { uploadImageApi } from "../../../apis/upload-image.api";
import { FOLDER_NAME } from "../../../configs/config";
import { validateImageFile, getUploadErrorMessage, getValidationErrorMessage } from "../../../utils";
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
    if (!linkImage) {
      message.error("Vui lòng tải lên hình ảnh cho đồ ăn!");
      return;
    }
    const data = { ...values, image: linkImage };

    try {
      const response = await addFood(data).unwrap();
      console.log("🚀 ~ file: AddFood.tsx:40 ~ onFinish ~ response:", response);
      message.success("Thêm sản phẩm thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/food");
    } catch (error) {
      console.log("🚀 ~ file: AddFood.tsx:45 ~ onFinish ~ error:", error)
      message.error(getValidationErrorMessage(error, "Thêm sản phẩm thất bại"));
    }
  };

  const [form] = Form.useForm(); // Tạo một Form instance để sử dụng validate
  const [uploadImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkImage, setLinkImage] = useState<string | null>(null);

  const handleUpdateImageFood = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate type and size
    for (const file of files) {
      if (!validateImageFile(file)) {
        return;
      }
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("upload_preset", "da_an_tot_nghiep");
      formData.append("folder", FOLDER_NAME);
      for (const file of files) {
        formData.append("file", file);
        const response = await uploadImageApi(formData);
        if (response) {
          setLinkImage(response.url);
        }
      }
    } catch (error: any) {
      message.error(getUploadErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
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
              <Form.Item label="Hình Ảnh">
                <div className="flex gap-1 items-center justify-between">
                  <input
                    type="file"
                    value={uploadImage}
                    className="flex-1 !hidden"
                    onChange={(e) => handleUpdateImageFood(e)}
                    id="update-image-poster"
                  />
                  <div className="flex flex-col">
                    <label
                      htmlFor="update-image-poster"
                      className="inline-block py-2 px-5 rounded-lg bg-blue-600 text-white capitalize cursor-pointer hover:bg-blue-700 transition text-center"
                    >
                      upload image
                    </label>
                    <span className="text-xs text-gray-400 mt-1">Tối đa 10MB (PNG, JPG, WEBP)</span>
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {linkImage && !isLoading && (
                <img
                  src={linkImage ? linkImage : ""}
                  alt={linkImage ? linkImage : ""}
                  className="h-[200px] w-full border shadow rounded-lg object-cover"
                />
              )}
              {isLoading && (
                <div className="h-[200px] w-full border shadow rounded-lg flex justify-center items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-500 border-t-2 border-t-white animate-spin"></div>
                </div>
              )}
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
                      if (value !== undefined && value !== null && value !== "") {
                        const num = Number(value);
                        if (isNaN(num)) {
                          return Promise.reject("Vui lòng nhập một số hợp lệ");
                        }
                        if (num < 0) {
                          return Promise.reject("Giá không thể là số âm");
                        }
                        if (num > 10000000) {
                          return Promise.reject("Giá tiền không thể vượt quá 10.000.000 Vn₫");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber placeholder="Giá tiền" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng nhập kho"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  {
                    validator: (_, value) => {
                      if (value !== undefined && value !== null && value !== "") {
                        const num = Number(value);
                        if (isNaN(num)) {
                          return Promise.reject("Vui lòng nhập một số hợp lệ");
                        }
                        if (num < 0) {
                          return Promise.reject("Số lượng không thể là số âm");
                        }
                        if (num > 1000000) {
                          return Promise.reject("Số lượng không thể vượt quá 1.000.000");
                        }
                        if (!Number.isInteger(num)) {
                          return Promise.reject("Số lượng phải là số nguyên");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                initialValue={100}
              >
                <InputNumber placeholder="Số lượng" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả chi tiết (Các thành phần trong Combo)"
              >
                <Input.TextArea rows={4} placeholder="Ví dụ: 1 Bắp ngọt lớn + 1 Nước ngọt Coca Cola 22oz" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddFood;
