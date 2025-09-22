import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

// ClassValue 타입은 clsx에서 허용하는 모든 값의 타입을 포함합니다.
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
