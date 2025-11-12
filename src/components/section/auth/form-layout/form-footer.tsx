import { Button } from "@/components/ui";
import { PATHS } from "@/constants/constants";
import { useFormButtonDisabled } from "@/hooks";
import LinkSection from "./link-section";

interface FormFooterProps {
  type?: "button" | "submit";
  isPending?: boolean;
  fields?: string[];
  text?: string;
  href?: string;
  isFirstStep?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

const FormFooter = ({
  type = "button",
  isFirstStep = false,
  fields = [],
  href,
  onPrev,
  onNext,
  text,
  isPending,
}: FormFooterProps) => {
  const { isDisabled } = useFormButtonDisabled(fields);

  return (
    <div className="tb:gap-[30px] flex w-full flex-col justify-center gap-[16px]">
      <div className="tb:gap-[16px] flex w-full justify-center gap-[12px]">
        {!isFirstStep && (
          // 이전 버튼 첫번째 스텝 제외하고 모두 노출
          <Button
            type="button"
            variant={"secondary"}
            onClick={onPrev}
            size={"md"}
            className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:max-w-[474px] tb:h-[60px]"
          >
            이전
          </Button>
        )}

        <Button
          type={type}
          disabled={isDisabled}
          variant={"primary"}
          size={"md"}
          onClick={onNext}
          loading={isPending}
          className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:max-w-[474px] tb:h-[60px]"
        >
          {text}
        </Button>
      </div>

      {href === PATHS.SIGN_IN && (
        <LinkSection
          href={href}
          buttonText="로그인"
          description="아이디가 있으신가요?"
        />
      )}

      {href === PATHS.SIGN_UP && (
        <LinkSection
          href={href}
          buttonText="회원가입"
          description="집콕이 처음이신가요?"
        />
      )}
    </div>
  );
};

export default FormFooter;
