// jest.setup.ts
import { server } from "@/mocks/server";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import "@testing-library/jest-dom";

// 모든 테스트가 시작하기 전 MSW 서버를 시작합니다.
beforeAll(() => server.listen());
// 이전 테스트의 모의 응답이 다음 테스트에 영향을 주지 않도록 이전 테스트에서 설정된 핸들러를 초기화합니다.
afterEach(() => server.resetHandlers());
// 모든 테스트가 완료된 후에 MSW 서버를 종료합니다.
afterAll(() => server.close());

// useRouter, usePathname, useSearchParams 무력화
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/mock-path",
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

export { renderWithQueryClient };
