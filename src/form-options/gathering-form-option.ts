import { GatheringSchemaType } from "@/types/schema";
import { gatheringSchema } from "@/validation/gathering-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";

interface GatheringFormOptionsProps {
  defaultValues?: GatheringSchemaType;
}

export const gatheringFormOptions = ({
  defaultValues,
}: GatheringFormOptionsProps): UseFormProps<GatheringSchemaType> => ({
  mode: "onChange",
  resolver: zodResolver(gatheringSchema),
  defaultValues: defaultValues || {
    category: [],
    name: "",
    description: "",
    meetingImage: undefined,
    maxMemberCount: undefined,
    platformURL: [""],
  },
});
