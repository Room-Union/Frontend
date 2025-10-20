import { Logo } from "@/assets/icons-colored";

interface FormHeaderProps {
  title?: string;
  email?: string;
}

const FormHeader = ({ title, email = "" }: FormHeaderProps) => {
  return (
    <div className="flex w-full justify-center">
      {title ? (
        <div className="tb:typo-body-2xl-semibold typo-body-lg-semibold text-center">
          {email && <div>{email}</div>}
          <h3>{title}</h3>
        </div>
      ) : (
        <Logo width={"88px"} height={"88px"} className="mb-[10px]" />
      )}
    </div>
  );
};

export default FormHeader;
