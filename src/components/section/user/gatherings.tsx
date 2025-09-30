import Image from "next/image";
import Link from "next/link";

const Gatherings = ({ title }: { title: string }) => {
  return (
    <section className="flex w-full px-6 pb-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-bold text-black">{title}</div>
          <Link href="/" className="text-sm text-gray-500">
            더보기
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gatherings;

const Card = () => {
  return (
    <Link href="/">
      <div className="relative">
        <Image
          src="/images/ImagePlaceholder.png"
          alt="모임 이미지"
          width={273}
          height={160}
          className="bg-[#E0E0E0]"
        />
        <div className="absolute top-3 left-3 bg-[#333333] px-2 py-1 text-[14px] font-normal text-white">
          NEW
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-[#F8F8F8] px-4 pt-5 pb-4">
        <div className="text-[18px] font-bold text-black">
          온라인 영화 토론 모임
        </div>
        <div className="w-fit bg-[#DDDDDD] px-2 py-1 text-[14px] font-normal">
          엔터테인먼트
        </div>
        <div className="flex justify-between">
          <div className="text-[12px] font-normal text-black">👥 24/30명</div>
          <div className="text-[12px] font-normal text-black">❤️ 156</div>
        </div>
      </div>
    </Link>
  );
};
