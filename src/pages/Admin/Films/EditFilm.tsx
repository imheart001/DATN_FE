import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  message,
} from "antd";
import { useUpdateProductMutation } from "../../../service/films.service";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FOLDER_NAME } from "../../../configs/config";
import { uploadImageApi } from "../../../apis/upload-image.api";
import {
  useFetchReleasesByFilmQuery,
  useAddReleaseMutation,
  useDeleteReleaseMutation,
  useRevenueByReleaseMutation,
} from "../../../service/filmRelease.service";
import { formatter } from "../../../utils/formatCurrency";
import { compareDates, compareReleaseDate } from "../../../utils";

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
  const [linkImage, setLinkImage] = useState<string | null>(null);

  useEffect(() => {
    if (dataID) {
      form.setFieldsValue({
        image: dataID.images,
        slug: dataID.slug,
        name: dataID.nameFilm,
        trailer: dataID.trailer,
        time: dataID.time,
        release_date: dayjs(dataID.dateSt), // Sử dụng thư viện dayjs để xử lý ngày
        end_date: dayjs(dataID.dateEnd),
        description: dataID.description,
        limit_age: dataID.limit_age,
        poster: dataID.poster,
      });
      setLinkImage(dataID.images);
      setUploadPoster(dataID.poster)
    }
  }, [dataID]);
  const onFinish = async (values: any) => {
    try {
      values.release_date = values.release_date.format("YYYY-MM-DD");
      values.end_date = values.end_date.format("YYYY-MM-DD");
      await updateProduct({ ...values, id: dataID.name, image: linkImage, poster: uploadPoster }).unwrap();

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/listfilm");
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.data?.error?.name?.[0] || error?.data?.message || "Cập nhật sản phẩm thất bại";
      message.error(errMsg);
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

  const [uploadImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPoster, setIsLoadingPoster] = useState(false);
  const [uploadPoster, setUploadPoster] = useState<string | null>(null);

  const handleUpdateImage = async (e: any) => {
    setIsLoading(true);
    try {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("upload_preset", "da_an_tot_nghiep");
      formData.append("folder", FOLDER_NAME);
      for (const file of files) {
        formData.append("file", file);
        const response = await uploadImageApi(formData);
        if (response) {
          setLinkImage(response.url);
          setIsLoading(false);
        }
      }
    } catch (error) {
      message.error("loi");
    }
  };

  const handleUpdateImagePoster = async (e: any) => {
    // setIsLoadingPoster(true);
    try {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("upload_preset", "da_an_tot_nghiep");
      formData.append("folder", FOLDER_NAME);
      for (const file of files) {
        formData.append("file", file);
        const response = await uploadImageApi(formData);
        setUploadPoster(response.url);
        setIsLoadingPoster(false);
      }
    } catch (error) {
      setIsLoadingPoster(false);
      message.error("loi");
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
        title="Cập nhật Phim"
        width={720}
        onClose={onClose}
        open={open}
        style={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose} style={{ color: "#000000", borderColor: "#d9d9d9" }}>Cancel</Button>
            <Button
              danger
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", color: "#ffffff" }}
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
            {/* <Col span={12}>
              <Form.Item
                name="image"
                label="Hình Ảnh"
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
              >
                <Input placeholder="Hình Ảnh" />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item name="image" label="Hình Ảnh">
                {/* <Input placeholder="Hình Ảnh" /> */}

                <div className="flex gap-1 items-center justify-between">
                  <input
                    type="file"
                    value={uploadImage}
                    className="flex-1 !hidden"
                    onChange={(e) => handleUpdateImage(e)}
                    id="update-image"
                  />
                  <label
                    htmlFor="update-image"
                    className="inline-block py-2 px-5 rounded-lg bg-blue-600 text-white capitalize cursor-pointer hover:bg-blue-700 transition"
                  >
                    upload image
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {linkImage && !isLoading && (
                <img
                  src={linkImage}
                  alt={linkImage}
                  className="h-[200px] w-full border shadow rounded-lg object-cover"
                />
              )}
              {isLoading && (
                <div className="h-[200px] w-full border shadow rounded-lg flex justify-center items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-500 border-t-2 border-t-white animate-spin"></div>
                </div>
              )}
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
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
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
                rules={[{ required: true, message: "Trường dữ liệu bắt buộc" }]}
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
                <InputNumber className="w-full" placeholder="Giới hạn tuổi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className="w-full" label="Poster">
                <div className="flex gap-1 items-center justify-between">
                  <input
                    type="file"
                    value={uploadImage}
                    className="flex-1 !hidden"
                    onChange={(e) => handleUpdateImagePoster(e)}
                    id="update-image-poster"
                  />
                  <label
                    htmlFor="update-image-poster"
                    className="inline-block py-2 px-5 rounded-lg bg-blue-600 text-white capitalize cursor-pointer hover:bg-blue-700 transition"
                  >
                    upload image
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {uploadPoster && !isLoadingPoster && (
                <img
                  src={uploadPoster ? uploadPoster : ""}
                  alt={uploadPoster ? uploadPoster : ""}
                  className="h-[200px] w-full border shadow rounded-lg object-cover"
                />
              )}
              {isLoadingPoster && (
                <div className="h-[200px] w-full border shadow rounded-lg flex justify-center items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-500 border-t-2 border-t-white animate-spin"></div>
                </div>
              )}
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
                <Input.TextArea rows={4} placeholder="Mô tả" />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* Film Releases Section */}
        <FilmReleasesSection filmId={dataID?.name} />
      </Drawer>
    </>
  );
};

/**
 * Sub-component: Manage film releases (re-release periods)
 */
const FilmReleasesSection: React.FC<{ filmId: string }> = ({ filmId }) => {
  const { data: releasesData, refetch } = useFetchReleasesByFilmQuery(filmId, {
    skip: !filmId,
  });
  const [addRelease, { isLoading: isAdding }] = useAddReleaseMutation();
  const [deleteRelease] = useDeleteReleaseMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [releaseForm] = Form.useForm();

  const releases = releasesData?.data ?? [];

  const handleAddRelease = async () => {
    try {
      const values = await releaseForm.validateFields();
      await addRelease({
        filmId,
        body: {
          release_date: values.release_date.format("YYYY-MM-DD"),
          end_date: values.end_date.format("YYYY-MM-DD"),
          label: values.label || "Khởi chiếu lại",
          note: values.note,
        },
      }).unwrap();
      message.success("Đợt chiếu mới đã được tạo");
      setIsModalOpen(false);
      releaseForm.resetFields();
      refetch();
    } catch (error: any) {
      let errMsg = "Lỗi khi tạo đợt chiếu";
      if (error?.data?.errors) {
        const errorKeys = Object.keys(error.data.errors);
        if (errorKeys.length > 0) {
          const firstKey = errorKeys[0];
          const firstErrors = error.data.errors[firstKey];
          if (Array.isArray(firstErrors) && firstErrors.length > 0) {
            errMsg = firstErrors[0];
          } else if (typeof firstErrors === 'string') {
            errMsg = firstErrors;
          }
        }
      } else if (error?.data?.message) {
        errMsg = error.data.message;
      }
      message.error(errMsg);
    }
  };

  const handleDeleteRelease = async (releaseId: string) => {
    try {
      await deleteRelease({ filmId, releaseId }).unwrap();
      message.success("Đã xóa đợt chiếu");
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || "Lỗi khi xóa đợt chiếu");
    }
  };

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text: string) => <Tag color="blue">{text || "N/A"}</Tag>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "release_date",
      key: "release_date",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_: any, record: any) => {
        const isUpcoming = compareReleaseDate(record.release_date);
        const isActive = compareDates(record.release_date, record.end_date);

        if (isUpcoming && !isActive) {
          return <Tag color="blue">Sắp chiếu</Tag>;
        } else if (isActive) {
          return <Tag color="green">Đang chiếu</Tag>;
        } else {
          return <Tag color="default">Đã kết thúc</Tag>;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: any) =>
        releases.length > 1 ? (
          <Popconfirm
            title="Xóa đợt chiếu này?"
            onConfirm={() => handleDeleteRelease(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  // Revenue by release
  const [fetchRevenue, { isLoading: isLoadingRevenue }] = useRevenueByReleaseMutation();
  const [revenueData, setRevenueData] = useState<any>(null);

  const handleLoadRevenue = async () => {
    try {
      const res = await fetchRevenue({ film_id: filmId }).unwrap();
      setRevenueData(res);
    } catch (error: any) {
      message.error(error?.data?.message || "Lỗi khi tải doanh thu");
    }
  };

  return (
    <>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontWeight: 600 }}>Đợt chiếu ({releases.length})</h3>
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", color: "#ffffff" }}
            onClick={handleLoadRevenue}
            loading={isLoadingRevenue}
            size="small"
          >
            Xem doanh thu
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#1677ff", borderColor: "#1677ff", color: "#ffffff" }}
            onClick={() => setIsModalOpen(true)}
            size="small"
          >
            Thêm đợt chiếu mới
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={releases.map((r: any, i: number) => ({ ...r, key: r.id || i }))}
        pagination={false}
        size="small"
      />

      {/* Revenue by Release Section */}
      {isLoadingRevenue && (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin tip="Đang tải doanh thu..." />
        </div>
      )}
      {revenueData && revenueData.releases && (
        <>
          <Divider dashed />
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontWeight: 600 }}>
              Doanh thu theo đợt chiếu
              <Tag color="gold" style={{ marginLeft: 8, fontSize: 13 }}>
                Tổng: {formatter(revenueData.grand_total || 0)}
              </Tag>
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {revenueData.releases.map((rel: any) => (
              <Card
                key={rel.release_id}
                size="small"
                title={
                  <span>
                    <Tag color="blue">{rel.label || "N/A"}</Tag>
                    {new Date(rel.release_date).toLocaleDateString("vi-VN")} → {new Date(rel.end_date).toLocaleDateString("vi-VN")}
                  </span>
                }
                style={{ borderLeft: "3px solid #1677ff" }}
              >
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic
                      title="Doanh thu vé"
                      value={rel.ticket_revenue || 0}
                      formatter={(val) => formatter(Number(val))}
                      valueStyle={{ color: "#3f8600", fontSize: 15 }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Doanh thu F&B"
                      value={rel.food_revenue || 0}
                      formatter={(val) => formatter(Number(val))}
                      valueStyle={{ color: "#1677ff", fontSize: 15 }}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="Tổng doanh thu"
                      value={rel.total_revenue || 0}
                      formatter={(val) => formatter(Number(val))}
                      valueStyle={{ color: "#cf1322", fontSize: 15, fontWeight: 600 }}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="Vé bán ra"
                      value={rel.ticket_count || 0}
                      suffix="vé"
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="Vé hoàn"
                      value={rel.refund_count || 0}
                      suffix="vé"
                      valueStyle={{ color: rel.refund_count > 0 ? "#cf1322" : "#8c8c8c", fontSize: 15 }}
                    />
                  </Col>
                </Row>
                {rel.note && (
                  <div style={{ marginTop: 8, color: "#8c8c8c", fontSize: 12 }}>
                    {rel.note}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      <Modal
        title="Thêm đợt chiếu mới (Re-release)"
        open={isModalOpen}
        onOk={handleAddRelease}
        onCancel={() => {
          setIsModalOpen(false);
          releaseForm.resetFields();
        }}
        confirmLoading={isAdding}
        okText="Tạo đợt chiếu"
        cancelText="Hủy"
        okButtonProps={{
          style: { backgroundColor: "#1677ff", borderColor: "#1677ff", color: "#ffffff" }
        }}
        cancelButtonProps={{
          style: { color: "#000000", borderColor: "#d9d9d9" }
        }}
      >
        <Form form={releaseForm} layout="vertical">
          <Form.Item
            name="release_date"
            label="Ngày bắt đầu chiếu"
            rules={[{ required: true, message: "Bắt buộc" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="end_date"
            label="Ngày kết thúc chiếu"
            rules={[{ required: true, message: "Bắt buộc" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="label" label="Nhãn">
            <Input placeholder="Ví dụ: Khởi chiếu lại, Special Screening" />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={2} placeholder="Ghi chú tùy chọn" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditFilm;
