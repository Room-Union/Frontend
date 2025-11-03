import { DetailSection } from "@/components/section";

interface SectionErrorProps {
  title: string;
  message: string;
}

const SectionError = ({ title, message }: SectionErrorProps) => {
  return (
    <DetailSection title={title}>
      <div className="flex items-center justify-center p-4">
        <p className="typo-ui-sm-semibold text-neutral-400">{message}</p>
      </div>
    </DetailSection>
  );
};

export default SectionError;
