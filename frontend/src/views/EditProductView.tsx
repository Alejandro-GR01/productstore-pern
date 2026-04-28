import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { ProductData } from "../types";
import { useForm } from "react-hook-form";
import useUserSinc from "../hooks/useUserSinc";

import {
  ArrowLeftIcon,
  SaveIcon,

} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import EditProductForm from "../components/EditProductForm";

const EditProductView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isLoading: isLoadingUser } = useUserSinc();
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  const initialValues: ProductData = product || ({} as ProductData);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("imageUrl", product.imageUrl);
    }
  }, [product, isLoading]);

  if (isLoading || isLoadingUser) {
    return <LoadingSpinner />;
  } else if (!product || !user || product.userID !== user.id) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not found" : "Access denied"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdate = async (productData: ProductData) => {
    updateProduct.mutate(
      { id, productData },
      {
        onSuccess: () => {
          toast.success("Product updated succesfully.");
          queryClient.setQueryData(["product", id], () => ({
            ...productData,
          }));
          queryClient.invalidateQueries({
            queryKey: ["products", "my_products"],
          });

          queryClient.invalidateQueries({ queryKey: ["products"] });

          navigate("/profile");
        },
        onError: (e) => {
          toast.error("Failed to update product. Try again.");
        },
      },
    );
  };

  return (
    <div className="max-w-lg mx-auto  ">
      <button onClick={()=> navigate(-1)}   className="btn  btn-sm gap-1 mb-4">
        <ArrowLeftIcon className=" size-4" /> Back
      </button>

      <div className="card bg-base-300 ">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-5 text-primary text-md" /> Edit Product
          </h1>

          <EditProductForm
            watch={watch}
            register={register}
            onSubmit={handleSubmit(handleUpdate)}
            errors={errors}
            isPending={updateProduct.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProductView;
