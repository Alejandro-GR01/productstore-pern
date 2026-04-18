import { Link, useNavigate, useParams } from "react-router";
import { useDeleteProduct, useProduct } from "../hooks/useProducts";

import LoadingSpinner from "../components/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import CommentsSection from "../components/CommentsSection";
import React from "react";
import placeholdeImg from "/image-broken.png";

const ProductView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isError, isLoading, error } = useProduct(id);

  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, {
        onError: () => toast.error("Don't be posiblle delete the product "),
        onSuccess: () => {
          toast.success("Product deleted correctly");
          navigate("/");
        },
      });
    }
  };

  const user: User = queryClient.getQueryData(["user"]);

  if (isLoading) return <LoadingSpinner />;
  else if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center space-y-10">
          <h2 className="card-title text-lg ">
            <span className="text-primary font-semibold text-lg">404</span> Not
            found
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === product?.userID;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4 ">
        <Link to="/" className="btn  btn-sm gap-1 ">
          <ArrowLeftIcon className=" size-4" />
          <span className="hidden sm:block">Back</span>
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="btn btn-neutral btn-sm gap-1"
            >
              <EditIcon className="size-4 " />
              <span className="hidden sm:block">Edit</span>
            </Link>
            <button
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
              onClick={handleDelete}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              <span className="hidden sm:block">Delete</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image */}
        <div className="card bg-base-300">
          <figure className="p-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-xl w-auto object-cover object-center h-80 "
              onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                (e.target.src = placeholdeImg)
              }
            />
          </figure>
        </div>

        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product.user?.name}
              </div>
            </div>

            <div className="divider my-2" />

            <p className="text-base-content/80 leading-relaxed">
              {product.description}
            </p>

            {product.user && (
              <>
                <div className="divider my-2" />

                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-primary">
                      {product.user.imageUrl ? (
                        <img
                          src={product.user.imageUrl}
                          alt={product.user.name}
                        />
                      ) : (
                        <div className="text-xl uppercase  bg-primary">
                          {product.user.name.split("")[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-xs text-base-content/50">Creator</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="card bg-base-300">
        <div className="card-body">
          <CommentsSection productId={id} comments={product.comments} />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
