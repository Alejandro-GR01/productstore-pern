import { Navigate } from "react-router";
import { useAppStore } from "../store/store";
import {  useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import useUserSinc from "../hooks/useUserSinc";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const queryClinet = useQueryClient()
    const {data} = useUserSinc()

    if(!data || data.name.length === 0){
        return <Navigate to='/auth/register' replace/>
     }

  return <>{children}</>;
};

export default ProtectedRoute;
