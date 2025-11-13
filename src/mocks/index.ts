const USE_MSW = false;

export async function initMocks() {
  if (process.env.NODE_ENV !== "development") return;
  if (!USE_MSW) return;

  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    await worker.start();
  }
}
