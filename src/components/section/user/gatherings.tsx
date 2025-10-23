import { BadgeType, CategoryType } from "@/types/constants";
import GatheringList from "../gathering/list/gathering-list";

const gatheringLists = [
  // TODO: api 연동 후 삭제
  {
    meetingId: 1,
    name: "온라인 영화 토론 모임",
    description: "온라인 영화 토론 모임",
    meetingImage: "",
    category: "CULTURE_ART" as CategoryType,
    currentMemberCount: 10,
    maxMemberCount: 20,
    platformURL: ["https://discord.gg/abce"],
    userId: 1,
    createdAt: "2025-01-01",
    badges: ["NEW"] as BadgeType[],
    joined: true,
  },
  {
    meetingId: 2,
    name: "게임 스터디 그룹",
    description: "게임 개발 공부 모임",
    meetingImage: "",
    category: "GAME" as CategoryType,
    currentMemberCount: 5,
    maxMemberCount: 15,
    platformURL: ["https://discord.gg/def"],
    userId: 2,
    createdAt: "2025-01-02",
    badges: ["RECRUITING"] as BadgeType[],
    joined: false,
  },
  {
    meetingId: 3,
    name: "독서 모임",
    description: "월간 독서 토론 모임",
    meetingImage: "",
    category: "HOBBY" as CategoryType,
    currentMemberCount: 18,
    maxMemberCount: 20,
    platformURL: ["https://discord.gg/ghi"],
    userId: 3,
    createdAt: "2025-01-03",
    badges: ["ALMOST_FULL"] as BadgeType[],
    joined: true,
  },
  {
    meetingId: 4,
    name: "영어 회화 스터디",
    description: "영어 회화 연습 모임",
    meetingImage: "",
    category: "SELF_DEVELOPMENT" as CategoryType,
    currentMemberCount: 8,
    maxMemberCount: 12,
    platformURL: ["https://discord.gg/jkl"],
    userId: 4,
    createdAt: "2025-01-04",
    badges: ["RECRUITING"] as BadgeType[],
    joined: false,
  },
  {
    meetingId: 5,
    name: "요리 클래스",
    description: "온라인 요리 배우기",
    meetingImage: "",
    category: "HOBBY" as CategoryType,
    currentMemberCount: 12,
    maxMemberCount: 15,
    platformURL: ["https://discord.gg/mno"],
    userId: 5,
    createdAt: "2025-01-05",
    badges: ["NEW"] as BadgeType[],
    joined: true,
  },
  {
    meetingId: 6,
    name: "투자 스터디",
    description: "주식 투자 공부 모임",
    meetingImage: "",
    category: "INFO_ECONOMY" as CategoryType,
    currentMemberCount: 6,
    maxMemberCount: 10,
    platformURL: ["https://discord.gg/pqr"],
    userId: 6,
    createdAt: "2025-01-06",
    badges: ["RECRUITING"] as BadgeType[],
    joined: false,
  },
  {
    meetingId: 7,
    name: "프로그래밍 스터디",
    description: "React 개발 공부 모임",
    meetingImage: "",
    category: "SELF_DEVELOPMENT" as CategoryType,
    currentMemberCount: 14,
    maxMemberCount: 16,
    platformURL: ["https://discord.gg/stu"],
    userId: 7,
    createdAt: "2025-01-07",
    badges: ["ALMOST_FULL"] as BadgeType[],
    joined: true,
  },
  {
    meetingId: 8,
    name: "음악 감상 모임",
    description: "다양한 장르 음악 감상",
    meetingImage: "",
    category: "CULTURE_ART" as CategoryType,
    currentMemberCount: 9,
    maxMemberCount: 20,
    platformURL: ["https://discord.gg/vwx"],
    userId: 8,
    createdAt: "2025-01-08",
    badges: ["NEW"] as BadgeType[],
    joined: false,
  },
  {
    meetingId: 9,
    name: "운동 모임",
    description: "홈트레이닝 함께하기",
    meetingImage: "",
    category: "HOBBY" as CategoryType,
    currentMemberCount: 7,
    maxMemberCount: 12,
    platformURL: ["https://discord.gg/yza"],
    userId: 9,
    createdAt: "2025-01-09",
    badges: ["RECRUITING"] as BadgeType[],
    joined: true,
  },
  {
    meetingId: 10,
    name: "창업 스터디",
    description: "창업 아이디어 공유 모임",
    meetingImage: "",
    category: "COMMUNICATION" as CategoryType,
    currentMemberCount: 11,
    maxMemberCount: 15,
    platformURL: ["https://discord.gg/bcd"],
    userId: 10,
    createdAt: "2025-01-10",
    badges: ["NEW"] as BadgeType[],
    joined: false,
  },
];

const Gatherings = () => {
  return (
    <div className="tb:gap-[74px] mo:gap-15 flex flex-col">
      <GatheringList
        title={"내가 생성한 모임"}
        moreLink={""}
        gatheringList={gatheringLists}
      />
      <GatheringList
        title={"내가 가입한 모임"}
        moreLink={""}
        gatheringList={gatheringLists}
      />
    </div>
  );
};

export default Gatherings;
