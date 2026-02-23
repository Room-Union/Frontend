"use client";
import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { signOutUser } from "../auth.api";

const useSignOut = () => {
  const { toast } = useToastStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.user.all });
      useAuthStore.getState().setSignedOut();
      router.push("/");

      toast({
        message: "로그아웃 되었습니다.",
        type: "normal",
      });
      router.refresh();
    },
  });
};

export default useSignOut;
