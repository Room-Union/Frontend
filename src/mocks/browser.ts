// /src/mocks/browser.ts
import { handlers } from "@/mocks/handlers";
import { setupWorker } from "msw/browser";

// 브라우저에서 MSW 실행
export const worker = setupWorker(...handlers);
