// 모임 카드 조회 타입*
interface GetGatheringCardResponse {
    id: number;
    title: string;
    image?: string;
    category: string;
    currentMemberCount: number;
    maxMemberCount: number;
    status: string;
}

// 모임 리스트 조회 타입*
interface GetGatheringListResponse {
    gatheringList: GetGatheringCardResponse[];
};

export type {
    GetGatheringCardResponse,
    GetGatheringListResponse
};