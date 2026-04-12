
import React, { useEffect } from 'react'
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
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
import { useUpdateBlogMutation } from '../../../service/blog.service';
const { Option } = Select;
interface DataType {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  status: number;
}
interface EditBlogProps{
  dataBlog : DataType
}
const UpdateBlog: React.FC<EditBlogProps> = ({dataBlog}) => {
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dataBlog) {
      form.setFieldsValue({
        title: dataBlog.title,
        slug: dataBlog.slug,
        image: dataBlog.image,
        content: dataBlog.content,
        status: dataBlog.status,
      });
    }
  }, [dataBlog]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      await updateBlog({...values, id: dataBlog.id}).unwrap();
      message.success("Cập nhật blog thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/blogs");
    } catch (error) {
      message.error("Cập nhật blog thất bại");
    }
  };

  const [form] = Form.useForm(); // Tạo một Form instance để sử dụng validate

  return (
    <>
      <Button
        onClick={showDrawer}
        icon={<EditOutlined />}
      >
      </Button>
      <Drawer
        title="Cập nhật Title"
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
                label="Title Blogs"
                rules={[{ required: true, message: "Please enter Title Blogs" }]}
              >
                <Input placeholder="Please enter Title Blogs" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug blogs"
                rules={[{ required: true, message: "Please enter Slug blogs" }]}
              >
                <Input placeholder="Please enter user Slug blogs" />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: "Please enter Image" }]}
              >
                <Input placeholder="Please enter user Image" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: "Please select a Content" }]}
              >
                <Input placeholder="Please enter user Content" />
              </Form.Item>
            </Col>
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

export default UpdateBlog;
