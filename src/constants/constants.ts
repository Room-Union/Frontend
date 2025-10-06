import SvgArt from "@/assets/icons/art";
import SvgChart from "@/assets/icons/chart";
import SvgChat from "@/assets/icons/chat";
import SvgGame from "@/assets/icons/game";
import SvgSport from "@/assets/icons/sport";
import SvgStudy from "@/assets/icons/study";
import SvgUsersThree from "@/assets/icons/users-three";
import { cn } from "@/utils/cn";

export const CATEGORIES: OptionType[] = [
  {
    name: "전체",
    value: "all",
    icon: (props: string) =>
      SvgUsersThree({
        className: cn("stroke-neutral-800 fill-neutral-800", props),
      }),
  },
  {
    name: "문화·예술",
    value: "culture",
    icon: (props: string) =>
      SvgArt({
        className: cn("stroke-yellow-300 fill-yellow-300", props),
      }),
  },
  {
    name: "게임",
    value: "games",
    icon: (props: string) =>
      SvgGame({ className: cn("stroke-red-400 fill-red-400", props) }),
  },
  {
    name: "취미",
    value: "hobbies",
    icon: (props: string) =>
      SvgSport({ className: cn("stroke-yellow-500 fill-yellow-500", props) }),
  },
  {
    name: "커뮤니케이션",
    value: "communications",
    icon: (props: string) =>
      SvgChat({ className: cn("stroke-blue-600 fill-blue-600", props) }),
  },
  {
    name: "정보·경제",
    value: "informationEconomy",
    icon: (props: string) =>
      SvgChart({ className: cn("stroke-purple-500 fill-purple-500", props) }),
  },
  {
    name: "자기계발",
    value: "self-development",
    icon: (props: string) =>
      SvgStudy({ className: cn("stroke-green-500 fill-green-500", props) }),
  },
];

export const GENDER: OptionType[] = [
  { name: "여성", value: "female" },
  { name: "남성", value: "male" },
  { name: "비밀", value: "none" },
];

export const SIGN_UP_STEPS: SignUpStepType[] = [
  { id: 1, name: "이메일 입력" },
  { id: 2, name: "이메일 인증" },
  { id: 3, name: "비밀번호 입력" },
  { id: 4, name: "프로필 입력" },
];
