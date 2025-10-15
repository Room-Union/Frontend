"use client";

import { createGathering } from "@/apis/gathering/gathering.api";
import { ModalWrapper } from "@/components/ui";
import { CategoryType } from "@/types/constants";
import { GatheringFormData } from "@/types/gathering";
import { useState } from "react";
import GatheringForm from "./gathering-form";

const GatheringModal = () => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: GatheringFormData) => {
    try {
      const formData: GatheringFormData = {
        ...data,
        // category가 배열 형태로 반환되므로, 0번째 인덱스 사용
        category: (Array.isArray(data.category)
          ? data.category[0]
          : data.category) as CategoryType,

        // Todo: platformURL 컴포넌트 개발하기
        // 서버에서 요구하는 타입 stirng[], 반환되는 타입 string -> 따라서 배열 안에 넣는 작업을 함
        platformURL: Array.isArray(data.platformURL)
          ? data.platformURL
          : [data.platformURL],
      };

      // API 호출 등의 로직 추가
      const response = await createGathering(formData);
      console.log(response);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 생성"
      description="모임 생성 모달"
      trigger={
        <button className="h-11 w-32 cursor-pointer bg-zinc-800 font-bold text-white">
          모임 만들기
        </button>
      }
    >
      <GatheringForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default GatheringModal;
