import queryKeys from "@/apis/query-keys";
import { checkIsSignedIn } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../user.api";

const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: getUserInfo,
    enabled: checkIsSignedIn(),
  });
};

export default useGetUserInfo;
