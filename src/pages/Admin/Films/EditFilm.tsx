import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
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
  Table,
  Tag,
  message,
} from "antd";
import { useUpdateProductMutation } from "../../../service/films.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FOLDER_NAME } from "../../../configs/config";
import { uploadImageApi } from "../../../apis/upload-image.api";
import {
  useFetchReleasesByFilmQuery,
  useAddReleaseMutation,
  useDeleteReleaseMutation,
} from "../../../service/filmRelease.service";
import { compareDates } from "../../../utils";

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
        release_date: moment(dataID.dateSt), // Sử dụng thư viện moment để xử lý ngày
        end_date: moment(dataID.dateEnd),
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
      await updateProduct({ ...values, id: dataID.name, image: linkImage, poster: uploadPoster });

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
                    className="inline-block py-2 px-5 rounded-lg bg-blue-200 text-white capitalize"
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
                    className="inline-block py-2 px-5 rounded-lg bg-blue-200 text-white capitalize"
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
      message.error(error?.data?.message || "Lỗi khi tạo đợt chiếu");
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
        const isActive = compareDates(record.release_date, record.end_date);
        return <Tag color={isActive ? "green" : "default"}>{isActive ? "Đang chiếu" : "Đã kết thúc"}</Tag>;
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

  return (
    <>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontWeight: 600 }}>Đợt chiếu ({releases.length})</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          size="small"
        >
          Thêm đợt chiếu mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={releases.map((r: any, i: number) => ({ ...r, key: r.id || i }))}
        pagination={false}
        size="small"
      />

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
