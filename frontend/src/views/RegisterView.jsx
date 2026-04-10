import { Link, useNavigate } from "react-router";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";

const RegisterView = ({refetch}) => {
  const navigate = useNavigate();
  const initialvalues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialvalues });

  const password = watch("password");

  const handleRegister = async (formData) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      localStorage.setItem("AUTH_TOKEN", data);
      toast.success("User created");
      reset();
      refetch();
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
          <h2 className="text-center text-primary/90 text-lg">Register</h2>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className=" flex flex-col gap-4 card-body"
          >
            <div className="flex flex-col justify-stretch  gap-2">
              <label
                htmlFor="name"
                className="label text-sm font-semibold pl-4"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Juan Perez"
                className="p-4  input input-primary w-full "
                {...register("name", {
                  required: "Name required",
                })}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>
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
                  minLength: {
                    value: 8,
                    message: "Password must be over 8 characters",
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
            <div className="flex flex-col justify-stretch  gap-2">
              <label
                htmlFor="rep-password"
                className="label text-sm font-semibold pl-4"
              >
                Repeat Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                className="p-4  input input-primary w-full "
                {...register("password_confirmation", {
                  required: "Password confirmation required",
                  validate: (val) =>
                    val === password || "The paswords must be equals",
                })}
              />
              {errors.password_confirmation && (
                <ErrorMessage>
                  {errors.password_confirmation.message}
                </ErrorMessage>
              )}
            </div>
            <button type="submit" className="mt-4 btn btn-primary ">
              Create acount
            </button>

            <p className=" text-sm text-right mt-4">
              If you have an acount, please{" "}
              <Link
                to="/auth/login"
                className=" link link-hover font-semibold "
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
