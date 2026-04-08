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
} from "antd";
import { useUpdateTimeMutation } from "../../../service/time.service";

const { Option } = Select;
interface DataType {
  id: string;
  time: string;
}
interface EditTimeProps {
  dataTime: DataType;
}

const EditTime: React.FC<EditTimeProps> = ({ dataTime }) => {
  const [updateTime] = useUpdateTimeMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataTime) {
      form.setFieldsValue({
        time: dataTime.time,
      });
    }
  }, [dataTime]);
  const onFinish = async (values: any) => {
    try {
      await updateTime({ ...values, id: dataTime.id });

      message.success("Cập nhật giờ thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/time");
    } catch (error) {
      message.error("Cập nhật giờ thất bại");
    }
  };
  const [open, setOpen] = useState(false);
  console.log(dataTime);

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
        title="Cập nhật Rạp Chiếu"
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
                name="time"
                label="time"
                rules={[{ required: true, message: "Please time" }]}
              >
                <Input type="time" placeholder="Please time" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditTime;
