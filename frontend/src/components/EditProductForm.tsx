import { FileTextIcon, ImageIcon, TypeIcon } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import ProductImage from "./ProductImage";
import { isValidURL } from "../utils";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import type { ProductData, Product } from "../types";


type EditProductFormProps = {
  watch: UseFormWatch<ProductData | Product>;
  register: UseFormRegister<ProductData | Product>;
  
  onSubmit:  (e?: React.BaseSyntheticEvent<object, any, any>) => Promise<void>;
  isPending: boolean;
  errors: FieldErrors<ProductData>;
  isCreateForm? : boolean
};

const EditProductForm = ({
  onSubmit,
  isPending,
  register,
  errors,
  watch,
  isCreateForm = false,
  
}: EditProductFormProps) => {
  const imageUrl = watch("imageUrl");
  return (
    <form
      noValidate
      onSubmit={onSubmit}
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
          name="imageUrl"
          id="imageUrl"
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

      {imageUrl && isValidURL(imageUrl) && (
        <ProductImage
          source={imageUrl}
          className="max-h-40   rounded-box"
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
                val.length > 20 || "Description must be over 20 characters",
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
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-spinner" />
        ) : !isCreateForm ? ("Update Product"):  (
          "Create Product"
        )}
      </button>
    </form>
  );
};

export default EditProductForm;
