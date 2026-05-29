import React from "react";

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
import { useAddBlogMutation } from "../../../service/blog.service";
import { uploadImageApi } from "../../../apis/upload-image.api";
import { FOLDER_NAME } from "../../../configs/config";
const { Option } = Select;

const AddBlog: React.FC = () => {
  const [addBlog] = useAddBlogMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [uploadImage] = useState("");
  const [linkImage, setLinkImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      await addBlog({ ...values, image: linkImage }).unwrap();
      message.success("Thêm bài viết thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/blogs");
    } catch (error) {
      message.error("Thêm bài viết thất bại");
    }
  };
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
          setLinkImage(response.url);
          setIsLoading(false);
        }
      }
    } catch (error) {
      message.error("loi");
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
        title="Thêm Bài Viết"
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
                name="title"
                label="Tên bài viết"
                rules={[{ required: true, message: "Mời nhập Tên bài viết" }]}
              >
                <Input placeholder="Mời nhập Tên bài viết" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Tiêu đề"
                rules={[{ required: true, message: "Mời nhập tiêu đề" }]}
              >
                <Input placeholder="Mời nhập user tiêu đề" />
              </Form.Item>
            </Col>
          </Row>
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
          <Row gutter={16}>
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
            <Col span={12}>
              <Form.Item
                name="content"
                label="Nội dung"
                rules={[{ required: true, message: "Mời nhập  nội dung" }]}
              >
                <Input placeholder="Mời nhập user nội dung" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: "Mời nhập trạng thái" }]}
              >
                <Select placeholder="Mời nhập trạng thái">
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

export default AddBlog;
