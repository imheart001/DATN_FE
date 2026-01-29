import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Row,
    Select,
    Space,
    message,
} from "antd";
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { useAddShowTimeMutation } from "../../../service/show.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import { IFilms, ITime } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
const AddShow: React.FC = () => {
    const [addShow] = useAddShowTimeMutation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { data: films } = useFetchProductQuery();
    const { data: times } = useFetchTimeQuery();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        console.log(values);

        try {
            values.date = values.date.format("YYYY-MM-DD");
            await addShow(values).unwrap();
            message.success("Thêm sản phẩm thành công");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            navigate("/admin/show");
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
                title="Thêm Rạp Chiếu"
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
                        <Button onClick={onClose}>Hủy</Button>

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
                <Form
                    form={form}
                    layout="vertical"
                    hideRequiredMark
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="film_id"
                                label="Phim"
                                rules={[{ required: true, message: "Vui lòng Chọn Phim" }]}
                            >
                                <Select placeholder="Vui lòng Chọn Phim">
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (films as any)?.data?.map((time: IFilms, index: number) => {
                                            return (<Option key={index} value={time.id}> {time.name} </Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="time_id"
                                label="Thời Gian"
                                rules={[{ required: true, message: "Vui lòng Chọn Thời Gian" }]}
                            >
                                <Select placeholder="Vui lòng Chọn Thời Gian">
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (times as any)?.data?.map((time: ITime, index: number) => {
                                            return (<Option key={index} value={time.id}> {time.time} </Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Ngày Chiếu"
                                rules={[
                                    { required: true, message: "Please choose the release date" },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="room_id"
                                label="Phòng Chiếu"
                                rules={[{ required: true, message: "Vui Lòng Chọn Phòng Chiếu" }]}
                            >
                                <Select placeholder="Vui Lòng Chọn Phòng Chiếu">
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
export default AddShow