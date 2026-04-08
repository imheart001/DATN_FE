import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateToken,
  setUserId,
  setRoleAuth,
} from "../../../components/CinemaSlice/authSlice";
import { message } from "antd";
import {
  useAddUserMutation,
  useLoginUserMutation,
} from "../../../service/signup_login.service";
type FieldType = {
  name?: string;
  password?: string;
};
const Login = () => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [changeisForm, setChangeisForm] = useState(false);
  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();

  const onHandleChangeForm = () => {
    setChangeisForm(!changeisForm);
  };

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState(""); // Login form state
  const [loginPassword, setLoginPassword] = useState("");
  const [onAdd] = useAddUserMutation();

  const addUser = async (values: any) => {
    const userNew: any = {
      name: values.name,
      email: values.registerEmail,
      phone: values.phone,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      password: values.password,
    };
    try {
      const response = await onAdd(userNew);

      if ((response as any).data) {
        message.success("Đăng kí thành công");

        setTimeout(() => {
          setChangeisForm(false);
        }, 2000);
      } else {
        message.error(`${(response as any)?.error?.data?.errors?.email[0]}`);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      if ((response as any)?.data && (response as any).data.token) {
        dispatch(updateToken((response as any).data.token));
        // Update the token in localStorage
        dispatch(setUserId((response as any).data.user.id));
        dispatch(setRoleAuth((response as any).data.user.role));
        localStorage.setItem("authToken", (response as any).data.token);
        localStorage.setItem(
          "user",
          JSON.stringify((response as any)?.data.user)
        );

        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Đăng nhập không thành công");
      }
    } catch (error) {
      alert(`Đã xảy ra lỗi: ${error}`);
    }
  };

  return (
    <section className="flex justify-center items-center flex-col font-poppins overflow-hidden h-screen">
      <div
        className={`${changeisForm ? "right-panel-active" : ""} container`}
        id="container"
      >
        <div className="form-container register-container">
          <Form
            className="bg-white flex items-center justify-center flex-col px-10 h-full text-center"
            initialValues={{ remember: true }}
            onFinish={addUser}
            // name="validateOnly"
            autoComplete="off"

            // layout="vertical"
          >
            <h1 className="text-3xl font-mono mt-14 mb-6 p-4 border-b-2 w-full border-b-emerald-400 font-bold m-0  tracking-tighter">
              Đăng Ký
            </h1>
            <Form.Item
              className="w-full"
              name="name"
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng Nhập Tên" }]}
            >
              <Input placeholder="Tên" className="w-full" />
            </Form.Item>
            {/* <Form.Item
              name="Tên"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item> */}
            <Form.Item
              className="w-full"
              name="registerEmail"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ email" className="w-full" />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng số điện thoại!",
                  whitespace: true,
                },
              ]}
            >
              <Input className="w-full" placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="date_of_birth"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng Ngày sinh!",
                  // whitespace: true,
                },
              ]}
            >
              <DatePicker placeholder="Ngày sinh" className="w-full" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mật khẩu"
              name="password"
              className="w-full"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" className="w-full" />
            </Form.Item>
            <Button
              // onClick={addUser}
              htmlType="submit"
              className="w-full mb-2 bg-teal-400 shadow-lg hover:text-black text-white "
            >
              ĐĂNG KÝ
            </Button>
            <span>hoặc</span>
            <div className="social-container">
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </Link>
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </Link>
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
            </div>
          </Form>
        </div>

        {/* ///đang nhap */}
        <div className="form-container login-container">
          <Form
            name="normal_login"
            layout="vertical"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 25 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="bg-white login-form flex items-center justify-center flex-col px-10 h-full "
          >
            <h1 className="text-3xl font-bold m-0 mb-8 tracking-tighter">
              Đăng nhập
            </h1>
            <Form.Item
              name="loginEmail"
              className="w-full"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                className="w-full"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="loginPassword"
              className="w-full"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                className="w-full"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item className="w-full justify-between flex">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>

              <Link
                className="login-form-forgot text-[#1677ff]"
                to={`/forgot-password`}
              >
                Quên mật khẩu
              </Link>
            </Form.Item>

            <Form.Item className="w-full">
              <Button
                danger
                type="primary"
                htmlType="submit"
                className="login-form-button w-full "
              >
                Đăng nhập
              </Button>
              Or{" "}
              <Link to={"#"} className="text-[#1677ff]">
                Đăng kí ngay!
              </Link>
            </Form.Item>
            <span>or use your account</span>
            <div className="social-container">
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </Link>
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </Link>
              <Link to={"#"} className="social">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
            </div>
          </Form>
        </div>

        <div className="overlay-container bg-[url(/image.gif/)]">
          <div className="overlay ">
            <div className="overlay-panel overlay-left">
              <h1 className="title leading-10 text-[45px] m-0 shadow-slate-600">
                Hi !<br />
              </h1>
              <p className="my-10">
                Nếu bạn có tài khoản, hãy đăng nhập tại đây
              </p>
              <button
                onClick={onHandleChangeForm}
                className={`relative hover:tracking-widest active:scale-95 focus:outline-none ghost rounded-3xl border border-[#4bb6b7] bg-[#4bb6b7] text-white  font-semibold m-[10px] px-20 py-2 tracking-wider  transition duration-300 ease-in-out 
                `}
                id="login"
              >
                Đăng nhập
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-short lni lni-arrow-left login"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg> */}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title leading-10 text-[45px] m-0 shadow-slate-600">
                Hãy bắt đầu hành trình của bạn ngay bây giờ
              </h1>
              <p className="my-10">
                nếu bạn chưa có tài khoản, hãy tham gia cùng chúng tôi và bắt
                đầu hành trình của mình.
              </p>
              <button
                onClick={onHandleChangeForm}
                className={`relative hover:tracking-widest active:scale-95 focus:outline-none ghost rounded-3xl border border-[#4bb6b7] bg-[#4bb6b7] text-white  font-semibold m-[10px] px-20 py-2 tracking-wider  transition duration-300 ease-in-out `}
                id="register"
              >
                Đăng ký
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right-short lni lni-arrow-right register"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  />
                </svg> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
