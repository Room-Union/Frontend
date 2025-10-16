import { cn } from "@/utils/cn";

interface LabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
  required?: boolean;
}

const Label = ({ text, htmlFor, className, required = true }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("typo-ui-sm-medium px-[4px]", className)}
    >
      {text}
      {required && (
        <span className="typo-ui-sm-medium ml-[2px] text-blue-500">*</span>
      )}
    </label>
  );
};

export default Label;
