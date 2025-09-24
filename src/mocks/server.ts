// /src/mocks/server.ts

import { setupServer } from "msw/node";
import { postsHandlers } from "./handlers/posts";

// MSW 서버를 설정합니다.
export const server = setupServer(...postsHandlers);
