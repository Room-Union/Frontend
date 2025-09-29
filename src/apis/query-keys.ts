const queryKeys = {
  gathering: {
    all: ["gathering"] as const,
    detail: (id: string) => [...queryKeys.gathering.all, "detail", id],
  },
};

export default queryKeys;
