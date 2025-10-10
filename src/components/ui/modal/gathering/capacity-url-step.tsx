import { Input } from "@/components/ui";

const CapacityUrlStep = () => {
  return (
    <>
      {/* Max Member Count */}
      <div>
        <label>최대 인원</label>
        <div className="flex items-center gap-3 pt-3">
          <Input
            name="maxMemberCount"
            placeholder="n"
            className="h-12 w-28 border-none bg-neutral-100 px-5 text-black outline-none"
          />
          <span className="text-base text-zinc-800">명</span>
        </div>
      </div>

      {/* Platform Urls */}
      <div>
        <label>플랫폼 주소</label>
        <div className="flex items-center gap-3 pt-3">
          <Input name="platformUrls" placeholder="https://discord.gg/abce" />
        </div>
      </div>
    </>
  );
};

export default CapacityUrlStep;
