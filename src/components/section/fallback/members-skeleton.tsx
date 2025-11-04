const MembersSkeleton = () => {
  return (
    <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 scrollbar-hide animate-pulse overflow-x-auto">
      <ul className="flex w-fit flex-row gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <li
            key={item}
            className="pc:first:ml-0 tb:first:ml-6 mo:first:ml-5 pc:last:mr-0 tb:last:mr-6 mo:last:mr-5"
          >
            <div className="tb:h-[42px] tb:max-w-[132px] flex h-[32px] max-w-[111px] items-center gap-2">
              {/* Profile Image Skeleton */}
              <div className="tb:size-[40px] size-[30px] flex-shrink-0 rounded-full bg-neutral-200" />

              {/* Name Skeleton */}
              <div className="h-5 w-16 rounded bg-neutral-200" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MembersSkeleton;

