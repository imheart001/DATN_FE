import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  message,
} from "antd";
import { useUpdateProductMutation } from "../../../service/films.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useFetchCateQuery } from "../../../service/cate.service";

interface DataType {
  key: string;
  name: string;
  slug: string;
  nameFilm: string;
  images: string;
  time: string;
  trailer: string;
  description: string;
  dateSt: Date;
  dateEnd: Date;
  limit_age: number;
  poster: string;
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
        end_date: moment(dataID.dateEnd),
        description: dataID.description,
        limit_age: dataID.limit_age,
        poster: dataID.poster,
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
  
  const validateEndDate = async (_: any, value: any) => {
    const releaseDate = form.getFieldValue("release_date");

    if (value && releaseDate && value.isBefore(releaseDate)) {
      throw new Error("Ngày kết thúc không hợp lệ");
    }
  };
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên Phim"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Tên Phim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình Ảnh"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Hình Ảnh" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="TenPhim"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="TenPhim" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="trailer"
                label="Trailer"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                ]}
              >
                <Input placeholder="Trailer" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Thời Lượng"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Thời Lượng" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="release_date"
                label="Ngày Phát Hành"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="end_date"
                label="Ngày Kết Thúc"
                rules={[
                  { required: true, message: "Trường dữ liệu bắt buộc" },
                  { validator: validateEndDate },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="limit_age"
                label="Giới hạn tuổi"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Giới hạn tuổi"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="poster"
                label="Poster"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Poster" />
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
                    message: "Trường dữ liệu bắt buộc",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Mô tả"
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
