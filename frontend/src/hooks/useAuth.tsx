import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await api.get("/get-profile");
      // console.log(response.data);
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: true,
  });
};

export default useAuth;
