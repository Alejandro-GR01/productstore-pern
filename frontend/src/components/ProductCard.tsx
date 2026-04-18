import { Link } from "react-router";
import { Product } from "../types";
import { ImageOff, MessageCircleIcon } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`products/${product.id}`}
      className="card bg-base-300 group  hover:bg-base-200   transition-all duration-300"
    >
      <div className="relative">
        <figure className="px-4 pt-4 relative flex items-center justify-center overflow-hidden rounded-xl  h-40">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="absolute z-10 top-0 bottom-0 left-0 right-0   h-40 w-full object-cover transition-opacity duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).classList.add("hidden");
            }}
          />
          <ImageOff className="relative z-0 top-0 bottom-0 left-0 right-0 size-20 text-primary bg-transparent"  />
        </figure>
        {isNew && (
          <span className=" absolute z-10 top-4 right-4 badge badge-secondary badge-xs border border-base-content rotate-25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            NEW
          </span>
        )}
      </div>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{product.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        <div className=" divider my-1" />

        <div className="flex items-center justify-between">
          {product.user && (
            <div className="flex items-center gap-2">
              <div className=" avatar">
                <div className="w-6 rounded-full ring-1 ring-primary/50">
                  {product.user.imageUrl ? (
                    <img src={product.user.imageUrl} alt={product.user.name} />
                  ) : (
                    <div className="w-full h-full aspect-square rounded-full flex items-center justify-center p-0 m-0 bg-secondary/30 text-primary uppercase text-sm font-bold">
                      {product.user.name.split("")[0]}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs font-semibold text-base-content/80">
                {product.user.name}
              </p>
            </div>
          )}
          {product.comments && (
            <div className="flex items-center gap-1 text-base-content/50">
              <MessageCircleIcon className="size-3" />
              <span className="text-sm">{product.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
