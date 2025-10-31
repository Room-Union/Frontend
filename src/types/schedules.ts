interface Schedule {
  id: number;
  title: string;
  scheduledAt: string;
  currentMemberCount: number;
  maxMemberCount: number;
  scheduleImage: string;
}

export type { Schedule };
