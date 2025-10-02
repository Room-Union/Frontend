import { useFormContext } from "react-hook-form";
import StatusMessage from "./status-message";

interface OptionInputProps {
  type?: "radio" | "checkbox";
  name: string;
  label?: string | React.ReactNode;
  count?: number;
  options: Record<"name" | "value", string>[];
  className?: string;
  correctMessage?: string;
}
const OptionInput = ({
  type = "checkbox",
  name,
  label,
  options,
  className,
  correctMessage,
}: OptionInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <div className="grid grid-cols-3 gap-1">
        {options.map((option, index) => {
          return (
            <label htmlFor={option.value} key={index} className={className}>
              <input
                id={option.value}
                type={type}
                value={option.value}
                {...register(name)}
                className="hidden"
              ></input>
              {option.name}
            </label>
          );
        })}
      </div>
      {correctMessage && (
        <StatusMessage
          name={name}
          errors={errors}
          isDirty={dirtyFields}
          correctMessage={correctMessage}
        />
      )}
    </div>
  );
};

export default OptionInput;
