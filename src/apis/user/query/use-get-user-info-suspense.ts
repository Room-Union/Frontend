import queryKeys from "@/apis/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "../user.api";

const useGetUserInfoSuspense = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.user.all,
    queryFn: getUserInfo,
    retry: false,
    staleTime: 1000 * 60 * 5,
    select: (response) => ({
      ...response,
      profileImageUrl: response.profileImageUrl
        ? `${response.profileImageUrl}?date=${Date.now()}`
        : "",
    }),
    structuralSharing: false,
  });
};

export default useGetUserInfoSuspense;
