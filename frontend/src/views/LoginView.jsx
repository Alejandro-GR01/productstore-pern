import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import api from "../config/axios";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import Logo from "../components/Logo";
import ErrorMessage from "../components/ErrorMessage";

const LoginView = () => {
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("AUTH_TOKEN", data);
      toast.success("User authenticated");
      reset();
       setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(String(error));
      }
    }
  };

  return (
    <div className="px-4 flex items-center justify-center min-h-dvh w-dvw">
      <div className="mx-auto card bg-base-300 card-body card-border border-primary/30 w-full max-w-xl ">
        <div className="px-2 pt-4 md:p-8 md:pb-0 flex flex-col items-stretch gap-1">
          <div className="w-fit mx-auto">
            <Logo />
          </div>
          <h2 className="text-center text-primary/90 text-lg">Login</h2>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" flex flex-col gap-4 card-body"
          >
            <div className="flex flex-col justify-stretch  gap-2">
              <label
                htmlFor="email"
                className="label text-sm font-semibold pl-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="juanperez@correo.com"
                className="p-4  input input-primary w-full "
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email don't valid",
                  },
                })}
              />
               {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
            </div>
            <div className="flex flex-col justify-stretch  gap-2">
              <label
                htmlFor="password"
                className="label text-sm font-semibold pl-4"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="p-4  input input-primary w-full "
                {...register("password", {
                  required: "Password required",
                })}
              />
               {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
              
            </div>

            <button type="submit" className={`mt-4 btn btn-primary ${errors.email || errors.password ? 'btn-disabled' : ''}`}>
              Login
            </button>

            <p className="  text-sm text-right mt-4">
              If you don't have an acount, please{" "}
              <Link
                to="/auth/register"
                className=" link link-hover font-semibold "
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
