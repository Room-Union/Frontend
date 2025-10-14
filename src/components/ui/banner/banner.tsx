import { Banner as BannerIcon } from '@/assets/icons-colored'

const Banner = () => {

  return (
    <div className='flex justify-between items-center w-[1200px] h-[244px] rounded-[28px] bg-blue-400 pl-15 pr-[29.39px]'>
      <header className='flex flex-col gap-[14px] left-0'>
        <h2 className='typo-title-md-bold text-blue-25 '>함께하는 온라인 모임</h2>
        <h3 className='typo-body-xl-semibold text-blue-100'>관심사가 같은 사람들과 특별한 시간을 보내보세요</h3>
      </header>
      <BannerIcon className='shrink-0 w-auto h-full pt-[7.959px]' />
    </div>
  )
}

export default Banner;