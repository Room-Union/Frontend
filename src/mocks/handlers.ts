// 모든 MSW 핸들러들을 통합하는 파일
import appointmentsHandler from "@/mocks/handlers/appointments";
import gatheringHandler from "@/mocks/handlers/gathering";

export const handlers = [...gatheringHandler, ...appointmentsHandler];
