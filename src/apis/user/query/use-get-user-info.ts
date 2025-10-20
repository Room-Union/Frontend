import queryKeys from "@/apis/query-keys";
import { checkIsSignedIn } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../user.api";

const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: getUserInfo,
    enabled: checkIsSignedIn(),
    // 이미지 캐시 기능 비활성화를 위한 쿼리 키 추가
    select: (response) => ({
      ...response,
      profileImageUrl: `${response.profileImageUrl}?date=${Date.now()}`,
    }),
  });
};

export default useGetUserInfo;
