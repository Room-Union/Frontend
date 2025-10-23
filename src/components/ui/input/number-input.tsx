import Label from "@/components/ui/input/label";
import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";
import { inputVariants } from "./input";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder?: string;
  unit?: string;
  required?: boolean;
}

const NumberInput = ({
  name,
  label,
  placeholder,
  unit = "",
  required = true,
}: NumberInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isErrorState = Boolean(errors[name]);
  const inputBaseStyle = `typo-ui-sm-medium outline-none bg-gray-neutral-50 px-[16px] placeholder:text-gray-neutral-400 focus:ring focus:ring-blue-500 ${isErrorState && "ring ring-red-500"}`;

  return (
    <div className="tb:gap-2 flex flex-col gap-[6px]">
      <Label text={label} required={required} htmlFor={name} />
      <div className="flex items-center gap-[7px]">
        <input
          type="number"
          placeholder={placeholder}
          className={cn(inputBaseStyle, inputVariants.input.fixed)}
          {...register(name, { valueAsNumber: true })}
        />
        {unit && <span className="text-base text-zinc-800">{unit}</span>}
      </div>
      {errors[name] && (
        <p className="typo-ui-xs-medium tb:typo-ui-sm-medium px-[4px] text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
