import { ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="btn btn-ghost gap-2">
      <ShoppingBagIcon className="size-6 text-primary" />
      <p className="text-lg font-bold tracking-wider">
        Product<span className=" font-light">Store</span>
      </p>
    </Link>
  );
};

export default Logo;
