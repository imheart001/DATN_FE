import React from 'react'

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
import { useAddBlogMutation } from '../../../service/blog.service';
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

  const onFinish = async (values: any) => {
    try {
      await addBlog(values).unwrap();
      message.success("Thêm blog thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/blogs");
    } catch (error) {
      message.error("Thêm blog thất bại");
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
        title="Thêm Title"
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

export default AddBlog;
