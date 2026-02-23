import { AppointmentFormInput } from "@/types/appointments";
import {
  appointmentSchema,
  AppointmentSchemaType,
} from "@/validation/appointment-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";

interface AppointmentFormOptionsProps {
  defaultValues?: AppointmentFormInput;
}

export const appointmentFormOptions = ({
  defaultValues,
}: AppointmentFormOptionsProps): UseFormProps<AppointmentSchemaType> => ({
  mode: "onChange",
  resolver: zodResolver(appointmentSchema),
  defaultValues: defaultValues,
});
