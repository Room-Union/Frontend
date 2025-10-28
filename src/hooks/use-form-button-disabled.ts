"use client";

import { useFormContext } from "react-hook-form";

interface FormMethods {
  getValues: () => Record<string, unknown>;
  formState: { errors: Record<string, unknown> };
}

// form의 특정 필드들이 비어있거나 에러가 있을 때 버튼을 비활성화하는 훅
export const useFormButtonDisabled = (
  fieldNames: string[],
  methods?: FormMethods
) => {
  const formContext = useFormContext();
  const activeForm = methods || formContext;

  const {
    formState: { errors },
    getValues,
  } = activeForm;
  // 스텝에 해당하는 필드들의 값 가져오기
  const values = getValues();

  // 필드들 중 하나라도 비어있거나 에러가 있으면 true
  const hasEmptyField = fieldNames.some((name) => {
    const value = values[name];

    // null이나 undefined는 optional 필드이므로 통과
    if (value === null || value === undefined) return false;

    // 배열인 경우: 빈 배열이거나, 모든 요소가 빈 문자열인 경우 비어있다고 판단
    if (Array.isArray(value)) {
      return value.every((v) => !v || String(v).trim() === "");
    }

    return !value;
  });
  const hasErrorField = fieldNames.some((name) => !!errors[name]);

  const isDisabled = hasErrorField || hasEmptyField;

  return { isDisabled };
};
