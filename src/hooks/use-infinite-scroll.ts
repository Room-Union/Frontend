"use client";

import type { GetGatheringListResponse } from "@/types/gathering-list";
import type { QueryKey } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteScrollProps {
  queryKey: QueryKey;
  queryFn: ({
    pageParam,
  }: {
    pageParam: number;
  }) => Promise<GetGatheringListResponse>;
}

// 무한 스크롤 함수
const useInfiniteScroll = ({ queryKey, queryFn }: UseInfiniteScrollProps) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 종료조건: last가 true이면 마지막 페이지
      if (lastPage.last) {
        return undefined;
      }

      // 다음 페이지 번호 반환
      return allPages.length;
    },
  });
};

export default useInfiniteScroll;
