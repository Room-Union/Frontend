import { CATEGORIES } from "@/constants/constants";

const ProfileEntryStep = () => {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="mx-auto text-lg">비밀번호를 입력해주세요</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="nickname">닉네임</label>
        <input
          name="nickname"
          className="h-[60px] w-[570px] rounded-md border-2 p-4 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gender">성별</label>
        <div className="flex justify-between">
          <label className="text-gray flex h-[60px] w-[150px] items-center justify-center rounded-md border border-2 border-[#aaa] has-checked:border-black">
            <span>남자</span>
            <input name="gender" type="radio" className="hidden" />
          </label>

          <label className="text-gray flex h-[60px] w-[150px] items-center justify-center rounded-md border border-2 border-[#aaa] has-checked:border-black">
            <span>여자</span>
            <input name="gender" type="radio" className="hidden" />
          </label>

          <label className="text-gray flex h-[60px] w-[150px] items-center justify-center rounded-md border border-2 border-[#aaa] has-checked:border-black">
            <span>비밀</span>
            <input name="gender" type="radio" className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="카테고리">선호 카테고리 (2개)</label>

        <div className="flex flex-wrap justify-between">
          {CATEGORIES.map((category, idx) => {
            return (
              <label
                key={idx}
                className="text-gray mb-4 flex h-[60px] w-[30%] items-center justify-center rounded-md border border-2 border-[#aaa] has-checked:border-black"
              >
                <span>{category.name}</span>
                <input type="checkbox" className="hidden" />
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="h-[60px] w-[570px] rounded-md bg-black p-2 text-white"
      >
        가입완료
      </button>
    </section>
  );
};

export default ProfileEntryStep;
