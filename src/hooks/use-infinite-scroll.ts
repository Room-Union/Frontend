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
      // 종료조건
      // 1. 더 이상 가져올 데이터가 없을 때,
      // 2. content가 페이지 사이즈보다 작을 때
      if (
        lastPage.content.length === 0 ||
        lastPage.content.length < lastPage.size
      ) {
        return undefined;
      }

      // 다음 페이지 번호 반환
      return allPages.length;
    },
  });
};

export default useInfiniteScroll;
