import Button from "../button/button";

interface FormFooterProps {
  isDisabled?: boolean;
}

const FormFooter = ({ isDisabled = false }: FormFooterProps) => {
  return (
    <div className="mt-[1.5rem] flex w-full justify-center">
      <Button type="submit" disabled={isDisabled} variant={"primary"}>
        로그인
      </Button>
    </div>
  );
};

export default FormFooter;
