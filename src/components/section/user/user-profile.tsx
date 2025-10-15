import { Profile } from "@/components/ui";

const UserProfile = () => {
  return (
    <section className="tb:flex w-full items-center justify-center">
      <div className="mo:self-stretch tb:self-auto pc:px-13 pc:py-7 tb:px-[30px] tb:py-6 mo:px-5 mo:py-6 pc:gap-6 tb:gap-5 mo:gap-[19.47px] bg-blue-25 pc:rounded-[50px] tb:rounded-[36px] mo:rounded-[30px] flex flex-col items-center justify-center border border-blue-300">
        <div className="pc:gap-[18px] tb:gap-[14px] mo:gap-2 flex flex-col items-center justify-center">
          <div className="mo:p-[5px] tb:p-0 flex items-center justify-center">
            <Profile
              gender="MALE"
              profileImageUrl={null}
              size="sm"
              className="tb:w-[114px] tb:h-[114px] mo:w-11 mo:h-11"
            />
          </div>
          <div className="pc:gap-2 tb:gap-[6px] mo:gap-1 flex flex-col items-center justify-center">
            <span className="text-gray-neutral-800 pc:typo-title-sm-semibold tb:typo-title-sm-bold mo:typo-title-2xs-bold">
              정민석
            </span>
            <span className="text-gray-neutral-400 typo-body-sm-medium">
              minskyson7@gmail.com
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default UserProfile;
