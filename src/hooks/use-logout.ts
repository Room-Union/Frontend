import { removeAccessToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const handleLogout = () => {
    removeAccessToken();
    router.push("/");
    router.refresh();
  };
  return { handleLogout };
}
