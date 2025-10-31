import useGetAppointments from "@/apis/appointments/query/use-get-appointments";
import { CalendarX } from "@/assets/icons";
import { Carousel, MeetUpCard } from "@/components/ui";
import { GetAppointmentResponse } from "@/types/appointments";

interface AppointmentsProps {
  isOwner: boolean;
  meetingId: number;
  isJoined: boolean;
}

const Appointments = ({ meetingId, isOwner, isJoined }: AppointmentsProps) => {
  const { data: appointments, isLoading } = useGetAppointments(meetingId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="mb-5 flex h-[54px] flex-col items-center justify-center gap-[10px] pt-1">
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
    <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 pt-1">
      <Carousel listType="appointmentList" totalItemCount={appointments.length}>
        {appointments.map((appointment: GetAppointmentResponse) => (
          <li
            key={appointment.id}
            className="pc:first:ml-0 tb:first:ml-6 mo:first:ml-5 pc:last:mr-0 tb:last:mr-6 mo:last:mr-5"
          >
            <MeetUpCard
              data={appointment}
              isGatheringJoined={isJoined}
              isOwner={isOwner}
              meetingId={meetingId}
            />
          </li>
        ))}
      </Carousel>
    </section>
  );
};

export default Appointments;
