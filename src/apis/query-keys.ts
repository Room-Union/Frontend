const queryKeys = {
  gathering: {
    all: ["gathering"] as const,
    detail: (id: string) => [...queryKeys.gathering.all, "detail", id],
  },
  user: {
    all: ["user"] as const,
  },
};

export default queryKeys;
