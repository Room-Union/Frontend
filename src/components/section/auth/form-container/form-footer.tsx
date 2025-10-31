import { Button } from "@/components/ui";

interface FormFooterProps {
  type?: "button" | "submit";
  isPending?: boolean;
  isDisabled?: boolean;
  text?: string;
  href?: string;
  isFirstStep?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

const FormFooter = ({
  type = "button",
  isFirstStep = false,
  isDisabled = false,
  href,
  onPrev,
  onNext,
  text,
  isPending,
}: FormFooterProps) => {
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

      <>
        {href === "/sign-in" && (
          <div className="tb:typo-ui-sm-medium text-gray-neutral-500 typo-ui-xs-medium flex justify-center gap-[4px]">
            아이디가 있으신가요?
            <Button variant="auth" size="text" href={href}>
              로그인
            </Button>
          </div>
        )}
      </>
      <>
        {href === "/sign-up" && (
          <div className="tb:typo-ui-sm-medium text-gray-neutral-500 typo-ui-xs-medium flex justify-center gap-[4px]">
            집콕이 처음이신가요?
            <Button variant="auth" size="text" href={href}>
              회원가입
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default FormFooter;
