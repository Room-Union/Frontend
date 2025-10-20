import { cn } from "@/utils/cn";

interface DetailSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const DetailSection = ({ title, children, className }: DetailSectionProps) => {
  return (
    <div className={cn("border-t border-neutral-100 py-[30px]", className)}>
      {title && (
        <h3 className="typo-title-xs-bold pb-[14px] text-neutral-800">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default DetailSection;
