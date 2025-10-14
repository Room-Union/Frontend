import { GetGatheringDetailResponse } from "@/types/gathering";

interface DescriptionProps {
  data: GetGatheringDetailResponse;
}

const Description = ({ data }: DescriptionProps) => {
  return (
    <p className="typo-body-md-medium text-gray- whitespace-pre-wrap">
      {data.description}
    </p>
  );
};

export default Description;
