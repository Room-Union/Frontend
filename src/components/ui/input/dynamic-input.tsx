import { Minus, Plus } from "@/assets/icons";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";
import { Controller, useFormContext } from "react-hook-form";
import Label from "./label";

interface DynamicInputProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const DynamicInput = ({
  label,
  name,
  required,
  placeholder,
  className,
}: DynamicInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[""]}
      render={({ field }) => {
        const values = field.value as string[];
        const isMaxLength = values.length >= 3; // 최대 3개
        const isMinLength = values.length <= 1; // 최소 1개

        const handleAdd = () => {
          if (isMaxLength) return;
          field.onChange([...values, ""]);
        };

        const handleRemove = (index: number) => {
          if (isMinLength) return;
          const newValues = values.filter((_, i) => i !== index);
          field.onChange(newValues);
        };

        const handleChange = (index: number, value: string) => {
          const newValues = [...values];
          newValues[index] = value;
          field.onChange(newValues);
        };

        return (
          <div className="flex w-full flex-col gap-2">
            <Label text={label} required={required} htmlFor={name} />

            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-[1px] py-2.5"
              >
                <input
                  type="text"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  placeholder={placeholder}
                  className={cn(
                    "typo-ui-md-medium bg-gray-neutral-50 placeholder:text-gray-neutral-400 w-full rounded-xl px-4 py-3 font-[Pretendard] outline-none focus:ring focus:ring-blue-500",
                    className
                  )}
                />
                {index === 0 ? (
                  // + 버튼
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleAdd}
                    disabled={isMaxLength}
                    className="border-gray-neutral-500 size-8 border-2 p-[6px] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="stroke-gray-neutral-500 size-5" />
                  </Button>
                ) : (
                  // - 버튼
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(index)}
                    className="border-gray-neutral-500 size-8 border-2 p-[6px]"
                  >
                    <Minus className="stroke-gray-neutral-500 size-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};

export default DynamicInput;
