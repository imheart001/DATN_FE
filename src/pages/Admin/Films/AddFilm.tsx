import { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
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
  Select,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../service/films.service";
import { useFetchCateQuery } from "../../../service/cate.service";
import { ICategorys } from "../../../interface/model";
import { useAddCateDetailMutation } from "../../../service/catedetail.service";

const AddFilm: React.FC = () => {
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const [addCateDetail] = useAddCateDetailMutation();
  const { data: dataCate } = useFetchCateQuery();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const dataAddFilm = {
      name: values.name,
      slug: values.slug,
      image: values.image,
      poster: values.poster,
      trailer: values.trailer,
      time: values.time,
      release_date: values.release_date.format("YYYY-MM-DD"),
      end_date: values.end_date.format("YYYY-MM-DD"),
      limit_age: values.limit_age,
      description: values.description,
      status: 1,
    };
    try {
      const reponse = await addProduct(dataAddFilm).unwrap();
      values?.cate_id?.map(async (cate_idbyUser: any) => {
        const dataAddCateDetail = {
          film_id: reponse.data.id,
          category_id: cate_idbyUser,
        };
        await addCateDetail(dataAddCateDetail).unwrap();
      });

      message.success("Thêm sản phẩm thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/listfilm");
    } catch (error) {
      message.error("Thêm sản phẩm thất bại");
    }
  };
  // validate datetime
  const validateEndDate = async (_: any, value: any) => {
    const releaseDate = form.getFieldValue("release_date");

    if (value && releaseDate && value.isBefore(releaseDate)) {
      throw new Error("Ngày kết thúc không hợp lệ");
    }
  };

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
        title="Thêm phim"
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
            <Button onClick={onClose}>Trở Về</Button>

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
              Thêm Mới
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
          <Form.Item name="cate_id" label="Danh mục">
            <Checkbox.Group>
              <Row gutter={100} key={"danhmuc"}>
                {(dataCate as any)?.data.map((cate: any) => (
                  <Col key={cate.id} span={8}>
                    <Checkbox value={cate.id} style={{ lineHeight: "32px" }}>
                      {cate.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
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

export default AddFilm;
