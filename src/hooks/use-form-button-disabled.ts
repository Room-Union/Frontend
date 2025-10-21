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
  const hasEmptyField = fieldNames.some((name) => !values[name]);
  const hasErrorField = fieldNames.some((name) => !!errors[name]);

  const isDisabled = hasErrorField || hasEmptyField;

  return { isDisabled };
};
