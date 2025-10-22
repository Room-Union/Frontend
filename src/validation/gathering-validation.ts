import z from "zod";
import {
  gatheringCategorySchema,
  gatheringDescriptionSchema,
  gatheringImageSchema,
  gatheringMaxMemberCountSchema,
  gatheringNameSchema,
  gatheringPlatformURLSchema,
} from "./validation";

export const categorySchema = z.object({
  category: gatheringCategorySchema,
});

export const basicInfoSchema = z.object({
  name: gatheringNameSchema,
  description: gatheringDescriptionSchema,
  meetingImage: gatheringImageSchema,
});

export const capacityUrlSchema = z.object({
  maxMemberCount: gatheringMaxMemberCountSchema,
  platformURL: gatheringPlatformURLSchema,
});

export const gatheringSchema = z.object({
  ...categorySchema.shape,
  ...basicInfoSchema.shape,
  ...capacityUrlSchema.shape,
});

export type GatheringSchemaType = z.infer<typeof gatheringSchema>;
