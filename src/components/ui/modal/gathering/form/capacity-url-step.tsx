import { Input } from "@/components/ui";
import DynamicInput from "@/components/ui/input/dynamic-input";
import { inputVariants } from "@/components/ui/input/input";
import Label from "@/components/ui/input/label";

const CapacityUrlStep = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Max Member Count */}
      <div className="tb:gap-2 flex flex-col gap-[6px]">
        <Label text="최대 인원" required htmlFor="maxMemberCount" />
        <div className="flex w-fit items-center gap-[7px]">
          <Input
            name="maxMemberCount"
            placeholder="최소 2명"
            className={inputVariants.input.fixed}
          />
          <span className="text-base text-zinc-800">명</span>
        </div>
      </div>

      {/* Platform Urls */}
      <div className="tb:gap-2 flex flex-col gap-[6px]">
        <DynamicInput
          label="URL"
          name="platformURL"
          placeholder="https://discord.gg/abce"
        />
      </div>
    </div>
  );
};

export default CapacityUrlStep;
