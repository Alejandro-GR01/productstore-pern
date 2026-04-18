import { Navigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import useUserSinc from "../hooks/useUserSinc";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const queryClinet = useQueryClient();
  const { isLoading, isError } = useUserSinc();
  const user: User = queryClinet.getQueryData(["user"]);

  if (!isLoading) {
    if (isError || !user || user.name.length === 0) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
