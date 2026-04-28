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
import EditProductForm from "../components/EditProductForm";

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
    watch,
  } = useForm({ defaultValues: initialValues });

  

  const handleCreateProduct = async (e: ProductData) => {
    createProduct.mutate(e, {
      onSuccess: () => {
        toast.success("Product created succesfully.");
        reset();

        navigate("/profile");
      },
      onError: () => {
        toast.error("Failed to create product. Try again.");
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto  ">
      <button onClick={() => navigate(-1)} className="btn  btn-sm gap-1 mb-4">
        <ArrowLeftIcon className=" size-4" /> Back
      </button>

      <div className="card bg-base-300 ">
        <div className="card-body">
          <h1 className="card-title">
            <SparklesIcon className="size-5 text-primary text-md" /> New Product
          </h1>

         <EditProductForm watch={watch} register={register} onSubmit={handleSubmit(handleCreateProduct)} isPending={createProduct.isPending} errors={errors} isCreateForm={true} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductView;
