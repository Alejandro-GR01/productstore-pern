import { toast } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";
import { data, Link } from "react-router";
import { PackageIcon, PackageOpenIcon, SparklesIcon } from "lucide-react";

import ProductCard from "../components/ProductCard";

const HomeView = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;
  else if (error) {
    toast.error("Something went wrong. Please refresh the page");
  }

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
            <img
              src="/image.png"
              alt="Creator"
              className="relative h-64 lg:h-72 px-4 rounded-2xl shadow-2xl"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Share Your <span className="text-primary">Products</span>
            </h1>
            <p className="py-4 text-base-content/60">
              Upload, discover and connect with creators.
            </p>
            <Link to="/create" className="btn btn-primary">
              <SparklesIcon className="size-4" />
              Start Selling
            </Link>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          {products?.length === 0 ? (
            <PackageOpenIcon className="size-10 text-base-content opacity-60" />
          ) : (
            <PackageIcon className="size-10 text-primary opacity-60" />
          )}
          All Products
        </h2>

        {products?.length === 0 || !products ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-18 text-base-content opacity-40" />
              <h3 className="card-title text-base-content/50">
                No product yet
              </h3>
              <p className="text-base-content text-sm">
                Be the first to share something!
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
