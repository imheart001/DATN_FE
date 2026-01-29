import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
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
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import { useUpdateShowTimeMutation } from "../../../service/show.service";
import { useNavigate } from "react-router-dom";
import { IFilms, ITime } from "../../../interface/model";

interface DataType {
    id: string,
    date: Date,
    film_id: string,
    time_id: string,
    room_id: string
}
interface EditShowProps {
    dataShow: DataType;
}
const EditShow: React.FC<EditShowProps> = ({ dataShow }) => {
    const [updateShow] = useUpdateShowTimeMutation();
    const [open, setOpen] = useState(false);
    const { data: films } = useFetchProductQuery();
    const { data: times } = useFetchTimeQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Option } = Select;
    console.log(dataShow);

    useEffect(() => {
        if (dataShow) {
            form.setFieldsValue({
                date: dataShow.date,
                film_id: dataShow.film_id,
                time_id: dataShow.time_id,
                room_id: dataShow.room_id
            });
        }
    }, [dataShow]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        try {
            await updateShow({ ...values, id: dataShow.id });
            message.success("Thêm sản phẩm thành công");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            navigate("/admin/show");
        } catch (error) {
            message.error("Thêm sản phẩm thất bại");
        }
    };
   

    return (
        <>
            <Button onClick={showDrawer}>
                <div className="flex ">
                    <EditOutlined />
                </div>
            </Button>
            <Drawer
                title="Cập Nhật Rạp Chiếu"
                width={720}
                onClose={onClose}
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
                            Cập Nhật
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

export default EditShow