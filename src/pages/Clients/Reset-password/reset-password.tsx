import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useResetPasswordMutation } from "../../../service/signup_login.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  currentPassword: yup.string().required(),
  password: yup
    .string()
    .min(4, "Password length should be at least 4 characters")
    .required("Password is required"),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .min(6, "Password length should be at least 6 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [updatePassword] = useResetPasswordMutation();

  const [formState, setFormState] = useState({
    email: "",
    currentPassword: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const onSubmitHandler = async (data: {
    email: string;
    currentPassword: string;
    password: string;
    cpassword: string;
  }) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("token", data.currentPassword);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.cpassword);
    const result = await updatePassword(formData);
    console.log(
      "🚀 ~ file: reset-password.tsx:50 ~ ResetPassword ~ result:",
      result
    );

    if ((result as any).error) {
      toast.error((result as any).error.data.message);
      return;
    }

    toast.success("dat mat khau thanh cong!");
    navigate("/login");
    reset();
  };

  return (
    <div className="h-screen w-full bg-white">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit(onSubmitHandler)}
              autoComplete="off"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((pre) => ({
                      ...pre,
                      email: e.target.value,
                    }))
                  }
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors?.email && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to
                    you
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Token
                </label>
                <input
                  type="text"
                  {...register("currentPassword")}
                  value={formState.currentPassword}
                  onChange={(e) =>
                    setFormState((pre) => ({
                      ...pre,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="mat khau moi"
                />
                {errors?.currentPassword && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors?.currentPassword?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState((pre) => ({
                      ...pre,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.currentPassword && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("cpassword")}
                  value={formState.cpassword}
                  onChange={(e) =>
                    setFormState((pre) => ({
                      ...pre,
                      cpassword: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.cpassword && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors?.cpassword?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
