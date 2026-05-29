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
  // Select,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

import { useAddVoucherMutation } from "../../../service/voucher.service";
// const { Option } = Select;
import { DatePicker } from "antd";

const AddVoucher: React.FC = () => {
  const [addVoucher] = useAddVoucherMutation();
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
      values.start_time = values.start_time.format("YYYY-MM-DD HH:mm:ss");
      values.end_time = values.end_time.format("YYYY-MM-DD HH:mm:ss");
      await addVoucher(values).unwrap();
      message.success("Thêm Voucher thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/vouchers");
    } catch (error) {
      message.error("Thêm Voucher thất bại");
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
        title="Thêm Voucher"
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
                name="code"
                label="Mã voucher"
                rules={[{ required: true, message: "Please Mã voucher" }]}
              >
                <Input placeholder="Please Mã voucher" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price_voucher"
                label="Price"
                rules={[{ required: true, message: "Please enter Price" }]}
              >
                <Input placeholder="Please enter Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="limit"
                label="Loại khuyến mãi"
                rules={[{ required: true, message: "Please Loại khuyến mãi" }]}
              >
                <Select>
                  <Select.Option value="1">Trực tiếp</Select.Option>
                  <Select.Option value="2">Theo %</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="usage_limit"
                label="Số lượng ban đầu"
                rules={[{ required: true, message: "Please Số lượng ban đầu" }]}
              >
                <Input placeholder="Please enter Số lượng ban đầu" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minimum_amount"
                label="Áp dụng cho đơn từ ?"
                rules={[{ required: true, message: "Please Max Sale Price" }]}
              >
                <Input placeholder="Please Max Sale Price" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="percent"
                label="Số % giảm"
                rules={[{ required: true, message: "Please Số % giảm" }]}
              >
                <Input placeholder="Please enter Số % giảm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start_time"
                label="Thời gian bắt đầu"
                rules={[
                  { required: true, message: "Please Thời gian bắt đầu" },
                ]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="end_time"
                label="Thời gian kết thúc"
                rules={[
                  { required: true, message: "Please Thời gian kết thúc" },
                ]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddVoucher;
