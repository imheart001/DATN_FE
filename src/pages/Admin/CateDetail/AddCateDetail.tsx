import React, { useState } from "react";

import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAddCateDetailMutation } from "../../../service/catedetail.service";
import { useFetchCateQuery } from "../../../service/cate.service";
import { ICategorys, IFilms } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
const { Option } = Select;

const AddCateDetail: React.FC = () => {
  const [addCateDetail] = useAddCateDetailMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: cates } = useFetchCateQuery();
  const { data: films } = useFetchProductQuery();



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    try {

      await addCateDetail(values).unwrap();
      message.success("Thêm sản phẩm thành công");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/admin/category_detail");
    } catch (error) {
      message.error("Thêm sản phẩm thất bại");
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

        title="Thêm CateDetail"
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
                rules={[{ required: true, message: "Please enter user category_id" }]}
              >
                <Select placeholder="Please select a status">
                  {
                    (cates as any)?.data?.map((cate: ICategorys, index: number) => {
                      return (
                        <Option key={index} value={cate.id}>{cate.name}</Option>
                      )
                    })
                  }

                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="film_id"
                label="film_id"
                rules={[{ required: true, message: "Please enter user film_id" }]}
              >
                <Select placeholder="Please select a film_id">
                  {
                    (films as any)?.data?.map((flim: IFilms, index: number) => {
                      return (
                        <Option key={index} value={flim.id}>{flim.name}</Option>
                      )
                    })
                  }

                </Select>
              </Form.Item>
            </Col>


          </Row>
        </Form>
      </Drawer>
    </>
  );
};


export default AddCateDetail;
