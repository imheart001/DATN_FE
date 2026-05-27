import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateToken,
  setUserId,
  setRoleAuth,
  setIdCinama,
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

        dispatch(setIdCinama((response as any).data.user.id_cinema));
        localStorage.setItem("authToken", (response as any).data.token);
        localStorage.setItem("Role", (response as any).data.user.role);
        localStorage.setItem(
          "user",
          JSON.stringify((response as any)?.data.user)
        );

        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Sai tên tài khoản hoặc mật khẩu không đúng");
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
              <Input.Password
                min={6}
                placeholder="Mật khẩu"
                className="w-full"
              />
            </Form.Item>
            <Button
              // onClick={addUser}
              htmlType="submit"
              className="w-full mb-2 bg-teal-400 shadow-lg hover:text-black text-white "
            >
              ĐĂNG KÝ
            </Button>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
