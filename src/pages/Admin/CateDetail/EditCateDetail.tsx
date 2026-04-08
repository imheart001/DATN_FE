import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Button, Col, Drawer, Form, Row, Select, Space, message } from "antd";

import { useUpdateCateDetailMutation } from "../../../service/catedetail.service";
import { IFilms } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchCateQuery } from "../../../service/cate.service";
const { Option } = Select;

interface DataType {
  id: string;
  category_id: string;
  film_id: string;
}
interface EditCateDetailProps {
  dataCateDetail: DataType;
}

const UpdateCategory: React.FC<EditCateDetailProps> = ({ dataCateDetail }) => {
  const [updateCateDetail] = useUpdateCateDetailMutation();
  const { data: cates } = useFetchCateQuery();
  const { data: films } = useFetchProductQuery();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log(dataCateDetail);

  useEffect(() => {
    if (dataCateDetail) {
      form.setFieldsValue({
        category_id: dataCateDetail.category_id,
        film_id: dataCateDetail.film_id,
      });
    }
  }, [dataCateDetail]);
  const onFinish = async (values: any) => {
    try {
      await updateCateDetail({ ...values, id: dataCateDetail.id });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/category_detail");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };
  const [open, setOpen] = useState(false);
  console.log(dataCateDetail);

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
        title="Update CateDetail"
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
                name="category_id"
                label="category_id"
                rules={[
                  { required: true, message: "Please enter user category_id" },
                ]}
              >
                <Select placeholder="Please select a status">
                  {(cates as any)?.data?.map((cate: IFilms, index: number) => {
                    return (
                      <Option key={index} value={cate.id}>
                        {cate.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="film_id"
                label="film_id"
                rules={[
                  { required: true, message: "Please enter user film_id" },
                ]}
              >
                <Select placeholder="Please select a film_id">
                  {(films as any)?.data?.map((flim: IFilms, index: number) => {
                    return (
                      <Option key={index} value={flim.id}>
                        {flim.name}
                      </Option>
                    );
                  })}
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
