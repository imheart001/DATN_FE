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
import { FOLDER_NAME } from "../../../configs/config";
import { uploadImageApi } from "../../../apis/upload-image.api";

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

  const [uploadImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkImage, setLinkImage] = useState<string | null>(null);

  const handleUpdateImage = async (e: any) => {
    setIsLoading(true);
    try {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("upload_preset", "da_an_tot_nghiep");
      formData.append("folder", FOLDER_NAME);
      for (const file of files) {
        formData.append("file", file);
        const response = await uploadImageApi(formData);
        if (response) {
          console.log(
            "🚀 ~ file: EditFilm.tsx:112 ~ handleUpdateImage ~ response:",
            response
          );
          setLinkImage(response.url);
          setIsLoading(false);
        }
      }
    } catch (error) {
      message.error("loi");
    }
  };

  useEffect(() => {
    if (dataFood) {
      form.setFieldsValue({
        name: dataFood.name,
        price: dataFood.price,
        image: dataFood.image,
      });
      setLinkImage(dataFood.image);
    }
  }, [dataFood]);
  const onFinish = async (values: any) => {
    try {
      await updateFood({ ...values, id: dataFood.id, image: linkImage });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/food");
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
        title="Cập Nhật Loại Đồ Ăn"
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

            {/* <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="hình ảnh" />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item name="image" label="Hình Ảnh">
                {/* <Input placeholder="Hình Ảnh" /> */}

                <div className="flex gap-1 items-center justify-between">
                  <input
                    type="file"
                    value={uploadImage}
                    className="flex-1 !hidden"
                    onChange={(e) => handleUpdateImage(e)}
                    id="update-image"
                  />
                  <label
                    htmlFor="update-image"
                    className="inline-block py-2 px-5 rounded-lg bg-blue-200 text-white capitalize"
                  >
                    upload image
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {linkImage && !isLoading && (
                <img
                  src={linkImage}
                  alt={linkImage}
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
                      if (isNaN(value)) {
                        return Promise.reject("Vui lòng nhập một số hợp lệ");
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
                <Input placeholder="giá tiền" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default UpdateCategory;
