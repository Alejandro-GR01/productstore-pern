import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUser } from "../api/api";
import { useAppStore } from "../store/store";

const useUserSinc = () => {
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("AUTH_TOKEN");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: hasToken, // Solo ejecuta si hay token
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos - cache del usuario
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      useAppStore.setState({ user: data });
    }
  }, [data]);

  return {
    refetch,
    isLoading,
  };
};

export default useUserSinc;