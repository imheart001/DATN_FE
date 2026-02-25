import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import {
  useUpdateProductMutation,
} from "../../../service/films.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Option } = Select;
interface DataType {
  key: string;
  name: string;
  slug: string;
  nameFilm: string;
  images: string;
  time: string;
  trailer: string;
  status: string;
  description: string;
  dateSt: Date;
  dateEnd: Date;
  tags: string[];
}
interface EditFilmProps {
  dataID: DataType;
}

const EditFilm: React.FC<EditFilmProps> = ({ dataID }) => {
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataID) {
      form.setFieldsValue({
        image: dataID.images,
        slug: dataID.slug,
        name: dataID.nameFilm,
        trailer: dataID.trailer,
        time: dataID.time,
        release_date: moment(dataID.dateSt), // Sử dụng thư viện moment để xử lý ngày
        end_date:moment(dataID.dateEnd),
        status: dataID.status,
        description: dataID.description,
      });
    }
  }, [dataID]);
  const onFinish = async (values: any) => {
    try {
      values.release_date = values.release_date.format("YYYY-MM-DD");
      values.end_date = values.end_date.format("YYYY-MM-DD");
      await updateProduct({ ...values, id: dataID.name });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/listfilm");
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
        title="Cập nhật Phim"
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
                label="Name"
                rules={[{ required: true, message: "Please enter nameFilm" }]}
              >
                <Input placeholder="Please enter nameFilm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: "Please select an image" }]}
              >
                <Input placeholder="Please enter user image" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: "Please enter slug" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="trailer"
                label="Trailer"
                rules={[
                  { required: true, message: "Please choose the trailer" },
                ]}
              >
                <Input placeholder="Please enter user trailer" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: "Please choose the time" }]}
              >
                <Input placeholder="Please enter user time" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="release_date"
                label="Release Date"
                rules={[
                  { required: true, message: "Please choose the release date" },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="end_date"
                label="End date"
                rules={[
                  { required: true, message: "Please choose the End date" },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
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

export default EditFilm;
