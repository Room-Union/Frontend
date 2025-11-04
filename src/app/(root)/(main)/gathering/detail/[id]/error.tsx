"use client";

import { AlertCircle } from "@/assets/icons-colored";
import { Button } from "@/components/ui";
import axios from "axios";

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  let errorCode = "UNKNOWN_ERROR";

  if (axios.isAxiosError(error)) {
    errorCode = error.response?.data.code;
  }

  const getErrorUI = () => {
    switch (errorCode) {
      case "MEETING_NOT_FOUND":
        return {
          title: "모임을 찾을 수 없습니다",
          description: "모임을 찾을 수 없거나 삭제되었습니다",
          showRetry: false,
        };

      default:
        return {
          title: "알 수 없는 오류가 발생했습니다",
          description: "알수 없는 오류가 발생했습니다. 홈으로 이동해주세요",
          showRetry: false,
        };
    }
  };

  const errorUI = getErrorUI();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <AlertCircle className="tb:w-[90px] tb:h-[90px] mo:w-[70px] mo:h-[70px]" />
      <div className="flex flex-col items-center justify-center">
        <p className="typo-ui-xl-semibold text-gray-neutral-900 pc:mb-3 tb:mb-[10px] mo:mb-2">
          {errorUI?.title}
        </p>
        <p className="typo-ui-md-medium text-gray-neutral-400">
          {errorUI?.description}
        </p>
      </div>
      <Button
        href="/"
        variant="primary"
        size="md"
        className="mo:w-[200px] leading-[30px]"
      >
        홈으로 이동
      </Button>
    </div>
  );
};

export default Error;
