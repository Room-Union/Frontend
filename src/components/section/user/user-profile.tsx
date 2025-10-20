"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { PasswordEditModal, Profile, ProfileEditModal } from "@/components/ui";

const UserProfile = () => {
  const { data, isPending, isError } = useGetUserInfo();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section className="tb:flex w-full items-center justify-center">
      <div className="mo:self-stretch tb:self-auto pc:px-13 pc:py-7 tb:px-[30px] tb:py-6 mo:px-5 mo:py-6 pc:gap-6 tb:gap-5 mo:gap-[19.47px] bg-blue-25 pc:rounded-[50px] tb:rounded-[36px] mo:rounded-[30px] flex flex-col items-center justify-center border border-blue-300">
        <div className="pc:gap-[18px] tb:gap-[14px] mo:gap-2 flex flex-col items-center justify-center">
          <div className="mo:p-[5px] tb:p-0 flex items-center justify-center">
            <Profile
              gender={data.gender}
              profileImageUrl={data.profileImageUrl}
              size="sm"
              className="tb:w-[114px] tb:h-[114px] mo:w-11 mo:h-11"
            />
          </div>
          <div className="pc:gap-2 tb:gap-[6px] mo:gap-1 flex flex-col items-center justify-center">
            <span className="text-gray-neutral-800 pc:typo-title-sm-semibold tb:typo-title-sm-bold mo:typo-title-2xs-bold">
              {data.nickname}
            </span>
            <span className="text-gray-neutral-400 typo-body-sm-medium">
              {data.email}
            </span>
          </div>
        </div>
        <div className="pc:gap-3 tb:gap-[9.735px] mo:gap-[9.74px] flex items-center justify-center">
          <ProfileEditModal />
          <PasswordEditModal />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
