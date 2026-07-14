import { useQueryClient } from "@tanstack/react-query";
import { Product, User } from "../types";
import { useDeleteProduct, useMyProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router";
import {
  EditIcon,
  EyeIcon,
  PackageIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import placeholdeImg from "/image-broken.png";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";

function ProfileView() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user: User = queryClient.getQueryData(["user"]);
  const deleteProduct = useDeleteProduct();

  const { data: products, isLoading, isError } = useMyProducts();

  if (isLoading || !user) return <LoadingSpinner />;

  const handleDelete = (id: Product["id"]) => {
    const newProducts = products.filter((product) => product.id !== id);
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, {
        onError: () => toast.error("Don't be posiblle delete the product "),
        onSuccess: () => {
          toast.success("Product deleted correctly");
          queryClient.setQueryData(
            ["products", "my_products"],
            [...newProducts],
          );
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-base-content/60 text-sm">Manage your listenings</p>
        </div>
        <Link to="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-4" />
          New
        </Link>
      </div>

      {/* Stats */}
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title ">Total Products</div>
          <div className="font-bold text-2xl text-primary pl-2">
            {products.length || 0}
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">
              Start by creating you first product
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <ProductImage source={product.imageUrl} alt={product.title} className="w-fullobject-cover object-center max-h-[40dvh] h-full"  />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-2">
                  {product.description}
                </p>
                <div className="card-actions items-center  justify-end mt-2">
                  <button
                    className="btn btn-ghost btn-xs gap-1 h-full"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <EyeIcon className="size-4" />
                    <span className="hidden sm:block">View</span>
                  </button>
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
                    onClick={() => handleDelete(product.id)}
                  >
                    {deleteProduct.isPending ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <Trash2Icon className="size-4" />
                    )}
                    <span className="hidden sm:block">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileView;
