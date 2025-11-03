"use client";

import {
  Appointments,
  Description,
  DetailSection,
  GatheringHeader,
  Information,
  Members,
} from "@/components/section";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SectionError from "./section-error";

export interface MainContentProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
  meetingId: number;
}

const MainContent = ({ data, isOwner, meetingId }: MainContentProps) => {
  return (
    <div className="tb:px-0 pc:max-w-[790px] pc:flex-1 pc:min-w-0 w-full">
      {/* Header: 이미지, 제목, 카테고리, 생성일, 모임 삭제 버튼 */}
      <GatheringHeader data={data} isOwner={isOwner} />

      {/* Information: 태블릿 이하에서 보여줌 */}
      <DetailSection className="pc:hidden">
        <Information data={data} />
      </DetailSection>

      {/* Description */}
      <DetailSection title="모임 설명">
        <Description data={data} />
      </DetailSection>

      {/* MemberList */}
      <ErrorBoundary
        fallback={
          <SectionError
            title="멤버들"
            message="멤버 정보를 불러올 수 없습니다"
          />
        }
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Members meetingId={meetingId} />
        </Suspense>
      </ErrorBoundary>

      {/* Appointments Section */}
      <ErrorBoundary
        fallback={
          <SectionError
            title="모임 약속"
            message="약속 정보를 불러올 수 없습니다"
          />
        }
      >
        <Suspense fallback={<div>Loading...</div>}>
          <DetailSection title="모임 약속">
            <Appointments
              isOwner={isOwner}
              meetingId={meetingId}
              isJoined={data.joined}
            />
          </DetailSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default MainContent;
