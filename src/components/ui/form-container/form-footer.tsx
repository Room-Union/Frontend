import Button from "../button/button";

interface FormFooterProps {
  isDisabled?: boolean;
}

const FormFooter = ({ isDisabled = false }: FormFooterProps) => {
  return (
    <div className="flex w-full justify-center">
      <Button
        type="submit"
        disabled={isDisabled}
        variant={"primary"}
        className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
      >
        로그인
      </Button>
    </div>
  );
};

export default FormFooter;
