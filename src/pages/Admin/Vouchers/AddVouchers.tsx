import { useState } from "react";

import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  // Select,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

import { useAddVoucherMutation } from "../../../service/voucher.service";
import { getValidationErrorMessage } from "../../../utils";
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
      message.error(getValidationErrorMessage(error, "Thêm Voucher thất bại"));
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
                label="Giá trị giảm"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  { type: "number", message: "Giá trị giảm phải là số" },
                  {
                    validator: (_, value) => {
                      if (value !== undefined && value !== null) {
                        if (value < 0) {
                          return Promise.reject("Giá trị giảm không thể là số âm");
                        }
                        if (value > 10000000) {
                          return Promise.reject("Giá trị giảm không thể vượt quá 10.000.000 Vn₫");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber placeholder="Giá trị giảm" style={{ width: "100%" }} />
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
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  { type: "number", message: "Số lượng phải là số" },
                  {
                    validator: (_, value) => {
                      if (value !== undefined && value !== null) {
                        if (value < 0) {
                          return Promise.reject("Số lượng không thể là số âm");
                        }
                        if (value > 1000000) {
                          return Promise.reject("Số lượng không thể vượt quá 1.000.000");
                        }
                        if (!Number.isInteger(value)) {
                          return Promise.reject("Số lượng phải là số nguyên");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber placeholder="Số lượng ban đầu" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minimum_amount"
                label="Áp dụng cho đơn từ ?"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  { type: "number", message: "Giá trị đơn hàng phải là số" },
                  {
                    validator: (_, value) => {
                      if (value !== undefined && value !== null) {
                        if (value < 0) {
                          return Promise.reject("Giá trị không thể là số âm");
                        }
                        if (value > 100000000) {
                          return Promise.reject("Giá trị tối đa là 100.000.000 Vn₫");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber placeholder="Áp dụng cho đơn từ" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="percent"
                label="Số % giảm"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  { type: "number", message: "Số % giảm phải là số" },
                  {
                    validator: (_, value) => {
                      if (value !== undefined && value !== null) {
                        if (value < 0 || value > 100) {
                          return Promise.reject("Phần trăm giảm phải từ 0% đến 100%");
                        }
                        if (!Number.isInteger(value)) {
                          return Promise.reject("Phần trăm phải là số nguyên");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber placeholder="Số % giảm" style={{ width: "100%" }} />
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
