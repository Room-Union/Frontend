import { Logo } from "@/assets/icons-colored";

interface FormHeaderProps {
  title?: string;
}

const FormHeader = ({ title }: FormHeaderProps) => {
  return (
    <div className="flex w-full justify-center">
      {title ? (
        <h3 className="tb:typo-body-2xl-semibold typo-body-lg-semibold">
          {title}
        </h3>
      ) : (
        <Logo width={"88px"} height={"88px"} className="mb-[10px]" />
      )}
    </div>
  );
};

export default FormHeader;
