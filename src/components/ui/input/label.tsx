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
      className={cn(
        "text-gray-neutral-900 typo-ui-sm-medium px-[4px]",
        className
      )}
    >
      {text}
      {/* input이 required 항목일 경우 '*' 노출 */}
      {required && (
        <span className="typo-ui-sm-medium ml-[2px] text-blue-500">*</span>
      )}
    </label>
  );
};

export default Label;
