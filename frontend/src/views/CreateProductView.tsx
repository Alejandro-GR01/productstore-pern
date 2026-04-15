import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon, ImageIcon, SparklesIcon, Truck, TypeIcon } from "lucide-react";
import { isValidURL } from "../utils";

const CreateProductView = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const initialValues = {
    title: '',
    description: '',
    imageUrl: '',
  }

  const { register, handleSubmit, reset,  formState:{errors}, getValues} = useForm({defaultValues: initialValues})

  // console.log(formState)

  const handleCreateProduct = (e)=> {
    console.log(e)
  }
 
  return <div className="max-w-lg mx-auto  ">
    <Link to='/' className="btn btn-ghost btn-sm gap-1 mb-4" >
    <ArrowLeftIcon className=" size-4" /> Back
    </Link>

    <div className="card bg-base-300 ">
      <div className="card-body">
        <h1 className="card-title">
          <SparklesIcon className="size-5 text-primary text-md" /> New Product
        </h1>

        <form noValidate onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4 mt-4  ">
          <label htmlFor="title" className="input input-info flex items-center gap-2 bg-base-200">
            <TypeIcon className="size-4 text-base-content/50" />
            <input type="text" placeholder="Product title" className="grow"
            name="title" id="title"
            {...register('title', {
              required : 'Product title required',
            })}
            />

          </label>
          <label htmlFor="imageUrl" className="input input-info flex items-center gap-2 bg-base-200">
            <ImageIcon className="size-4 text-base-content/50" />
            <input type="text" placeholder="Image URL" className="grow"
            name="title" id="title"
            {...register('imageUrl', {
              required : 'Image URL required',
              validate: (val) => isValidURL(val) || "Image URL don't valid"
            })}
            />
          </label>
          {isValidURL(getValues().imageUrl)  && getValues().imageUrl && (
            <img src={getValues().imageUrl} alt="Preview" className="w-full h-40 object-cover"
            onError={e=> e.target.style.display = "none"} />
          )}
       
        </form>
      </div>

    </div>
  </div>;
};

export default CreateProductView;