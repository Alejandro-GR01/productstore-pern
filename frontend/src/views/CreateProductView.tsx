import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { useForm } from "react-hook-form";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";
import { isValidURL } from "../utils";

const CreateProductView = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const initialValues = {
    title: "",
    description: "",
    imageUrl: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: initialValues });

  // console.log(formState)

  const handleCreateProduct = (e) => {
    console.log(e);
  };

  return (
    <div className="max-w-lg mx-auto  ">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className=" size-4" /> Back
      </Link>

      <div className="card bg-base-300 ">
        <div className="card-body">
          <h1 className="card-title">
            <SparklesIcon className="size-5 text-primary text-md" /> New Product
          </h1>

          <form
            noValidate
            onSubmit={handleSubmit(handleCreateProduct)}
            className="space-y-4 mt-4  "
          >
            <label
              htmlFor="title"
              className="w-full input input-ghost border border-primary/20 outline-primary/50 flex items-center gap-2 bg-base-200"
            >
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product title"
                className="grow"
                name="title"
                id="title"
                {...register("title", {
                  required: "Product title required",
                })}
              />
            </label>
            <label
              htmlFor="imageUrl"
              className=" w-full input  input-ghost border border-primary/20 outline-primary/50  flex items-center gap-2 bg-base-200"
            >
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Image URL"
                className="grow"
                name="title"
                id="title"
                {...register("imageUrl", {
                  required: "Image URL required",
                  validate: (val) => isValidURL(val) || "Image URL don't valid",
                })}
              />
            </label>
            {isValidURL(getValues().imageUrl) && getValues().imageUrl && (
              <img
                src={getValues().imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            <div className="form-control  ">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  {...register("description", {
                    validate: (val) =>
                      val.length > 20 ||
                      "Description must be over 20 characters",
                  })}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductView;
