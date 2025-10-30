import { cn } from "@/utils/cn";

interface DetailSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const DetailSection = ({
  title,
  children,
  className,
  action,
}: DetailSectionProps) => {
  return (
    <div
      className={cn(
        "tb:py-[30px] border-t border-neutral-100 py-4.5",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between pb-[14px]">
          <h3 className="typo-title-xs-bold text-neutral-800">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

export default DetailSection;
