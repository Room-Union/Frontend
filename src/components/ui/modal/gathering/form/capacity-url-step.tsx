import { DynamicInput, NumberInput } from "@/components/ui";

const CapacityUrlStep = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Max Member Count */}
      <NumberInput
        name="maxMemberCount"
        label="최대 인원"
        placeholder="최소 2명"
        unit="명"
      />

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
