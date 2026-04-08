import { Link } from "react-router";
import { PlusIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center ">
        {/* Logo left */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost gap-2">
            <ShoppingBagIcon className="size-6 text-primary" />
            <p className="text-lg font-bold tracking-wider">
              Product<span className=" font-light">Store</span>
            </p>
          </Link>
        </div>

        <div className="flex gap-2 items-center ">
            <>
                <Link to='/create' className="btn btn-primary btn-sm gap-1">
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">New Product</span>
                </Link>
                <Link to='/profile' className="btn btn-ghost btn-sm gap-1"> 
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
                </Link>
            </>
            <>
              <button className="btn btn-ghost btn-sm">
                Sig In
              </button>
              <button className="btn btn-primary btn-sm">Get Started</button>
            </>
            <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
