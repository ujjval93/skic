import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
  const { date } = await searchParams;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-lg font-semibold text-slate-900">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;