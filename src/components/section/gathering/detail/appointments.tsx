import useGetAppointments from "@/apis/appointments/query/use-get-appointments";
import { CalendarX } from "@/assets/icons";
import { MeetUpCard } from "@/components/ui";
import { GetAppointmentResponse } from "@/types/appointment";

interface AppointmentsProps {
  isOwner: boolean;
  meetingId: number;
}

const Appointments = ({ meetingId, isOwner }: AppointmentsProps) => {
  const { data: appointments, isLoading } = useGetAppointments(meetingId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex h-[54px] flex-col items-center justify-center gap-[10px]">
        <CalendarX
          className="size-[30px] stroke-none text-neutral-300"
          role="img"
          aria-hidden="true"
        />
        <p className="typo-ui-sm-semibold text-neutral-300">
          생성된 약속이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-hidden">
      {appointments.map((appointment: GetAppointmentResponse) => (
        <MeetUpCard key={appointment.id} data={appointment} isOwner={isOwner} />
      ))}
    </div>
  );
};

export default Appointments;
