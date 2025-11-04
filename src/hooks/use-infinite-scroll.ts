"use client";

import type { GetGatheringListResponse } from "@/types/gathering-list";
import type { QueryKey } from "@tanstack/react-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteScrollProps {
  queryKey: QueryKey;
  queryFn: ({
    pageParam,
  }: {
    pageParam: number;
  }) => Promise<GetGatheringListResponse>;
  retry?: boolean;
}

// 무한 스크롤 함수
const useSuspenseInfiniteScroll = ({
  queryKey,
  queryFn,
  retry = false,
}: UseInfiniteScrollProps) => {
  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn,
    retry,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // 종료조건: last가 true이면 마지막 페이지
      if (lastPage.last) {
        return undefined;
      }
      // 다음 페이지 번호 반환
      return lastPage.page + 1;
    },
  });
};

export default useSuspenseInfiniteScroll;
