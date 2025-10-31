import { GetGatheringDetailResponse } from "@/types/gathering";

interface DescriptionProps {
  data: GetGatheringDetailResponse;
}

const Description = ({ data }: DescriptionProps) => {
  return (
    <p className="tb:typo-body-md-medium typo-body-sm-medium text-gray-neutral-900 whitespace-pre-wrap">
      {data.description}
    </p>
  );
};

export default Description;
