import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUser } from "../api/api";
import { useAppStore } from "../store/store";

const useUserSinc = () => {
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      useAppStore.setState({ user: data });
    }
  }, [data]);

  return {
    refetch,
  };
};

export default useUserSinc;