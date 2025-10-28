import { cn } from "@/utils/cn";

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FormContainer = ({ children, className }: FormContainerProps) => {
  return (
    <section
      className={cn(
        "tb:gap-7.5 tb:w-full tb:max-w-[536px] tb:rounded-[40px] tb:px-10 tb:pt-9.5 tb:pb-8.5 flex h-auto w-[335px] flex-col items-center gap-5 rounded-[24px] bg-white px-4 py-7.5 drop-shadow-lg",
        className
      )}
    >
      {children}
    </section>
  );
};

export default FormContainer;
