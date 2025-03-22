type Props = {
  absolute?: boolean;
}

const Loading = ({ absolute }: Props) => {
  return (
    <div className={`${absolute && "absolute"} w-full h-96 flex justify-center items-center`}>
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )
}

export default Loading

export const NavbarHeaderSkeleton = () => {
  return (
    <div className="w-full bg-neutral text-neutral-content px-3 md:px-15 py-3 text-sm flex flex-wrap justify-between items-center">
      <div className="skeleton bg-black/10 h-5 w-40"></div>
      <div className="hidden md:block skeleton bg-black/10 h-5 w-100"></div>
      <div className="flex items-center gap-3 text-xl">
        <div className="skeleton bg-black/10 h-5 w-5 rounded-full"></div>
        <div className="skeleton bg-black/10 h-5 w-5 rounded-full"></div>
        <div className="skeleton bg-black/10 h-5 w-5 rounded-full"></div>
        <div className="skeleton bg-black/10 h-5 w-5 rounded-full"></div>
      </div>
    </div>
  )
}

export const FooterSkeleton = () => {
  return (
    <div className="py-20 flex flex-wrap gap-y-10 md:gap-y-0">
      <div className="w-full md:w-3/12 pr-10">
        <h2 className="skeleton text-3xl h-10 bg-base-300"></h2>
        <p className="skeleton my-5 h-50 bg-base-300"></p>
        <div className="flex items-center gap-3 text-xl">
          <div className="skeleton bg-base-300 btn hover:btn-primary rounded-full w-12 h-12"></div>
          <div className="skeleton bg-base-300 btn hover:btn-primary rounded-full w-12 h-12"></div>
          <div className="skeleton bg-base-300 btn hover:btn-primary rounded-full w-12 h-12"></div>
          <div className="skeleton bg-base-300 btn hover:btn-primary rounded-full w-12 h-12"></div>
        </div>
      </div>
      <div className="w-full md:w-3/12 flex flex-col items-start pr-10">
        <p className="skeleton font-semibold mb-3 h-6 w-30 bg-base-300"></p>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
      </div>
      <div className="w-full md:w-3/12 flex flex-col items-start pr-10">
        <p className="skeleton font-semibold mb-3 h-6 w-30 bg-base-300"></p>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
      </div>
      <div className="w-full md:w-3/12 flex flex-col items-start pr-10">
        <p className="skeleton font-semibold mb-3 h-6 w-30 bg-base-300"></p>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
        <div className="skeleton bg-base-300 h-5 w-full mb-3"></div>
      </div>
    </div>
  )
}

export const HeroSkeleton = () => {
  return (
    <header className="skeleton min-h-[40rem] relative bg-base-300">
      <div className="skeleton bg-neutral/90 absolute bottom-30 md:bottom-5 md:left-15 h-[27rem] w-full md:w-6/12 flex flex-col justify-center items-center md:items-start p-5 md:p-20">
        <div className="skeleton mb-3 bg-neutral w-full h-20"></div>
        <div className="skeleton mb-10 bg-neutral w-full h-20"></div>
        <div className="skeleton mb-10 bg-neutral w-6/12 h-20"></div>
      </div>
    </header>
  )
}

export const BusinessValueSkeleton = () => {
  return (
    <>
      <div className="w-full flex flex-wrap justify-between gap-5 p-5 md:p-20">
        <div className="skeleton w-full md:w-[32%] h-96 bg-base-200 border border-base-300 relative pb-10"></div>
        <div className="skeleton w-full md:w-[32%] h-96 bg-base-200 border border-base-300 relative pb-10"></div>
        <div className="skeleton w-full md:w-[32%] h-96 bg-base-200 border border-base-300 relative pb-10"></div>
      </div>
    </>
  )
}

export const CTASkeleton = () => {
  return (
    <div className="w-full flex flex-wrap gap-10 p-5 md:p-20">
      <div className="w-full md:w-5/12 bg-base-300 skeleton h-[30rem]"></div>
      <div className="w-full md:w-6/12 md:pl-10 bg-base-300 skeleton h-[40rem]"></div>
    </div>
  )
}

export const ExpSkeleton = () => {
  return (
    <div className="bg-base-300 skeleton w-full h-[20rem]"></div>
  )
}

export const HomeServicesSkeleton = () => {
  return (
    <div className="w-full p-5 md:p-20">
      <div className="w-full relative md:pl-10 pt-16 mb-20 bg-base-300 skeleton h-30"></div>
      <div className="w-full flex flex-wrap justify-center gap-10">
        <div className="w-full md:w-[48%] border border-base-300 p-10 bg-base-300 skeleton h-[30rem]"></div>
        <div className="w-full md:w-[48%] border border-base-300 p-10 bg-base-300 skeleton h-[30rem]"></div>
      </div>
    </div>
  )
}

export const MainCTASkeleton = () => {
  return (
    <div className="bg-base-300 skeleton w-full h-[40rem]"></div>
  )
}

export const ClientsSkeleton = () => {
  return (
    <div className="w-full h-[10rem] flex items-center">
      <div className="w-full bg-base-300 skeleton h-[5rem]"></div>
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="h-96 flex items-center bg-base-300 skeleton">
      <div className="w-full md:w-96 h-[10rem] bg-base-200/75 border border-base-100 md:ml-20 skeleton"></div>
    </div>
  )
}

export const AboutImagesSkeleton = () => {
  return (
    <div className="h-[40rem] w-full md:w-5/12 bg-base-300 skeleton"></div>
  )
}

export const AboutDetailSkeleton = () => {
  return (
    <div className="h-[40rem] w-full md:w-6/12 bg-base-300 skeleton"></div>
  )
}

export const ServicePageSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap justify-between p-5 md:p-20 gap-3">
      <div className="w-full md:w-[32%] h-[30rem] bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-[30rem] bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-[30rem] bg-base-300 skeleton"></div>
    </div>
  )
}

export const PortfolioPageSkeleton = () => {
  return (
    <>
      <div className="w-full md:w-[32%] h-96 bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-96 bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-96 bg-base-300 skeleton"></div>
    </>
  )
}

export const ServicePortfolioPageSkeleton = () => {
  return (
    <div className="w-full h-10 mb-10 bg-base-300 skeleton"></div>
  )
}

export const PortfolioDetailPageSkeleton = () => {
  return (
    <div className="w-full p-5 md:p-20 flex flex-wrap items-start justify-between gap-5">
      <div className="w-full md:w-3/12 h-[35rem] bg-base-300 skeleton"></div>
      <div className="w-full md:w-8/12 h-[35rem] bg-base-300 skeleton"></div>
      <div className="w-full h-96 bg-base-300 skeleton"></div>
    </div>
  )
}

export const BlogPageSkeleton = () => {
  return (
    <div className="w-full md:w-[68%] h-[50rem] bg-base-300 skeleton"></div>
  )
}

export const BlogSideNavPageSkeleton = () => {
  return (
    <div className="w-full md:w-[30%] h-[50rem] bg-base-300 skeleton"></div>
  )
}

export const ContactPageSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap justify-between p-5 md:p-20 gap-3">
      <div className="w-full md:w-[32%] h-[20rem] bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-[20rem] bg-base-300 skeleton"></div>
      <div className="w-full md:w-[32%] h-[20rem] bg-base-300 skeleton"></div>
    </div>
  )
}