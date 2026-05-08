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

import { useUpdateCateMutation } from "../../../service/cate.service";

interface DataType {
  id: string;
  name: string;
  slug: string;
  status: number;
}
interface EditCateProps {
  dataCate: DataType;
}

const UpdateCategory: React.FC<EditCateProps> = ({ dataCate }) => {
  const [updateCate] = useUpdateCateMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;

  useEffect(() => {
    if (dataCate) {
      form.setFieldsValue({
        name: dataCate.name,
        slug: dataCate.slug,
        status: dataCate.status,
      });
    }
  }, [dataCate]);
  const onFinish = async (values: any) => {
    try {
      await updateCate({ ...values, id: dataCate.id });

      message.success("Cập nhật loại phim thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/listcate");
    } catch (error) {
      message.error("Cập nhật loại phim thất bại");
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
        title="Cập nhật Thể loại phim"
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
                label="Tên loại phim"
                rules={[{ required: true, message: "Vui lòng nhập tên loại phim" }]}
              >
                <Input placeholder="Vui lòng nhập tên loại phim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Tiêu đề"
                rules={[{ required: true, message: "Vui lòng nhập Tiêu đề" }]}
              >
                <Input placeholder="Vui lòng nhập Tiêu đề" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
              >
                <Select placeholder="Vui lòng nhập trạng thái">
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

export default UpdateCategory;
