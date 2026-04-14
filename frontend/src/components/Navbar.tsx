import { Link } from "react-router";
import { PlusIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import Logo from "./Logo";

import { useAppStore } from "../store/store";

const Navbar = () => {
  const { user } = useAppStore();

  return (
    <div className="navbar bg-base-300">
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center ">
        <div className="flex-1">
          <Logo />
        </div>

        <div className="flex gap-2 items-center ">
          {user.name.length > 0 ? (
            <>
              <Link to="/create" className="btn btn-primary btn-sm gap-1">
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">New Product</span>
              </Link>
              <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/auth/login"} className="btn btn-ghost btn-sm">
                Sig In
              </Link>
              <Link to={"/auth/register"} className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}

          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default Navbar;