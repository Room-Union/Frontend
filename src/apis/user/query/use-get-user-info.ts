import { checkIsSignedIn } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../user.api";

const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(),
    enabled: checkIsSignedIn(),
  });
};

export default useGetUserInfo;
