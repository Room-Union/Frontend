import SvgArt from "@/assets/icons/art";
import SvgChart from "@/assets/icons/chart";
import SvgChat from "@/assets/icons/chat";
import SvgGame from "@/assets/icons/game";
import SvgSport from "@/assets/icons/sport";
import SvgStudy from "@/assets/icons/study";
import SvgUsersThree from "@/assets/icons/users-three";
import {
  CategoryOptionType,
  GenderOptionType,
  SignUpStepType,
} from "@/types/constants";
import { cn } from "@/utils/cn";

export const CATEGORIES: CategoryOptionType[] = [
  {
    name: "문화·예술",
    value: "CULTURE_ART",
    gatheringListHeaderIcon: "🎨",
    icon: (props: string) =>
      SvgArt({
        className: cn("stroke-none fill-yellow-300", props),
      }),
  },
  {
    name: "게임",
    value: "GAME",
    gatheringListHeaderIcon: "🎮",
    icon: (props: string) =>
      SvgGame({ className: cn("stroke-none fill-red-400", props) }),
  },
  {
    name: "취미",
    value: "HOBBY",
    gatheringListHeaderIcon: "🏀",
    icon: (props: string) =>
      SvgSport({ className: cn("stroke-none fill-yellow-500", props) }),
  },
  {
    name: "소통",
    value: "COMMUNICATION",
    gatheringListHeaderIcon: "💬",
    icon: (props: string) =>
      SvgChat({ className: cn("stroke-none fill-blue-600", props) }),
  },
  {
    name: "정보·경제",
    value: "INFO_ECONOMY",
    gatheringListHeaderIcon: "📊",
    icon: (props: string) =>
      SvgChart({ className: cn("stroke-none fill-purple-500", props) }),
  },
  {
    name: "자기계발",
    value: "SELF_DEVELOPMENT",
    gatheringListHeaderIcon: "📚",
    icon: (props: string) =>
      SvgStudy({ className: cn("stroke-none fill-green-500", props) }),
  },
];

export const CATEGORIES_EXTENDS_ALL: CategoryOptionType[] = [
  {
    name: "전체",
    value: "all",
    icon: (props: string) =>
      SvgUsersThree({
        className: cn("stroke-none fill-neutral-500", props),
      }),
  },
  ...CATEGORIES,
];

export const GENDER: GenderOptionType[] = [
  { name: "여성", value: "FEMALE" },
  { name: "남성", value: "MALE" },
  { name: "밝히지 않음", value: "NONE" },
];

export const SIGN_UP_STEPS: SignUpStepType[] = [
  {
    id: 1,
    name: "이메일 입력",
    value: "EmailEntryStep",
  },
  {
    id: 2,
    name: "이메일 인증",
    value: "EmailVerificationStep",
  },
  {
    id: 3,
    name: "비밀번호 입력",
    value: "PasswordEntryStep",
  },
  {
    id: 4,
    name: "프로필 입력",
    value: "ProfileEntryStep",
  } as const,
];

export const Badges = [
  { name: "모집 중", value: "RECRUITING" },
  { name: "신규", value: "NEW" },
  { name: "마감 임박", value: "ALMOST_FULL" },
] as const;

// 경로 설정
export const PATHS = {
  MAIN: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  GATHERING_DETAIL: "/gathering/detail",
  GATHERING_LIST: "/gathering/list",
  MY_PAGE: "/my-page",
  MY_PAGE_LIST: "/my-page/list",
} as const;

// 레이아웃 설정
export const PC_LAYOUT = {
  gatheringList: { CARD_SIZE: 275, GAP_SIZE: 20, CARD_COUNT: 4 },
  appointmentList: { CARD_SIZE: 340, GAP_SIZE: 20, CARD_COUNT: 2 },
};

export const GATHERING_STEPS = ["category", "basic-info", "capacity-url"];

export const GATHERING_STEP_FIELDS = {
  [GATHERING_STEPS[0]]: ["category"],
  [GATHERING_STEPS[1]]: ["name", "description", "meetingImage"],
  [GATHERING_STEPS[2]]: ["maxMemberCount", "platformURL"],
};
