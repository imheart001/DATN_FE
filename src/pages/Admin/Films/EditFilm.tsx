import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
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
} from "antd";

const { Option } = Select;

const EditFilm: React.FC = () => {
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
        title="Cập nhật phim"
        width={720}
        onClose={onClose}
        open={open}
        style={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Trở Về</Button>
            <Button onClick={onClose} danger type="primary">
              Cập Nhật
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên Phim"
                rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
              >
                <Input placeholder="Vui lòng nhập tên phim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: "Vui lòng nhập slug" }]}
              >
                <Input placeholder="Vui lòng nhập slug" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Ảnh"
                rules={[{ required: true, message: "Vui lòng nhập ảnh" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="vui lòng nhập ảnh"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="trailer"
                label="Trailer"
                rules={[{ required: true, message: "Vui lòng nhập Trailer" }]}
              >
                <Input placeholder="Vui lòng nhập Trailer" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Thời Lượng Phim"
                rules={[{ required: true, message: "Vui lòng nhập thời lượng phim" }]}
              >
                <Input placeholder="Vui lòng nhập thời lượng phim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Thời gian chiếu"
                rules={[
                  { required: true, message: "Vui lòng nhập thời gian chiếu" },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng Thái"
                rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
              >
                <Select placeholder="Vui lòng nhập trạng thái">
                  <Option value="1">Hoạt Động</Option>
                  <Option value="2">Chưa Hoạt Động</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô Tả"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Vui lòng nhập mô tả"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditFilm;
