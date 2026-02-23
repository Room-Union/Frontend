import {
  createAppointmentTest,
  deleteAppointmentTest,
  getAppointmentsTest,
  joinAppointmentTest,
  leaveAppointmentTest,
  updateAppointmentTest,
} from "@/apis/appointments/appointments-mock.api";
import {
  mockCreateAppointment,
  mockUpdateAppointment,
} from "@/data/appointments";

describe("MSW 테스트: appointments.api", () => {
  const testMeetingId = 1;
  const testAppointmentId = 1;

  describe("MSW 테스트: createAppointment", () => {
    test("mockData를 사용하여, 약속을 올바르게 생성하는지 확인한다", async () => {
      const inputData = mockCreateAppointment;
      const res = await createAppointmentTest({
        meetingId: testMeetingId,
        data: inputData,
      });

      expect(res.id).toBeDefined();
      expect(res.title).toBe(inputData.title);
      expect(res.scheduledAt).toBe(inputData.scheduledAt);
      expect(res.maxMemberCount).toBe(inputData.maxMemberCount);
      expect(res.imageUrl).toBeUndefined();
    });

    test("다른 입력 값으로 약속을 올바르게 생성하는지 확인한다", async () => {
      const inputData = {
        title: "저녁 식사 모임",
        scheduledAt: "2025-11-20T18:30:00.000+09:00",
        maxMemberCount: 8,
      };

      const res = await createAppointmentTest({
        meetingId: testMeetingId,
        data: inputData,
      });

      expect(res.id).toBeDefined();
      expect(res.title).toBe(inputData.title);
      expect(res.scheduledAt).toBe(inputData.scheduledAt);
      expect(res.maxMemberCount).toBe(inputData.maxMemberCount);
      expect(res.imageUrl).toBeUndefined();
    });

    test("이미지가 포함된 약속을 올바르게 생성하는지 확인한다", async () => {
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const inputData = {
        title: "이미지 포함 약속",
        scheduledAt: "2025-11-25T14:00:00.000+09:00",
        maxMemberCount: 12,
        image: mockFile,
      };

      const res = await createAppointmentTest({
        meetingId: testMeetingId,
        data: inputData,
      });

      // 생성된 약속이 입력 데이터를 반영하는가?
      expect(res.id).toBeDefined();
      expect(res.title).toBe(inputData.title);
      expect(res.scheduledAt).toBe(inputData.scheduledAt);
      expect(res.maxMemberCount).toBe(inputData.maxMemberCount);
      expect(typeof res.imageUrl).toBe("string");
    });
  });

  describe("MSW 테스트: getAppointments", () => {
    test("mockData를 사용하여, 약속 목록을 올바르게 조회하는지 확인한다", async () => {
      const res = await getAppointmentsTest(testMeetingId);

      expect(Array.isArray(res)).toBe(true);

      if (res.length > 0) {
        expect(res[0]).toHaveProperty("id");
        expect(res[0]).toHaveProperty("title");
        expect(res[0]).toHaveProperty("scheduledAt");
        expect(res[0]).toHaveProperty("maxMemberCount");
        expect(res[0]).toHaveProperty("currentMemberCount");
        expect(res[0]).toHaveProperty("creatorId");
        expect(res[0]).toHaveProperty("isJoined");
      }
    });

    test("다른 모임 ID로 약속 목록을 올바르게 조회하는지 확인한다", async () => {
      const anotherMeetingId = 5;
      const res = await getAppointmentsTest(anotherMeetingId);

      expect(Array.isArray(res)).toBe(true);

      if (res.length > 0) {
        expect(res[0]).toHaveProperty("id");
        expect(res[0]).toHaveProperty("title");
        expect(res[0]).toHaveProperty("scheduledAt");
        expect(res[0]).toHaveProperty("maxMemberCount");
        expect(res[0]).toHaveProperty("currentMemberCount");
        expect(res[0]).toHaveProperty("creatorId");
        expect(res[0]).toHaveProperty("isJoined");
      }
    });

    test("빈 약속 목록도 올바르게 처리하는지 확인한다", async () => {
      const emptyMeetingId = 999;
      const res = await getAppointmentsTest(emptyMeetingId);

      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe("MSW 테스트: updateAppointment", () => {
    test("mockData를 사용하여, 약속 정보를 올바르게 수정하는지 확인한다", async () => {
      const updateData = mockUpdateAppointment;
      const res = await updateAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
        data: updateData,
      });

      expect(res.title).toBe(updateData.title);
      expect(res.scheduledAt).toBe(updateData.scheduledAt);
      expect(res.maxMemberCount).toBe(updateData.maxMemberCount);
    });

    test("다른 입력 값으로 약속 정보를 올바르게 수정하는지 확인한다", async () => {
      const updateData = {
        title: "또 다른 수정된 약속",
        scheduledAt: "2025-11-30T21:00:00.000+09:00",
        maxMemberCount: 25,
      };

      const res = await updateAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: 2,
        data: updateData,
      });

      expect(res.title).toBe(updateData.title);
      expect(res.scheduledAt).toBe(updateData.scheduledAt);
      expect(res.maxMemberCount).toBe(updateData.maxMemberCount);
    });

    test("이미지를 포함한 약속 정보를 올바르게 수정하는지 확인한다", async () => {
      const mockFile = new File(["test"], "updated.jpg", {
        type: "image/jpeg",
      });

      const updateData = {
        title: "이미지 업데이트 약속",
        scheduledAt: "2025-12-01T15:00:00.000+09:00",
        maxMemberCount: 18,
        image: mockFile,
      };

      const res = await updateAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
        data: updateData,
      });

      expect(res.title).toBe(updateData.title);
      expect(res.scheduledAt).toBe(updateData.scheduledAt);
      expect(res.maxMemberCount).toBe(updateData.maxMemberCount);
      expect(typeof res.imageUrl).toBe("string");
    });

    test("이미지 없이 생성된 약속에 이미지를 추가할 경우, 반영이 되는지 확인한다", async () => {
      const createData = {
        title: "이미지 없는 약속",
        scheduledAt: "2025-12-05T10:00:00.000+09:00",
        maxMemberCount: 10,
      };

      const createRes = await createAppointmentTest({
        meetingId: testMeetingId,
        data: createData,
      });

      expect(createRes.imageUrl).toBeUndefined();

      const mockFile = new File(["test"], "test.jpg", {
        type: "image/jpeg",
      });

      const updateData = {
        title: createData.title,
        scheduledAt: createData.scheduledAt,
        maxMemberCount: createData.maxMemberCount,
        image: mockFile,
      };

      const updateRes = await updateAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: createRes.id,
        data: updateData,
      });

      expect(updateRes.imageUrl).toBeDefined();
      expect(typeof updateRes.imageUrl).toBe("string");
    });
  });

  describe("MSW 테스트: deleteAppointment", () => {
    test("mockData를 사용하여, 약속을 올바르게 삭제하는지 확인한다", async () => {
      const res = await deleteAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
      });

      expect(res).toBe(true);
    });

    test("다른 ID로 약속을 올바르게 삭제하는지 확인한다", async () => {
      const res = await deleteAppointmentTest({
        meetingId: 2,
        appointmentId: 3,
      });

      expect(res).toBe(true);
    });
  });

  describe("MSW 테스트: joinAppointment", () => {
    test("mockData를 사용하여, 약속에 올바르게 참가하는지 확인한다", async () => {
      const res = await joinAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
      });

      expect(res).toBe(true);
    });

    test("다른 약속에 올바르게 참가하는지 확인한다", async () => {
      const res = await joinAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: 2,
      });

      expect(res).toBe(true);
    });
  });

  describe("MSW 테스트: leaveAppointment", () => {
    test("mockData를 사용하여, 약속에서 올바르게 탈퇴하는지 확인한다", async () => {
      const res = await leaveAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
      });

      expect(res).toBe(true);
    });

    test("다른 약속에서 올바르게 탈퇴하는지 확인한다", async () => {
      const res = await leaveAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: 3,
      });

      // 탈퇴 요청이 성공하는가?
      expect(res).toBe(true);
    });

    test("참가 후 탈퇴가 올바르게 작동하는지 확인한다", async () => {
      await joinAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
      });

      const res = await leaveAppointmentTest({
        meetingId: testMeetingId,
        appointmentId: testAppointmentId,
      });

      expect(res).toBe(true);
    });
  });
});
