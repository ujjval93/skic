import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.length ? data.map((event) => (
    <div
      className="rounded-lg border border-slate-200 border-l-4 border-l-blue-500 bg-white p-4 shadow-sm"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-slate-900">{event.title}</h1>
        <span className="text-xs text-slate-500">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{event.description}</p>
    </div>
  )) : (
    <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
      No events scheduled for this day.
    </p>
  );
};

export default EventList;