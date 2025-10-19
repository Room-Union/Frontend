import { cn } from "@/utils/cn";

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FormContainer = ({ children, className }: FormContainerProps) => {
  return (
    <section
      className={cn(
        "tb:gap-[30px] tb:w-full tb:max-w-[536px] tb:rounded-[40px] tb:px-[40px] tb:pt-[38px] tb:pb-[34px] flex h-auto max-h-[549px] w-[335px] flex-col items-center gap-[20px] rounded-[24px] bg-white px-[16px] py-[30px] drop-shadow-lg",
        className
      )}
    >
      {children}
    </section>
  );
};

export default FormContainer;
