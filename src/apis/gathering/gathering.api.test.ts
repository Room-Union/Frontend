import { mockGatheringCreate, mockGetGatheringDetail } from "@/data/gathering";
import {
  createGathering,
  deleteGathering,
  getGatheringDetail,
  updateGathering,
} from "./gathering.api";

describe("MSW 테스트: gathering.api", () => {
  describe("MSW 테스트: gatheringCreate", () => {
    test("mockData를 사용하여, 모임을 올바르게 생성하는지 확인한다", async () => {
      const inputData = mockGatheringCreate; // 입력 데이터
      const res = await createGathering(inputData); // 생성된 모임 상세 정보

      // 생성된 모임이 입력 데이터를 반영하는가?
      expect(res.id).toBeDefined();
      expect(res.title).toBe(inputData.title);
      expect(res.description).toBe(inputData.description);
    });

    test("다른 입력 값으로 모임을 올바르게 생성하는지 확인한다", async () => {
      const inputData = {
        title: "스팀 게임 모임",
        description: "스팀 게임을 함께 하는 모임입니다.",
        category: "게임",
        image: undefined,
        maxMemberCount: 10,
      };

      const res = await createGathering(inputData);

      // 생성된 모임이 입력 데이터를 반영하는가?
      expect(res.id).toBeDefined();
      expect(res.title).toBe(inputData.title);
      expect(res.description).toBe(inputData.description);
    });
  });

  describe("MSW 테스트: getGatheringDetail", () => {
    test("mockData를 사용하여, 모임 상세 정보를 올바르게 조회하는지 확인한다", async () => {
      const id = 1;
      const res = await getGatheringDetail(id);

      // id 1번의 모임 상세 정보가 올바른가?
      expect(res.id).toBe(1);
      expect(res.title).toBe(mockGetGatheringDetail.title);
      expect(res.description).toBe(mockGetGatheringDetail.description);
    });

    test("다른 ID로 모임 상세 정보를 올바르게 조회하는지 확인한다", async () => {
      const id = 5;
      const res = await getGatheringDetail(id);

      // id 5번의 모임 상세 정보가 올바른가?
      expect(res.id).toBe(5);
      expect(res.title).toBe(mockGetGatheringDetail.title);
    });
  });

  describe("MSW 테스트: updateGathering", () => {
    test("mockData를 사용하여, 모임 정보를 올바르게 수정하는지 확인한다", async () => {
      const id = 1;

      const updateData = mockGatheringCreate;
      const res = await updateGathering(id, updateData);

      // 수정된 데이터가 올바르게 반영되는가?
      expect(res.title).toBe(updateData.title);
      expect(res.description).toBe(updateData.description);
    });

    test("다른 입력 값으로 모임 정보를 올바르게 수정하는지 확인한다", async () => {
      const id = 5;
      const updateData = {
        title: "수정된 모임 제목",
        description: "수정된 모임 설명",
      };

      const res = await updateGathering(id, updateData);

      // 수정된 데이터가 올바르게 반영되는가?
      expect(res.title).toBe(updateData.title);
      expect(res.description).toBe(updateData.description);
    });
  });

  describe("MSW 테스트: deleteGathering", () => {
    test("mockData를 사용하여, 모임을 올바르게 삭제하는지 확인한다", async () => {
      const id = 1;
      const res = await deleteGathering(id);

      // 삭제된 모임의 ID가 올바르게 반환되는가?
      expect(res.id).toBe(1);
    });

    test("다른 ID로 모임을 올바르게 삭제하는지 확인한다", async () => {
      const id = 5;
      const res = await deleteGathering(id);

      // 삭제된 모임의 ID가 올바르게 반환되는가?
      expect(res.id).toBe(5);
    });
  });
});
