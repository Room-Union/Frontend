import z from "zod";
import {
  appointmentDateSchema,
  appointmentImageSchema,
  appointmentMaxMemberCountSchema,
  appointmentTimeSchema,
  appointmentTitleSchema,
} from "./validation";

const appointmentSchema = z.object({
  title: appointmentTitleSchema,
  date: appointmentDateSchema,
  time: appointmentTimeSchema,
  maxMemberCount: appointmentMaxMemberCountSchema,
  image: appointmentImageSchema,
});

export { appointmentSchema };
