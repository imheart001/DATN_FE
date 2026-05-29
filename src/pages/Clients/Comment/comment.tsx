import React, { useState } from "react";
import { Button, Form, Input, Mentions, Rate, Space, message } from "antd";
import {
  useAddCommentFilmMutation,
  useGetCommentByUserIdQuery,
} from "../../../service/commentfilm.service";

const { getMentions } = Mentions;
const { TextArea } = Input;
interface CommentFilmProps {
  dataidfilm: any;
}
const CommentFilm: React.FC<CommentFilmProps> = ({ dataidfilm }) => {
  console.log(dataidfilm);
  const [addComentFilm] = useAddCommentFilmMutation();
  const { data } = useGetCommentByUserIdQuery(`${dataidfilm}`);
  console.log(data);

  const [form] = Form.useForm();
  const [valuee, setValuee] = useState(3);
  const desc = ["rất tệ", "Không hay", "normal", "good", "Đỉnh"];
  const onFinish = async (value: any) => {
    const dataAddComment = {
      comment: value.comment,
      film_id: dataidfilm,
      star_rating: valuee,
    };
    try {
      const response = await addComentFilm(dataAddComment);
      console.log(response);

      if ((response as any).data.data) {
        message.success("Bình luận thành công");
      }
      if (
        (response as any).data.message ==
        "Mỗi khách hàng chỉ được đánh giá 1 lần"
      ) {
        message.error("Mỗi khách hàng chỉ được đánh giá 1 lần");
      } else {
        message.error("Bình luận thất bại:");
      }
    } catch (errInfo) {
      message.error("Bình luận thất bại:");
    }
  };

  return (
    <>
      <div className="p-10 bg-white rounded-lg max-w-5xl mx-auto">
        <h1 className="flex justify-start text-xl font-semibold ">
          Comment ({data?.totalReviews})
        </h1>
        {data?.allRatings.map((comment: any) => {
          return (
            <>
              <div className="flex border border-1 rounded-lg w-[70%]  items-start px-4 py-6">
                <div className="">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                    src={comment?.image ? comment?.image : ""}
                    alt="avatar"
                  />
                </div>
                <div className="w-full px-4">
                  <div className="flex justify-between items-center w-full ">
                    <div className="">
                      <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                        {comment?.name_user}
                      </h2>
                    </div>
                    <div className="flex justify-center items-center space-x-5">
                      <div className="">{comment.star}</div>
                      <svg
                        className="h-5 w-5"
                        fill="#FADB14"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="">
                      <small className="text-sm text-gray-700">22h ago</small>
                    </div>
                  </div>
                  <div className="">
                    <p className="mt-3 justify-start flex text-gray-700 text-sm">
                      Nội dung: {comment?.comment}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex text-gray-700 text-sm mr-3">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>

                      <span>12</span>
                    </div>
                    <div className="flex text-gray-700 text-sm mr-8">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>8</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <div className="">
          <Form
            form={form}
            layout="horizontal"
            className="space-y-5"
            onFinish={onFinish}
          >
            <Space>
              <Rate tooltips={desc} onChange={setValuee} value={valuee} />
              {valuee ? <span>{desc[valuee - 1]}</span> : ""}
            </Space>
            <Form.Item
              name="comment"
              label="Bình luận"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="bình luận ... " maxLength={200} />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 14, offset: 6 }}
              className="flex justify-start"
            >
              <Space wrap>
                <Button htmlType="submit" danger type="primary">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CommentFilm;
