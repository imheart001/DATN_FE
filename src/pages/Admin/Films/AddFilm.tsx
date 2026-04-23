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
  const { Option } = Select;
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
  console.log(dataCate);
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
    console.log(values);
    
    try {
      // values.release_date = values.release_date.format("YYYY-MM-DD");
      // values.end_date = values.end_date.format("YYYY-MM-DD");
      const reponse = await addProduct(dataAddFilm).unwrap();
      console.log(reponse);
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

  // Tạo một Form instance để sử dụng validate

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
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
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
            <Col span={6}>
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
            <Col span={6}>
              <Form.Item
                name="end_date"
                label="End Date"
                rules={[
                  { required: true, message: "Please choose the End date" },
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
                rules={[{ required: true, message: "Please select a tuổi" }]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Please enter user tuổi"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="poster"
                label="Poster"
                rules={[{ required: true, message: "Please select a poster" }]}
              >
                <Input placeholder="Please enter user poster" />
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

export default AddFilm;
