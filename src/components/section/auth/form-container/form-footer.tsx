import { Button } from "@/components/ui";

const FormFooter = () => {
  return (
    <div className="mt-[1.5rem] flex w-full justify-center">
      <Button type="submit" variant={"primary"}>
        로그인
      </Button>
    </div>
  );
};

export default FormFooter;
