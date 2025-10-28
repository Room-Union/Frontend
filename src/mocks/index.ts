// src/mocks/index.ts

export async function initMocks() {
  if (process.env.NODE_ENV !== "development") return; // 개발 환경이 아니라면 실행 X
  if (process.env.NEXT_PUBLIC_USE_MSW === "false") return; // MSW를 사용하지 않겠다고 설정된 경우 실행 X

  if (typeof window === "undefined") {
    // 서버 사이드
    const { server } = await import("./server");
    server.listen();
  } else {
    // 클라이언트 사이드
    const { worker } = await import("./browser");
    await worker.start();
  }
}
