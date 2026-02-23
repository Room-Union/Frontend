import { Button } from "@/components/ui";

interface LinkSectionProps {
  href: string;
  buttonText: string;
  description?: string;
}

const LinkSection = ({ href, buttonText, description }: LinkSectionProps) => {
  return (
    <div className="tb:typo-ui-sm-medium text-gray-neutral-500 typo-ui-xs-medium flex justify-center gap-[4px]">
      {description && <span>{description}</span>}
      <Button
        variant="underline"
        size="text"
        className="text-blue-600"
        href={href}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default LinkSection;
