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
import type { Product, ProductData } from "../types";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect } from "react";
import ProductImage from "../components/ProductImage";

const CreateProductView = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const initialValues: ProductData = {
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
    watch
  } = useForm({ defaultValues: initialValues });

  const imageUrl = watch('imageUrl')

  const handleCreateProduct = async (e: ProductData) => {
    createProduct.mutate(e, {
      onSuccess: () => {
        toast.success("Product created succesfully.");
        reset();
        navigate("/");
      },
      onError: () => {
        toast.error("Failed to create product. Try again.");
      },
    });
  };



  return (
    <div className="max-w-lg mx-auto  ">
      <Link to="/" className="btn  btn-sm gap-1 mb-4">
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
            className="mt-4 flex flex-col items-center gap-6 "
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
            {errors.title && (
              <ErrorMessage className="-mt-4 ml-4">
                {errors.title.message}
              </ErrorMessage>
            )}
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
            {errors.imageUrl && (
              <ErrorMessage className="-mt-4 ml-4">
                {errors.imageUrl.message}
              </ErrorMessage>
            )}
           

              {imageUrl && isValidURL(imageUrl)&&(
              <ProductImage
                source={imageUrl}
                className="max-h-40 aspect-video object-contain rounded-box"
                alt="Preview"
                placeholderImg="/image-broken.png"
              />
            )}

            <div className="form-control w-full  ">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-primary/20 focus-within:outline-2 outline-offset-2 outline-primary/50 ">
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
            {errors.description && (
              <ErrorMessage className="-mt-4 ml-4">
                {errors.description.message}
              </ErrorMessage>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductView;
