import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForgorPasswordMutation } from "../../../service/signup_login.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPassword = () => {
  const [forgotPassword] = useForgorPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [email, setEmail] = useState("");

  const onSubmitHandler = async (data: { email: string }) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      const result = await forgotPassword(formData);
      if ((result as any).error) {
        toast.error((result as any).error.data.message);
        return;
      }
      toast.success("Gui email thanh cong!");
      navigate("/reset-password");

      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="bg-white h-screen w-full">
      <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Login here
                </a>
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        value={email}
                        aria-describedby="email-error"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        Email không hợp lệ!!
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
