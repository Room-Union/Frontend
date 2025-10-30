import { cn } from "@/utils/cn";

interface DetailSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const DetailSection = ({ title, children, className }: DetailSectionProps) => {
  return (
    <div
      className={cn(
        "tb:py-[30px] border-t border-neutral-100 py-4.5",
        className
      )}
    >
      {title && (
        <h3 className="tb:typo-title-xs-bold typo-ui-md-bold tb:pb-3.5 pb-2 text-neutral-800">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default DetailSection;
