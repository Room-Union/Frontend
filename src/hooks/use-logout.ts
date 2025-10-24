import { useToastStore } from "@/store/toast-store";
import { removeAccessToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const { toast } = useToastStore();
  const router = useRouter();
  const handleLogout = () => {
    removeAccessToken();
    router.push("/");
    router.refresh();
    toast({
      message: "로그아웃 되었습니다.",
      type: "normal",
    });
  };
  return { handleLogout };
}
